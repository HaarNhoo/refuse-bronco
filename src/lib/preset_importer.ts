import { AMP_MODELS, EFFECT_MODELS, DspType } from './models';
import { PacketBuilder } from './protocol/packet_builder';
import { Protocol } from './protocol/protocol';
import { debug } from './helpers';

// ID Mapping from Fuse XML to Firmware IDs
// prettier-ignore
// ID Mapping from Fuse XML to Firmware IDs
// prettier-ignore
const ID_MAP: Record<number, number> = {
  // --- Bronco Amps (Correspondance XML Fuse -> Firmware) ---
  150: 0x9600, // Rumble
  151: 0x9700, // Bassman TV
  152: 0x9800, // Bassman 300
  153: 0x9900, // SWR Redhead
  154: 0x9a00, // Rockin' Peg
  155: 0x9b00, // KGB 800
  157: 0xbd00, // Monster
  1:   0x6400, // '59 Bassman (Partagé avec Mustang)

  // --- Bronco Specific Effects ---
  156: 0xbc00, // Modern Bass Overdrive
  158: 0xbb00, // Octave Down
  159: 0xbe00, // Envelope Filter
  160: 0xc600, // Graphic EQ
  161: 0xc500, // Parametric EQ


  // --- Effects Standards ---
  19: 0x3c00, 20: 0x4900, 21: 0x4a00, 22: 0x1a00, 24: 0x0700,
  26: 0x1200, 31: 0x4000, 37: 0x1600, 42: 0x2400, 50: 0x2100
};

export class PresetImporter {
  private protocol: Protocol;

  constructor(protocol: Protocol) {
    this.protocol = protocol;
  }

  async loadXml(xmlString: string): Promise<void> {
    debug(`[PresetImporter] loadXml (Length: ${xmlString.length})`);

    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'text/xml');

    // We process modules and send raw buffers.
    await this.processModule(doc, 'Amplifier', DspType.AMP);
    await this.processModule(doc, 'FX Stompbox', DspType.STOMP);
    await this.processModule(doc, 'FX Modulation', DspType.MOD);
    await this.processModule(doc, 'FX Delay', DspType.DELAY);
    await this.processModule(doc, 'FX Reverb', DspType.REVERB);
  }

  private async processModule(doc: Document, selector: string, type: DspType) {
    const container = doc.querySelector(selector);
    if (!container) return;

    const modules = container.querySelectorAll('Module');
    for (let i = 0; i < 8; i++) {
      const m = modules[i];
      if (!m) continue;
      const fuseId = parseInt(m.getAttribute('ID') || '0');
      const pos = parseInt(m.getAttribute('POS') || '0');
      const bypass = parseInt(m.getAttribute('BypassState') || '0'); // 1=Off

      let modelId = 0;
      if (fuseId !== 0) {
        modelId = this.resolveId(fuseId, type)!;
        if (!modelId) continue;
      }

      const buffer = new Uint8Array(64);
      buffer[16] = (modelId >> 8) & 0xff;
      buffer[17] = modelId & 0xff;
      buffer[18] = pos;
      buffer[22] = bypass;

      const params = m.querySelectorAll('Param');
      for (let j = 0; j < params.length; j++) {
        const p = params[j];
        const index = parseInt(p.getAttribute('ControlIndex') || '0');
        const val16 = parseInt(p.textContent || '0');
        const val8 = val16 >> 8;

        if (32 + index < 64) {
          buffer[32 + index] = val8;
        }
      }

      // Send Buffer via Protocol
      const builder = PacketBuilder.dspWrite(type, this.protocol.getNextSequenceId());
      builder.addBytes(16, buffer.slice(16, 64));

      await this.protocol.sendPacket(builder.build());

      // Apply
      const applyPacket = PacketBuilder.applyChange(type, this.protocol.getNextSequenceId()).build();
      await this.protocol.sendPacket(applyPacket);
    }
  }

  private resolveId(fuseId: number, type: DspType): number | null {
    if (ID_MAP[fuseId]) return ID_MAP[fuseId];

    // Check repos
    const high = fuseId << 8;
    const repo = type === DspType.AMP ? AMP_MODELS : EFFECT_MODELS;
    if (Object.values(repo).some(m => m.id === high)) return high;

    const lowByte = fuseId & 0xff;
    const highByte = (fuseId >> 8) & 0xff;
    const swapped = (lowByte << 8) | highByte;
    if (Object.values(repo).some(m => m.id === swapped)) return swapped;

    return null;
  }
}

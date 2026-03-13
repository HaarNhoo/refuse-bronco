import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, type CdkDragDrop } from '@angular/cdk/drag-drop';
import { DspType, type EffectSettings, type AmpSettings, type CabinetDef } from '../lib';

@Component({
  selector: 'fuse-signal-chain',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  template: `
    <div class="signal-chain-strip" cdkDropListGroup>
      <!-- Pre-Amp Slots (0-3) -->
      <div class="group-container">
        <div class="background-layer">
          <div class="slot empty placeholder" *ngFor="let _ of [0, 1, 2, 3]">
            <div class="empty-label">Empty</div>
          </div>
        </div>
        <div
          class="slot-group"
          cdkDropList
          cdkDropListOrientation="horizontal"
          cdkDropListLockAxis="x"
          [cdkDropListData]="preAmpSlots"
          (cdkDropListDropped)="drop($event)"
        >
          <div
            *ngFor="let i of preAmpSlots; trackBy: trackByFn"
            class="slot"
            cdkDrag
            [cdkDragData]="i"
            [class.active]="activeSlot === i"
            [class.empty]="!effects[i]"
            (click)="selectSlot(i)"
          >
            <span class="slot-num">{{ i + 1 }}</span>
            <div *ngIf="effects[i] as effect; else emptySlot">
              <div class="badge" [style.background]="getFamilyColor(effect.type)">
                {{ getFamilyLabel(effect.type) }}
              </div>
              <div class="model-name">{{ effect.model }}</div>
              <div class="status">{{ effect.enabled ? '●' : '○' }}</div>
            </div>
            <ng-template #emptySlot>
              <div class="empty-label">Empty</div>
            </ng-template>
            <!-- Placeholder for drag preview -->
            <div *cdkDragPlaceholder class="slot-placeholder"></div>
          </div>
        </div>
      </div>

      <!-- Amplifier -->
      <div class="slot amplifier" [class.active]="activeSlot === 'amp'" (click)="selectAmp()">
        <ng-container *ngIf="ampSettings; else emptyAmp">
          <img [src]="getAmpImage(ampSettings.model)" class="amp-visual" />

          <div class="amp-overlay">
            <div class="model-name-small">{{ ampSettings.model }}</div>
            <div class="cabinet-name-small">{{ getCabinetName(ampSettings.cabinetId) }}</div>
          </div>
        </ng-container>

        <ng-template #emptyAmp>
          <span class="slot-label">AMP</span>
          <div class="amp-icon">⚡</div>
        </ng-template>
      </div>

      <!-- Post-Amp Slots (4-7) -->
      <div class="group-container">
        <div class="background-layer">
          <div class="slot empty placeholder" *ngFor="let _ of [0, 1, 2, 3]">
            <div class="empty-label">Empty</div>
          </div>
        </div>
        <div
          class="slot-group"
          cdkDropList
          cdkDropListOrientation="horizontal"
          cdkDropListLockAxis="x"
          [cdkDropListData]="postAmpSlots"
          (cdkDropListDropped)="drop($event)"
        >
          <div
            *ngFor="let i of postAmpSlots; trackBy: trackByFn"
            class="slot"
            cdkDrag
            [cdkDragData]="i"
            [class.active]="activeSlot === i"
            [class.empty]="!effects[i]"
            (click)="selectSlot(i)"
          >
            <span class="slot-num">{{ i + 1 }}</span>
            <div *ngIf="effects[i] as effect; else emptySlot">
              <div class="badge" [style.background]="getFamilyColor(effect.type)">
                {{ getFamilyLabel(effect.type) }}
              </div>
              <div class="model-name">{{ effect.model }}</div>
              <div class="status">{{ effect.enabled ? '●' : '○' }}</div>
            </div>
            <ng-template #emptySlot>
              <div class="empty-label">Empty</div>
            </ng-template>
            <!-- Placeholder for drag preview -->
            <div *cdkDragPlaceholder class="slot-placeholder"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* Conteneur principal en 3 lignes */
      .signal-chain-strip {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 10px;
        background: #111;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
      }

      /* Conteneur de groupe (Fixe le problème du doublement) */
      .group-container {
        position: relative;
        width: 344px; /* (4 slots * 80px) + (3 gaps * 8px) */
        height: 80px; /* Hauteur d'une ligne de pédales */
      }

      /* Superposition parfaite du fond et des pédales */
      .background-layer,
      .slot-group {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        gap: 8px;
      }

      .background-layer {
        z-index: 0;
      }
      .slot-group {
        z-index: 1;
      }

      /* Taille des pédales pour Mobile */
      .slot {
        background: #222;
        border: 2px solid #333;
        width: 80px;
        height: 80px;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        padding: 4px;
        box-sizing: border-box;
        overflow: hidden;
      }

      /* L'Amplificateur au centre */
      .amplifier {
        position: relative;
        overflow: hidden; /* Pour que l'image ne dépasse pas les bords arrondis */
        background: #000;
        border: 2px solid #555;
        width: 120px;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        cursor: pointer;
      }

      .amp-visual {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover; /* Remplit le carré proprement */
        z-index: 1;
      }

      .amp-overlay {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.7); /* Bandeau noir semi-transparent */
        z-index: 2;
        padding: 2px 0;
        text-align: center;
      }

      .model-name-small {
        font-size: 0.6rem;
        font-weight: bold;
        color: #fff;
        text-transform: uppercase;
      }

      .cabinet-name-small {
        font-size: 0.5rem;
        color: #aaa;
      }

      .amplifier.active {
        border-color: #e67e22;
        background: #4e342e;
      }
      .slot.active {
        border-color: #3498db;
        background: #1a2a3a;
      }

      /* Textes miniatures pour mobile */
      .model-name {
        font-size: 0.65rem;
        font-weight: bold;
        color: #eee;
        text-align: center;
      }
      .badge {
        font-size: 0.5rem;
        padding: 1px 3px;
        border-radius: 2px;
        text-transform: uppercase;
      }
      .slot-num {
        position: absolute;
        top: 2px;
        right: 4px;
        font-size: 0.6rem;
        color: #555;
      }
      .cabinet-name {
        font-size: 0.55rem;
        color: #aaa;
        text-align: center;
      }
      .empty-label {
        color: #444;
        font-size: 0.6rem;
        margin: auto;
      }
    `,
  ],
})
export class SignalChainComponent {
  @Input() activeSlot: number | 'amp' | null = null;
  @Input() effects: (EffectSettings | null)[] = [];
  @Input() ampSettings: AmpSettings | null = null;
  @Input() cabinetModels: CabinetDef[] = [];
  @Output() activeSlotChange = new EventEmitter<number | 'amp'>();
  @Output() move = new EventEmitter<{ fromSlot: number; toSlot: number }>();

  preAmpSlots = this.range(0, 4);
  postAmpSlots = this.range(4, 8);

  selectSlot(index: number) {
    this.activeSlotChange.emit(index);
  }

  selectAmp() {
    this.activeSlotChange.emit('amp');
  }

  drop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer === event.container) {
      // Same container move
      if (event.previousIndex !== event.currentIndex) {
        const fromSlot = event.item.data;
        // Clamp index to array bounds to avoid undefined
        const targetIndex = Math.min(event.currentIndex, event.container.data.length - 1);
        const toSlot = event.container.data[targetIndex];

        if (fromSlot !== undefined && toSlot !== undefined) {
          this.move.emit({ fromSlot, toSlot });
        }
      }
    } else {
      // Different container (Pre <-> Post)
      const fromSlot = event.item.data;
      // Clamp index
      const targetIndex = Math.min(event.currentIndex, event.container.data.length - 1);
      const toSlot = event.container.data[targetIndex];

      if (fromSlot !== undefined && toSlot !== undefined) {
        this.move.emit({ fromSlot, toSlot });
      }
    }
  }

  // Helper to generate range [start, end)
  range(start: number, end: number) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  trackByFn(index: number, item: number) {
    return item;
  }

  getCabinetName(id: number) {
    const cab = this.cabinetModels.find(c => c.id === id);
    return cab ? cab.name : `Cab ${id}`;
  }

  getFamilyLabel(type: DspType) {
    switch (type) {
      case DspType.STOMP:
        return 'Stomp';
      case DspType.MOD:
        return 'Mod';
      case DspType.DELAY:
        return 'Delay';
      case DspType.REVERB:
        return 'Reverb';
      default:
        return '?';
    }
  }

  getFamilyColor(type: DspType) {
    switch (type) {
      case DspType.STOMP:
        return '#e74c3c';
      case DspType.MOD:
        return '#3498db';
      case DspType.DELAY:
        return '#f1c40f';
      case DspType.REVERB:
        return '#2ecc71';
      default:
        return '#444';
    }
  }

  getAmpImage(modelName: string | undefined): string {
    if (!modelName) return '';

    // Normalisation du nom pour la recherche
    const name = modelName.toLowerCase().replace(/\s/g, '');

    const imageMap: Record<string, string> = {
      rumble: 'FUSE_2.5_Rumble_amp.png',
      bassmantv: 'FUSE_2.5_BassmanTV_amp.png',
      monster: 'FUSE_2.5_Monster_amp.png',
      rockinpeg: 'FUSE_2.5_RockinPeg_amp.png',
      kgb800: 'FUSE_2.5_KGB800_amp.png',
      bassman300: 'FUSE_2.5_Bassman300_amp.png',
      redhead: 'FUSE_2.5_Redhead_amp.png',
      '57twin': 'Fender_Fuse-v2_57 Twin.png',
      '65deluxereverb': 'FUSE_2_65_deluxe_reverb_amp.png',
      bassman: 'FUSE_2_fender_bassman_amp.png',
      studiopreamp: 'FUSE_Studio_Preamp.png',
      // Ajoute les autres ici si besoin
    };

    const fileName = imageMap[name] || 'FUSE_Studio_Preamp.png';
    return `assets/Amplifiers/${fileName}`;
  }
}

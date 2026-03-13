export enum DspType {
  AMP = 0x05,
  STOMP = 0x06,
  MOD = 0x07,
  DELAY = 0x08,
  REVERB = 0x09,
}

export interface ModelDef {
  id: number;
  name: string;
  type: DspType;
  knobs: string[];
}

export interface CabinetDef {
  id: number;
  name: string;
}

const m = (id: number, name: string, type: DspType, knobs: string[]): ModelDef => ({ id, name, type, knobs });
//Bronco spécific
// prettier-ignore
export const AMP_MODELS: Record<string, ModelDef> = {

  // Bronco Bass Amps
  F_RUMBLE: m(0x9600, 'Fender Rumble', DspType.AMP, ['Vol', 'Gain', 'Gain2', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  F59_BASSMAN: m(0x6400, '\'59 Bassman', DspType.AMP, ['Vol', 'Gain', 'Gain2', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  F_BASSMAN_TV: m(0x9700, 'Fender Bassman TV', DspType.AMP, ['Vol', 'Gain', 'Gain2', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  F_BASSMAN_300: m(0x9800, 'Fender Bassman 300', DspType.AMP, ['Vol', 'Gain', 'Gain2', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  SWR_REDHEAD: m(0x9900, 'SWR Redhead', DspType.AMP, ['Vol', 'Gain', 'Gain2', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  ROCKIN_PEG: m(0x9A00, 'Rockin\' Peg', DspType.AMP, ['Vol', 'Gain', 'Gain2', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  KGB_800: m(0x9B00, 'KGB 800', DspType.AMP, ['Vol', 'Gain', 'Gain2', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  MONSTER: m(0xBD00, 'Monster', DspType.AMP, ['Vol', 'Gain', 'Gain2', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),

  // V2 / Hidden
  STUDIO_PREAMP: m(0xf100, 'Studio Preamp', DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
};

//Bronco spécific
// prettier-ignore
export const EFFECT_MODELS: Record<string, ModelDef> = {
  // --- STOMP (Pédales / Distortion ID 1) ---
  MODERN_BASS_OD: m(0xC600, 'Modern Bass Overdrive', DspType.STOMP, ['Level', 'Drive', 'Blend', 'Bass', 'Treb', 'Pres']),
  OVERDRIVE: m(0xC300, 'Overdrive', DspType.STOMP, ['Level', 'Gain', 'Blend', 'Low', 'Mid', 'High']),
  FUZZ: m(0xC400, 'Fuzz', DspType.STOMP, ['Level', 'Gain', 'Octave', 'Low', 'High', 'Blend']),
  GREENBOX: m(0xBA00, 'Greenbox', DspType.STOMP, ['Level', 'Gain', 'Tone', 'Blend']),
  SIMPLE_COMP: m(0x8800, 'Simple Comp', DspType.STOMP, ['Type']),

  // --- MOD (Modulations ID 2) ---
  SINE_CHORUS: m(0x1200, 'Sine Chorus', DspType.MOD, ['Level', 'Rate', 'Depth', 'Avg Dly', 'LR Phase']),
  TRI_CHORUS: m(0x1300, 'Triangle Chorus', DspType.MOD, ['Level', 'Rate', 'Depth', 'Avg Dly', 'LR Phase']),
  SINE_FLANGER: m(0x1800, 'Sine Flanger', DspType.MOD, ['Level', 'Rate', 'Depth', 'Fdback', 'LR Phase']),
  TRI_FLANGER: m(0x1900, 'Triangle Flanger', DspType.MOD, ['Level', 'Rate', 'Depth', 'Fdback', 'LR Phase']),
  VIBRATONE: m(0x2D00, 'Vibratone', DspType.MOD, ['Level', 'Rotor', 'Depth', 'Fdback', 'LR Phase']),
  PHASER: m(0x4F00, 'Phaser', DspType.MOD, ['Level', 'Rate', 'Depth', 'Fdback', 'Shape']),
  STEP_FILTER: m(0x2900, 'Step Filter', DspType.MOD, ['Level', 'Rate', 'Resnnce', 'Mn Freq', 'Mx Freq']),
  ENVELOPE_FILTER: m(0xC500, 'Envelope Controlled Filter', DspType.MOD, ['Level', 'Mode', 'Type', 'Q', 'Thresh']),
  OCTAVE: m(0xBC00, 'Octave', DspType.MOD, ['Direct', 'Octave', 'Sizzle']),

  // --- DELAY (Délais & Reverbs ID 3/4) ---
  MONO_DELAY: m(0x1600, 'Mono Delay', DspType.DELAY, ['Level', 'Dly Time', 'Fdback', 'Bright', 'Attnuat']),
  DUCKING_DELAY: m(0x1500, 'Ducking Delay', DspType.DELAY, ['Level', 'Dly Time', 'Fdback', 'Release', 'Thresh']),
  MULTITAP_DELAY: m(0x4400, 'Multitap Delay', DspType.DELAY, ['Level', 'Dly Time', 'Fdback', 'Bright', 'Mode']),
  PING_PONG_DELAY: m(0x4500, 'Ping Pong Delay', DspType.DELAY, ['Level', 'Dly Time', 'Fdback', 'Bright', 'Stereo']),
  REVERSE_DELAY: m(0x4600, 'Reverse Delay', DspType.DELAY, ['Level', 'Dly Time', 'FFdbk', 'RFdbk', 'Tone']),
  TAPE_DELAY: m(0x2B00, 'Tape Delay', DspType.DELAY, ['Level', 'Dly Time', 'Fdback', 'Flutter', 'Bright', 'Stereo']),
  ST_TAPE_DELAY: m(0x2A00, 'Stereo Tape Delay', DspType.DELAY, ['Level', 'Dly Time', 'Fdback', 'Flutter', 'Separatn', 'Bright']),
  MONO_ECHO_FILTER: m(0x4300, 'Mono Echo Filter', DspType.DELAY, ['Level', 'Dly Time', 'Fdback', 'Freq', 'Resnnce', 'In Lvl']),
  ST_ECHO_FILTER: m(0x4800, 'Stereo Echo Filter', DspType.DELAY, ['Level', 'Dly Time', 'Fdback', 'Freq', 'Resnnce', 'In Lvl']),
  PITCH_SHIFT_DLY: m(0xBB00, 'Pitch Shift Delay', DspType.DELAY, ['Level', 'Pitch', 'Detune', 'Fdback', 'Pre Dly']),

  // --- REVERB (Groupées en DspType.DELAY) ---
  SMALL_HALL: m(0x2400, 'Small Hall Reverb', DspType.DELAY, ['Level', 'Decay', 'Dwell', 'Diffusn', 'Tone']),
  LARGE_HALL: m(0x3A00, 'Large Hall Reverb', DspType.DELAY, ['Level', 'Decay', 'Dwell', 'Diffusn', 'Tone']),
  SMALL_ROOM: m(0x2600, 'Small Room Reverb', DspType.DELAY, ['Level', 'Decay', 'Dwell', 'Diffusn', 'Tone']),
  LARGE_ROOM: m(0x3B00, 'Large Room Reverb', DspType.DELAY, ['Level', 'Decay', 'Dwell', 'Diffusn', 'Tone']),
  SMALL_PLATE: m(0x4E00, 'Small Plate Reverb', DspType.DELAY, ['Level', 'Decay', 'Dwell', 'Diffusn', 'Tone']),
  LARGE_PLATE: m(0x4B00, 'Large Plate Reverb', DspType.DELAY, ['Level', 'Decay', 'Dwell', 'Diffusn', 'Tone']),
  AMBIENT: m(0x4C00, 'Ambient Reverb', DspType.DELAY, ['Level', 'Decay', 'Dwell', 'Diffusn', 'Tone']),
  ARENA: m(0x4D00, 'Arena Reverb', DspType.DELAY, ['Level', 'Decay', 'Dwell', 'Diffusn', 'Tone']),
  F_SPRING_63: m(0x2100, '\'63 Fender Spring Reverb', DspType.DELAY, ['Level', 'Decay', 'Dwell', 'Diffusn', 'Tone']),
  F_SPRING_65: m(0x0B00, '\'65 Fender Spring Reverb', DspType.DELAY, ['Level', 'Decay', 'Dwell', 'Diffusn', 'Tone']),
  };

//Bronco spécific
// prettier-ignore
export const CABINET_MODELS: CabinetDef[] = [ //ParamType="147"
  { id: 0x00, name: 'Off' },
  { id: 0x01, name: '1x10 Bronco' },
  { id: 0x02, name: '2x10 SWR Redhead' }, // Utilisé par SWR Redhead [cite: 656]
  { id: 0x03, name: '1x15 Fender Rumble' }, // Utilisé par Fender Rumble
  { id: 0x04, name: '1x18 KGB 800' },      // Utilisé par KGB 800 [cite: 677]
  { id: 0x05, name: '4x10 Bassman 300' },  // Utilisé par Bassman 300 [cite: 646]
  { id: 0x06, name: '8x10 Rockin Peg' },   // Utilisé par Rockin' Peg [cite: 666]
  { id: 0x07, name: '4x10 KGB' },
  { id: 0x08, name: '4x12' },
  { id: 0x09, name: '4x10 Monster' },      // Utilisé par Monster [cite: 687]
  { id: 0x0a, name: '2x15 Bassman TV' },   // Utilisé par Bassman TV [cite: 635]
  { id: 0x0b, name: '2x15' },
  { id: 0x0c, name: '4x10 Bassman' },
  { id: 0x0d, name: '4x10 \'59 Bassman' }, // Utilisé par '59 Bassman
];

/*
// prettier-ignore
export const AMP_MODELS: Record<string, ModelDef> = {
  // Standard V1
  F57_DELUXE: m(0x6700, "'57 Deluxe", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  F59_BASSMAN: m(0x6400, "'59 Bassman", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  F57_CHAMP: m(0x7c00, "'57 Champ", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  F65_DELUXE: m(0x5300, "'65 Deluxe Reverb", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  F65_PRINCETON: m(0x6a00, "'65 Princeton", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  F65_TWIN: m(0x7500, "'65 Twin Reverb", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  SUPER_SONIC: m(0x7200, 'Super-Sonic', DspType.AMP, ['Vol', 'Gain', 'Gain2', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  BRIT_60S: m(0x6100, "British '60s", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  BRIT_70S: m(0x7900, "British '70s", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  BRIT_80S: m(0x5e00, "British '80s", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  US_90S: m(0x5d00, "American '90s", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  METAL_2000: m(0x6d00, 'Metal 2000', DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  // V2 / Hidden
  STUDIO_PREAMP: m(0xf100, 'Studio Preamp', DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  F57_TWIN: m(0xf600, "'57 Twin", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  THRIFT_60S: m(0xf900, "'60s Thrift", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  BRIT_WATTS: m(0xff00, 'British Watts', DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  BRIT_COLOUR: m(0xfc00, 'British Colour', DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', 'Pres']),
  // Bronco Bass Amps
  RUMBLE: m(0x9600, "Rumble", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', '']),
  BASSMAN_TV: m(0x9700, "Bassman TV", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', '']),
  BASSMAN_300: m(0x9800, "Bassman 300", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', '']),
  KGB_800: m(0x9b00, "KGB 800 (GK)", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', '']),
  ROCKIN_PEG: m(0x9a00, "Rockin' Peg (Ampeg)", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', '']),
  SWR_REDHEAD: m(0x9900, "SWR Redhead", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', '']),
  MONSTER: m(0xbd00, "Monster", DspType.AMP, ['Vol', 'Gain', '', 'Master', 'Treb', 'Mid', 'Bass', '']),
};
*/

/*
// prettier-ignore
export const EFFECT_MODELS: Record<string, ModelDef> = {
  // Stomps
  OVERDRIVE: m(0x3c00, 'Overdrive', DspType.STOMP, ['Level', 'Gain', 'Low', 'Mid', 'High', '']),
  WAH: m(0x4900, 'Fixed Wah', DspType.STOMP, ['Level', 'Freq', 'Min', 'Max', 'Q', '']),
  TOUCH_WAH: m(0x4a00, 'Touch Wah', DspType.STOMP, ['Level', 'Sens', 'Min', 'Max', 'Q', '']),
  FUZZ: m(0x1a00, 'Fuzz', DspType.STOMP, ['Level', 'Gain', 'Octave', 'Low', 'High', '']),
  FUZZ_TOUCH_WAH: m(0x1c00, 'Fuzz Touch Wah', DspType.STOMP, ['Level', 'Gain', 'Sens', 'Octave', 'Peak', '']),
  SIMPLE_COMP: m(0x8800, 'Simple Comp', DspType.STOMP, ['Type', '', '', '', '', '']),
  COMPRESSOR: m(0x0700, 'Compressor', DspType.STOMP, ['Level', 'Thresh', 'Ratio', 'Attack', 'Release', '']),
  // V2 Stomps
  RANGER_BOOST: m(0x0301, 'Ranger Boost', DspType.STOMP, ['Level', 'Gain', 'Tone', '', '', '']),
  GREEN_BOX: m(0xba00, 'Green Box', DspType.STOMP, ['Level', 'Gain', 'Tone', 'Blend', '', '']),
  ORANGE_BOX: m(0x0101, 'Orange Box', DspType.STOMP, ['Level', 'Gain', 'Tone', '', '', '']),
  BLACK_BOX: m(0x1101, 'Black Box', DspType.STOMP, ['Level', 'Gain', 'Tone', '', '', '']),
  BIG_FUZZ: m(0x0f01, 'Big Fuzz', DspType.STOMP, ['Level', 'Tone', 'Sustain', '', '', '']),
  // Mod
  SINE_CHORUS: m(0x1200, 'Sine Chorus', DspType.MOD, ['Level', 'Rate', 'Depth', 'Avg Dly', 'LR Phase', '']),
  TRIANGLE_CHORUS: m(0x1300, 'Triangle Chorus', DspType.MOD, ['Level', 'Rate', 'Depth', 'Avg Dly', 'LR Phase', '']),
  SINE_FLANGER: m(0x1800, 'Sine Flanger', DspType.MOD, ['Level', 'Rate', 'Depth', 'Fdbk', 'LR Phase', '']),
  TRIANGLE_FLANGER: m(0x1900, 'Triangle Flanger', DspType.MOD, ['Level', 'Rate', 'Depth', 'Fdbk', 'LR Phase', '']),
  VIBRATONE: m(0x2d00, 'Vibratone', DspType.MOD, ['Level', 'Rotor', 'Depth', 'Fdbk', 'LR Phase', '']),
  VINTAGE_TREMOLO: m(0x4000, 'Vintage Tremolo', DspType.MOD, ['Level', 'Rate', 'Duty', 'Attack', 'Release', '']),
  SINE_TREMOLO: m(0x4100, 'Sine Tremolo', DspType.MOD, ['Level', 'Rate', 'Duty', 'LFO Clip', 'Tri Shape', '']),
  RING_MODULATOR: m(0x2200, 'Ring Modulator', DspType.MOD, ['Level', 'Freq', 'Depth', 'Shape', 'Phase', '']),
  STEP_FILTER: m(0x2900, 'Step Filter', DspType.MOD, ['Level', 'Rate', 'Res', 'Min Freq', 'Max Freq', '']),
  PHASER: m(0x4f00, 'Phaser', DspType.MOD, ['Level', 'Rate', 'Depth', 'Fdbk', 'Shape', '']),
  PITCH_SHIFTER: m(0x1f00, 'Pitch Shifter', DspType.MOD, ['Level', 'Pitch', 'Detune', 'Fdbk', 'PreDly', '']),
  // Delay
  MONO_DELAY: m(0x1600, 'Mono Delay', DspType.DELAY, ['Level', 'Time', 'Fdbk', 'Bright', 'Atten', '']),
  MONO_ECHO_FILTER: m(0x4300, 'Mono Echo Filter', DspType.DELAY, ['Level', 'Time', 'Fdbk', 'Freq', 'Res', 'Input']),
  STEREO_ECHO_FILTER: m(0x4800, 'Stereo Echo Filter', DspType.DELAY, ['Level', 'Time', 'Fdbk', 'Freq', 'Res', 'Input']),
  TAPE_DELAY: m(0x2b00, 'Tape Delay', DspType.DELAY, ['Level', 'Time', 'Fdbk', 'Flutter', 'Bright', 'Stereo']),
  STEREO_TAPE_DELAY: m(0x2a00, 'Stereo Tape Delay', DspType.DELAY, ['Level', 'Time', 'Fdbk', 'Flutter', 'Sep', 'Bright']),
  DUCKING_DELAY: m(0x1500, 'Ducking Delay', DspType.DELAY, ['Level', 'Time', 'Fdbk', 'Release', 'Thresh', '']),
  REVERSE_DELAY: m(0x4600, 'Reverse Delay', DspType.DELAY, ['Level', 'Time', 'Fdbk', 'Bright', 'Atten', '']),
  MULTITAP_DELAY: m(0x4400, 'Multitap Delay', DspType.DELAY, ['Level', 'Time', 'Fdbk', 'Bright', 'Atten', '']),
  PING_PONG_DELAY: m(0x4500, 'Ping Pong Delay', DspType.DELAY, ['Level', 'Time', 'Fdbk', 'Bright', 'Atten', '']),
  // Reverb
  SMALL_HALL: m(0x2400, 'Small Hall', DspType.REVERB, ['Level', 'Decay', 'Dwell', 'Diff', 'Tone', '']),
  LARGE_HALL: m(0x3a00, 'Large Hall', DspType.REVERB, ['Level', 'Decay', 'Dwell', 'Diff', 'Tone', '']),
  SMALL_ROOM: m(0x2600, 'Small Room', DspType.REVERB, ['Level', 'Decay', 'Dwell', 'Diff', 'Tone', '']),
  LARGE_ROOM: m(0x3b00, 'Large Room', DspType.REVERB, ['Level', 'Decay', 'Dwell', 'Diff', 'Tone', '']),
  SMALL_PLATE: m(0x4e00, 'Small Plate', DspType.REVERB, ['Level', 'Decay', 'Dwell', 'Diff', 'Tone', '']),
  LARGE_PLATE: m(0x4b00, 'Large Plate', DspType.REVERB, ['Level', 'Decay', 'Dwell', 'Diff', 'Tone', '']),
  AMBIENT: m(0x4c00, 'Ambient', DspType.REVERB, ['Level', 'Decay', 'Dwell', 'Diff', 'Tone', '']),
  ARENA: m(0x4d00, 'Arena', DspType.REVERB, ['Level', 'Decay', 'Dwell', 'Diff', 'Tone', '']),
  SPRING_63: m(0x2100, "'63 Spring", DspType.REVERB, ['Level', 'Decay', 'Dwell', 'Diff', 'Tone', '']),
  SPRING_65: m(0x0b00, "'65 Spring", DspType.REVERB, ['Level', 'Decay', 'Dwell', 'Diff', 'Tone', '']),
  // Effets spécifiques Bronco
  MODERN_BASS_OD: m(0xbc00, 'Modern Bass Overdrive', DspType.STOMP, ['Level', 'Gain', 'Low', 'Mid', 'High', 'Blend']),
  OCTAVE: m(0xbb00, 'Octave Down', DspType.STOMP, ['Level', 'Mix', 'Tone', '', '', '']),
  BASS_COMP: m(0x0700, 'Bass Compressor', DspType.STOMP, ['Thresh', 'Ratio', 'Attack', 'Release', 'Gain', '']),
  ENVELOPE_FILTER: m(0xbe00, 'Envelope Filter', DspType.MOD, ['Sens', 'Range', 'Curve', 'Attack', 'Release', '']),
  // Égaliseurs avancés (cachés)
  GRAPHIC_EQ: m(0xc600, 'Graphic EQ', DspType.STOMP, ['100Hz', '200Hz', '400Hz', '800Hz', '1.6k', '3.2k', '6.4k', 'Level']),
  PARAMETRIC_EQ: m(0xc500, 'Parametric EQ', DspType.STOMP, ['Low F', 'Low G', 'Low Q', 'Mid F', 'Mid G', 'Mid Q', 'Hi F', 'Hi G']),
};
*/
/*
// prettier-ignore

export const CABINET_MODELS: CabinetDef[] = [
  { id: 0x00, name: 'Off' },
  { id: 0x01, name: "1x12 '57 Deluxe" },
  { id: 0x02, name: "4x10 '59 Bassman" },
  { id: 0x03, name: "1x8 '57 Champ" },
  { id: 0x04, name: "1x12 '65 Deluxe" },
  { id: 0x05, name: "1x10 '65 Princeton" },
  { id: 0x06, name: '4x12 Metal 2000' },
  { id: 0x07, name: "2x12 British '60s" },
  { id: 0x08, name: "4x12 British '70s" },
  { id: 0x09, name: "2x12 '65 Twin" },
  { id: 0x0a, name: "4x12 British '80s" },
  { id: 0x0b, name: '2x12 Super-Sonic' },
  { id: 0x0c, name: '1x12 Super-Sonic' },
  { id: 0x0D, name: "2x12 '57 Twin" },
  { id: 0x0E, name: "2x12 '60s Thrift" },
  { id: 0x0F, name: '4x12 British Watts' },
  { id: 0x10, name: '4x12 British Colour' },
  { id: 0x11, name: "1x10 Bronco" },
];


*/

export type TexturePreset = {
  size: { x: number; y: number };
  radius: number;
  clipToShape: boolean;
};

export type TextureTransition = {
  default: TexturePreset;
  hover: TexturePreset;
};

export const effects = {
  texture: {
    // Figma: Texture-L-1 / Texture-L-2 (core artwork).
    l1: { size: { x: 8, y: 8 }, radius: 2, clipToShape: false },
    l2: { size: { x: 7, y: 7 }, radius: 2, clipToShape: false },
    // Figma: Texture-M-1 / Texture-M-2 (supporting artwork).
    m1: { size: { x: 5, y: 5 }, radius: 1.5, clipToShape: false },
    m2: { size: { x: 4, y: 4 }, radius: 1.5, clipToShape: false },
  },
} as const satisfies { texture: Record<string, TexturePreset> };

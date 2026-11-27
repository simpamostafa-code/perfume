import { STONE_TEXTURE_IMAGE } from '../data/perfumes';

interface StoneBackdropProps {
  accentRgb?: string;
  intensity?: 'gallery' | 'detail';
}

export function StoneBackdrop({
  accentRgb = '217, 155, 56',
  intensity = 'gallery',
}: StoneBackdropProps) {
  const ambientOpacity = intensity === 'detail' ? 0.1 : 0.055;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030304]"
    >
      {/* Ultra-subtle outer monolith stone presence */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-screen"
        style={{
          backgroundImage: `url(${STONE_TEXTURE_IMAGE})`,
          filter: 'contrast(1.15) brightness(0.28)',
        }}
      />

      {/* Whisper of ambient colored bounce light on outer obsidian wall */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(ellipse 52% 46% at 50% 42%, rgba(${accentRgb}, ${ambientOpacity}) 0%, transparent 72%)`,
        }}
      />

      {/* Pure pitch-black edge framing */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 82% 82% at 50% 50%, transparent 32%, rgba(2, 2, 3, 0.88) 84%, rgba(2, 2, 3, 0.98) 100%)',
        }}
      />
    </div>
  );
}

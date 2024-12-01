import { hexToRGBA } from './hex-to-rgba';

describe('hexToRGBA', () => {
  test('converts 6-digit hex to rgba string', () => {
    const hex = '#FF5733';
    const alpha = 0.5;
    const result = hexToRGBA(hex, alpha);
    expect(result).toBe('rgba(255,87,51,0.5)');
  });

  test('converts 3-digit hex to rgba string', () => {
    const hex = '#F73';
    const alpha = 1;
    const result = hexToRGBA(hex, alpha);
    expect(result).toBe('rgba(255,119,51,1)');
  });

  test('handles hex without "#" prefix', () => {
    const hex = '00FF00';
    const alpha = 0.3;
    const result = hexToRGBA(hex, alpha);
    expect(result).toBe('rgba(0,255,0,0.3)');
  });

  test('handles invalid hex gracefully', () => {
    const hex = 'INVALID';
    const alpha = 0.8;
    const result = hexToRGBA(hex, alpha);
    expect(result).toBe('rgba(0,0,0,0.8)'); // Default fallback for invalid input
  });
});

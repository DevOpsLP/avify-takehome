// Helper function to convert hex to rgba
export function hexToRGBA(hex: string, alpha: number): string {
    let r = 0, g = 0, b = 0;
  
    // Remove '#' if present
    hex = hex.replace('#', '');
  
    // Handle 3-digit hex
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    }
    // Handle 6-digit hex
    else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  
    return `rgba(${r},${g},${b},${alpha})`;
  }
  
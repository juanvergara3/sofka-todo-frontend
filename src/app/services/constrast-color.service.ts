import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstrastColorService {

  hexToRgb(hex: string): { red: number, green: number, blue: number } {
    return {
      red: parseInt(hex.slice(0, 2), 16),
      green: parseInt(hex.slice(2, 4), 16),
      blue: parseInt(hex.slice(4, 6), 16)
    };
  }

  rbgToHex(red: number, green: number, blue: number): string {
    return `${[red, green, blue].map(c => c.toString(16).padStart(2, '0')).join('')}`;
  }

  calculateLuminance(red: number, green: number, blue: number): number {
    return [red, green, blue].map(c => {
      c /= 255.0;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    }).reduce((acc, c, i) => acc + c * [0.2126, 0.7152, 0.0722][i], 0);
  }

  calculteContrast(color: string): string {
    const { red, green, blue } = this.hexToRgb(color);

    const luminance = this.calculateLuminance(red, green, blue);

    return luminance > 0.179 ? '000000' : 'ffffff';
  }

  adjustColorBrightness(color: string): string {

    if (color == '000000') {
      const value = Math.round(255 * 0.1)

      return this.rbgToHex(value, value, value)
    }

    let { red, green, blue } = this.hexToRgb(color);

    const luminance = this.calculateLuminance(red, green, blue);
    const adjustment = luminance > 0.179 ? -0.2 : 0.5;

    red = Math.min(255, Math.max(0, Math.round(red * (1 + adjustment))));
    green = Math.min(255, Math.max(0, Math.round(green * (1 + adjustment))));
    blue = Math.min(255, Math.max(0, Math.round(blue * (1 + adjustment))));

    return this.rbgToHex(red, green, blue);
  }
}

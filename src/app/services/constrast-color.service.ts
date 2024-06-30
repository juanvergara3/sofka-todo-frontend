import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstrastColorService {
  calculteContrast(color: string): string {
    let red = parseInt(color.slice(1, 3), 16);
    let green = parseInt(color.slice(3, 5), 16);
    let blue = parseInt(color.slice(5, 7), 16);

    const luminance = [red, green, blue].map(c => {
      c /= 255.0;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    }).reduce((acc, c, i) => acc + c * [0.2126, 0.7152, 0.0722][i], 0);

    return luminance > 0.179 ? '000000' : 'ffffff';
  }
}

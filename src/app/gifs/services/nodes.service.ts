import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private startElement: any = null;
  private startPosition: string = '';

  startConnecting(event: MouseEvent, element: any, position: string) {
    this.startElement = element;
    this.startPosition = position;
    document.addEventListener('mouseup', this.endConnecting);
  }

  endConnecting = (event: MouseEvent) => {
    document.removeEventListener('mouseup', this.endConnecting);
    // Aquí detectar con qué elemento se soltó y dibujar la línea
    console.log(`Conectado desde ${this.startElement} en ${this.startPosition}`);
  };
}

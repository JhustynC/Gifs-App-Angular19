import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-draggable-textarea',
  templateUrl: './draggable-element.component.html',
  imports: [CommonModule, FormsModule, ]
})
export class DragDropComponent  {

  // Posición y dimensiones iniciales del recuadro
  public top: number = 100;
  public left: number = 100;
  public width: number = 300;
  public height: number = 200;

  // Texto editable
  public text: string = 'Ingrese su texto aquí';

  // Variables internas para el drag
  private isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private initialLeft = 0;
  private initialTop = 0;

  // Variables internas para el resize
  private isResizing = false;
  private resizeStartX = 0;
  private resizeStartY = 0;
  private initialWidth = 0;
  private initialHeight = 0;

  @ViewChild('box') boxElement!: ElementRef;

  ngOnInit(): void {
    // Se agregan los event listeners al documento cuando se inicia alguna acción
  }

  ngOnDestroy(): void {
    // Limpiar los event listeners para evitar memory leaks
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  // Inicia el arrastre, excepto si se hace clic en el área de redimensión
  onMouseDownDrag(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('resize-handle')) {
      return;
    }
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.initialLeft = this.left;
    this.initialTop = this.top;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  // Inicia la acción de redimensión
  onMouseDownResize(event: MouseEvent): void {
    this.isResizing = true;
    this.resizeStartX = event.clientX;
    this.resizeStartY = event.clientY;
    this.initialWidth = this.width;
    this.initialHeight = this.height;
    // Evitar que el drag se inicie
    event.stopPropagation();
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  // Maneja el movimiento tanto para el drag como para el resize
  onMouseMove = (event: MouseEvent): void => {
    if (this.isDragging) {
      const deltaX = event.clientX - this.dragStartX;
      const deltaY = event.clientY - this.dragStartY;
      this.left = this.initialLeft + deltaX;
      this.top = this.initialTop + deltaY;
    }
    if (this.isResizing) {
      const deltaX = event.clientX - this.resizeStartX;
      const deltaY = event.clientY - this.resizeStartY;
      this.width = this.initialWidth + deltaX;
      this.height = this.initialHeight + deltaY;
      // Establecer dimensiones mínimas
      if (this.width < 50) { this.width = 50; }
      if (this.height < 50) { this.height = 50; }
    }
  }

  // Finaliza tanto la acción de drag como la de resize
  onMouseUp = (event: MouseEvent): void => {
    this.isDragging = false;
    this.isResizing = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  // Actualiza el contenido del texto cuando se edita
  onTextInput(event: Event): void {
    const target = event.target as HTMLElement;
    this.text = target.innerText;
  }

  // Getter para calcular el tamaño de fuente dinámicamente (se puede ajustar la fórmula)
  get fontSize(): string {
    // Se utiliza el mínimo entre el ancho y la altura para calcular un tamaño de fuente proporcional
    const size = Math.max(12, Math.min(this.width, this.height) / 10);
    return `${size}px`;
  }
}

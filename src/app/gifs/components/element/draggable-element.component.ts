import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-diagram-editor',
  templateUrl: './draggable-element.component.html',
  imports: [CommonModule]
})
export class DiagramEditorComponent {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  @ViewChild('svgCanvas', { static: true }) svgCanvas!: ElementRef;
  figures: any[] = [];
  lines: any[] = [];
  selectedFigure: any = null;
  connectingMode: boolean = false;

  constructor(private renderer: Renderer2) {}

  addRectangle() {
    this.figures.push({ type: 'rectangle', x: 50, y: 50, width: 100, height: 60, text: 'Nuevo Rectángulo', selected: false });
  }

  addCircle() {
    this.figures.push({ type: 'circle', x: 150, y: 150, width: 80, height: 80, text: 'Nuevo Círculo', selected: false });
  }

  addLine() {
    this.connectingMode = true;
  }

  selectFigure(event: MouseEvent, figure: any) {
    event.stopPropagation();
    if (this.connectingMode && this.selectedFigure) {
      this.lines.push({
        x1: this.selectedFigure.x + this.selectedFigure.width / 2,
        y1: this.selectedFigure.y + this.selectedFigure.height / 2,
        x2: figure.x + figure.width / 2,
        y2: figure.y + figure.height / 2
      });
      this.connectingMode = false;
      this.selectedFigure.selected = false;
      this.selectedFigure = null;
    } else {
      this.figures.forEach(f => f.selected = false);
      figure.selected = true;
      this.selectedFigure = figure;
    }
  }

  updateText(event: Event, figure: any) {
    const div = event.target as HTMLElement;
    figure.text = div.innerText;
    const textHeight = div.scrollHeight;
    if (textHeight > figure.height) {
      figure.height = textHeight;
    }
  }

  deselectFigure(event: MouseEvent) {
    this.figures.forEach(f => f.selected = false);
    this.selectedFigure = null;
  }
}

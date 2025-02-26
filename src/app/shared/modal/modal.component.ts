import { Component, effect, inject, signal, WritableSignal } from "@angular/core";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalService } from "src/app/shared/modal/service/modal.service";

@Component({
  selector: 'shared-modal-component',
  templateUrl: "./modal.component.html",
  imports: [DragDropModule],
})
export class ModalComponent {

  modalStatus: WritableSignal<boolean> = signal<boolean>(false);
  modalService = inject(ModalService);

  constructor(){
    effect(() => {
      this.modalStatus.set(this.modalService.getModalStatus())
    });
  }

  closeModal(): void{
    this.modalService.closeModal()
  }

  openModal(): void{
    this.modalService.openModal()
  }
}

import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalVisibility = signal<boolean>(false); 

  getModalStatus(){
    return this.modalVisibility()
  }

  openModal(){
    this.modalVisibility.set(true);
  }

  closeModal(){
    this.modalVisibility.set(false)
  }

}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-addpostmodal',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './addpostmodal.component.html',
  styleUrl: './addpostmodal.component.css'
})
export class AddpostmodalComponent {
  title: string = '';
  content: string = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitPost = new EventEmitter<{title: string, content: string}>();

  onClose(): void{
    this.closeModal.emit();
  }

  onSubmit(): void{
    if(this.title.trim() && this.content.trim()){
      this.submitPost.emit({title: this.title, content: this.content});
    }
  }

}

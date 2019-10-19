import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-mensagem-erro',
  templateUrl: './mensagem-erro.component.html',
  styleUrls: ['./mensagem-erro.component.css']
})
export class MensagemErroComponent {

  @Input() control: FormControl;
  @Input() error: string;
  @Input() text: string;

  constructor() { }

  temErro() {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}

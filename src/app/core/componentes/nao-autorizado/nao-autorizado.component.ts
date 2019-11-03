import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nao-autorizado',
  template: `
    <div class="container">
        <div class="ui-g">
            <div class="ui-g-12">
                <h1>Acesso não autorizado!</h1>
            </div>
        </div>
    </div>
  `,
  styles: []
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

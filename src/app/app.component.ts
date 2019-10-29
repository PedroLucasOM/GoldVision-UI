import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GoldVision-UI';

  constructor(private router: Router) {
  }

  showNavbar() {
    return this.router.url !== '/login';
  }
}

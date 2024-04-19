import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styles: ``
})
export class AlertComponent {

  @Input() type: 'success' | 'danger' | 'info' = 'success';

  get alertClass() {
    const classList = ['alert'];
    classList.push(`alert-${this.type}`);
    return classList.join(' ');
  }

}

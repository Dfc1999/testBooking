import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav-button',
  imports: [RouterModule, MatButtonModule],
  templateUrl: './nav-button.html',
  styleUrl: './nav-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavButton {
  @Input() route: string = '/';
  @Input() label: string = 'Button';
  @Output() action = new EventEmitter<void>(); 

  onClick() {
    this.action.emit(); 
  }
}

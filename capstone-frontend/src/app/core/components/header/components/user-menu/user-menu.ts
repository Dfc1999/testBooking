import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../../../services/login-service/login-service';
import { ButtonLogout } from '../button-logout/button-logout';
import { HotelService } from '../../../../services/hotel-service/hotel-service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [RouterModule, MatMenuModule, MatButtonModule, MatIconModule, ButtonLogout],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenu {
  constructor(public loginService: LoginService, private hotelService: HotelService) {}

  clearFilters() {
    this.hotelService.clearFilters();
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBox } from './components/search-box/search-box';
import { Filter } from '../../../features/filter/filter';
import { LoginService } from '../../services/login-service/login-service';
import { HotelService } from '../../services/hotel-service/hotel-service';
import { Subject, takeUntil } from 'rxjs';
import { UserMenu } from './components/user-menu/user-menu';
import { NavButton } from './components/nav-button/nav-button';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, SearchBox, UserMenu, NavButton, Filter, AsyncPipe],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header implements OnInit {
  showFilters = false;
  currentFilters: any = {};
  private destroy$ = new Subject<void>();

  constructor(public loginService: LoginService, public hotelService: HotelService) {}

  ngOnInit() {
    this.hotelService.filters$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filters => {
        this.currentFilters = filters || {};
      });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onFiltersApplied() {
    this.showFilters = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}



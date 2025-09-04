import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('capstone-frontend');
  isLoggedInPage: boolean = false;
  private routerSubscription!: Subscription;
  isAppReady: boolean = false; // Nueva bandera

  constructor(private router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkLoginRoute(event.url);
      this.isAppReady = true; // El enrutador ha terminado, la aplicación está lista
    });
    // Verificación inicial para la primera carga
    this.checkLoginRoute(this.router.url);
    this.isAppReady = true;
  }

  private checkLoginRoute(url: string) {
    this.isLoggedInPage = url.includes('/login');
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}

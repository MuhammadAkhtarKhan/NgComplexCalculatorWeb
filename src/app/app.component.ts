

import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { CustomloaderService } from './custom-loader/customloader.service';
import { CustomLoaderComponent } from './custom-loader/custom-loader.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomLoaderComponent, CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  loaderService = inject(CustomloaderService)
  authService = inject(AuthService)
  private readonly cdr = inject(ChangeDetectorRef);
  loading = false;
  isLogout=true;
   routerUrl:string="";
     windowPath = '';
  constructor(private router: Router, private route: ActivatedRoute) {
   
   }
  ngOnInit(): void {
    this.authService.logout$.subscribe(val=>{
    this.isLogout=val;
    })
  // fallback
    this.windowPath = window.location.pathname;

   this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map(event => event as NavigationStart))
      .subscribe(event => {
       console.log(event.url)
       this.routerUrl=event.url;
       if(this.routerUrl=="/login"|| this.routerUrl=="/"){
      this.isLogout=true;
    }
      }
      );
     
    
  }
  onClickLogout() {
   this.authService.logout();
  }
  ngAfterViewInit() {
    this.loaderService.isLoading.subscribe(x => {

    });
    this.cdr.detectChanges();
  }
}



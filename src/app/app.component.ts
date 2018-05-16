import { Component, OnInit } from '@angular/core';
import {
  Router, RouterEvent, NavigationStart,
  NavigationEnd, NavigationCancel, NavigationError
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Vibe';
  public loading: boolean = true;

  ngOnInit() {
    var c :any = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    // Create gradient
    var grd = ctx.createRadialGradient(15, 20, 5, 40, 20, 100);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "red");

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.font = "18px CURSIVE";
    ctx.fillText("© Vibe Store Application", 5, 50);
  }

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: RouterEvent) {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }

    if (event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError) {
    }
  }
}

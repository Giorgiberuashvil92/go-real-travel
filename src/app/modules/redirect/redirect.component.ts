import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  planeLeft: number = 0;
  planeTop: number = 100;
  planeRotation: number = -30;
  planeOpacity: number = 1;
  fadedOpacity: number = 0;
  animationDuration: number = 1.8;

  constructor(
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.animate();
    setInterval(() => {
      this.animate();
    }, this.animationDuration * 1000 + 1005);

    setTimeout(() => {
      const url = localStorage.getItem('urlToRedirect');
      localStorage.removeItem('urlToRedirect');
      window.open(url, "_self");
    }, 5000);
  }
  
  animate() {
    this.planeOpacity = 1;
    for(let i=0; i<=100; i++) {
      setTimeout(() => {
        this.planeLeft = i;
        this.planeTop = 0.045 * Math.pow(i-50, 2);
        this.planeRotation = (i-50) * 30 / 50;
      }, this.animationDuration * 10 * i)
    }

    setTimeout(() => {
      setTimeout(() => {
        this.planeOpacity = 0;
        this.planeLeft = 0;
        this.planeTop = 112.5;
        this.planeRotation = -30;
      }, 12);
      for(let i=0.99; i>=0; i-=0.01) {
        setTimeout(() => {
          this.fadedOpacity = i;
          if(i < 0.5) {
            this.planeOpacity = 1 - i * 2;
          }
        }, (1-i) * 100 * 10);
      }
    }, this.animationDuration * 1000 + 5);
  }
}

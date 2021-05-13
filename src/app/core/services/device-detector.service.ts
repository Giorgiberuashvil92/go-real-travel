import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {

  isDesktop: boolean;
  isMobile: boolean;
  width: number;
  height: number;

  constructor() {
    this.detectDevice();
    fromEvent(window, 'resize').subscribe((e: Event) => this.detectDevice());
  }

  private detectDevice() {
    this.isDesktop = window.innerWidth > environment.breakpoint;
    this.isMobile = window.innerWidth <= environment.breakpoint;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}

import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'src/app/core/services/device-detector.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showMobileHeader = false;

  constructor(
    public deviceDetectorService: DeviceDetectorService
  ) { }

  ngOnInit(): void {
  }

  onShowMobileHeader() {
    
  }
}

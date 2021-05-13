import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit, OnChanges {

  @Input() data: any[] = [];
  @Output() indexChange = new EventEmitter<number>();
  currentIndex = 0;
  watch: boolean = false;

  config: SwiperConfigInterface = {
    navigation: {
      nextEl: 'none',
      prevEl: 'none'
    },
    loop: true
  };

  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnChanges() {
    this.indexChange.emit(0);
    this.currentIndex = 0;
    this.watch = true;
    this.config.loop = this.data.length > 1;
    setTimeout(() => {
      this.watch = false
    }, 0);
  }

  onIndexChange(event: number) {
    this.indexChange.emit(event);
    this.currentIndex = event;
  }

  goLeftSlider() {
    if(this.currentIndex <= 0) return;
    this.currentIndex--;
  }

  goRightSlider() {
    if(this.currentIndex >= this.data.length - 1) return;
    this.currentIndex++;
  }
}

import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LocationPaginator } from 'src/app/core/models/location-paginator.model';
import { DeviceDetectorService } from 'src/app/core/services/device-detector.service';
import { ItineraryService } from 'src/app/core/services/itinerary.service';
import { AppState } from 'src/app/store/models';
import { ItineraryState } from 'src/app/store/reducers';

@Component({
  selector: 'app-location-paginator',
  templateUrl: './location-paginator.component.html',
  styleUrls: ['./location-paginator.component.scss']
})
export class LocationPaginatorComponent implements OnInit, OnDestroy {

  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  data: any[];
  @Input() leftMostIndex: number = 1;
  @Input() locationsToShow: number = 5;
  @Input() activeIndex: number = 1;
  @Output() locationChange: EventEmitter<number> = new EventEmitter<number>();

  dataToShow: any[];
  mobileTranslate: number = 0;
  isTouched = false;
  initialTouchX: number = 0;

  itineraryState: ItineraryState;
  itineraryStateSub: Subscription;

  constructor(
    public deviceDetectorService: DeviceDetectorService,
    private store: Store<AppState>,
    public itineraryService: ItineraryService
  ) { }

  ngOnInit(): void {
    this.itineraryStateSub = this.store.select(store => store.itinerary).subscribe(res => {
      this.itineraryState = res;
      this.data = this.itineraryState.data.data.attributes['transportation-plan'];
      if(this.deviceDetectorService.isDesktop) {
        this.generateArray();
      } else {
        this.dataToShow = this.data;
      }
    });

  }

  onLeft() {
    if(this.leftMostIndex > 1) {
      this.leftMostIndex--;
      this.generateArray();
    }
    if(this.activeIndex > 1) {
      this.activeIndex--;
      this.locationChange.emit(this.activeIndex);
    }
  }

  onRight() {
    if(this.leftMostIndex + this.locationsToShow <= this.data.length) {
      this.leftMostIndex++;
      this.generateArray();
    }
    if(this.activeIndex < this.data.length) {
      this.activeIndex++;
      this.locationChange.emit(this.activeIndex);
    }
  }

  changeIndex(index: number) {
    this.activeIndex = index;
    this.locationChange.emit(this.activeIndex);
  }

  onTouchStart(event) {
    if(this.deviceDetectorService.isMobile) {
      this.initialTouchX = event.touches[0].clientX;
    }
  }

  onTouchMove(event) {
    if(this.deviceDetectorService.isMobile) {
      const clientX = event.touches[0].clientX;
      const diff = clientX - this.initialTouchX;
      if((this.mobileTranslate < 0 || diff < 0) && (this.wrapper.nativeElement.scrollWidth + 60 > window.innerWidth || diff > 0)) {
        this.mobileTranslate += diff;
      }
      this.initialTouchX = clientX;
    }
  }

  generateArray() {
    this.dataToShow = this.data.slice(this.leftMostIndex - 1, this.leftMostIndex - 1 + this.locationsToShow);
  }

  ngOnDestroy() {
    if(this.itineraryStateSub) this.itineraryStateSub.unsubscribe();
  }
}

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ItineraryService } from 'src/app/core/services/itinerary.service';
import { AppState } from 'src/app/store/models';
import { HeaderComponent } from '../desktop/header.component';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent extends HeaderComponent implements OnInit, OnDestroy {

  @Output() hideMobileHeader: EventEmitter<any> = new EventEmitter<any>();

  pages = [
    {
      name: 'Plan Another Trip',
      url: 'bla'
    }, 
    {
      name: 'All My Trips', 
      url: '/all-my-trips',
    },
    {
      name: 'Before Trip', 
      url: 'bla'
    },
    {
      name: 'FAQ',
      url: 'bla'
    },
    { 
      name: 'Contact us',
      url: 'bla'
    }
  ];

  constructor(
    public router: Router,
    public store: Store<AppState>,
    public dialogService: DialogService,
    public itineraryService: ItineraryService
  ) {
    super(router, store, dialogService, itineraryService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DeviceDetectorService } from 'src/app/core/services/device-detector.service';
import { AffiliateService } from 'src/app/core/services/affiliate.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SetTourIndexAction, SetTourAction } from 'src/app/store/actions';
import { AppState } from 'src/app/store/models';
import { AffiliateState } from 'src/app/store/reducers/affiliate.reducer';

@Component({
  selector: 'app-check-experience',
  templateUrl: './check-experience.component.html',
  styleUrls: ['./check-experience.component.scss']
})
export class CheckExperienceComponent implements OnInit, OnDestroy {

  affiliateState: AffiliateState;
  affiliateStateSub: Subscription;

  dataToShow: any[] = [];
  leftIndex = 0;
  
  itinerary: any;
  tours: any;
  index = 0;
  affiliateStateOne: any;
  keysOfDuration: string[][];


  constructor(
    public dialogService: DialogService,
    private store: Store<AppState>,
    public deviceDetectorService : DeviceDetectorService,
    public affiliateService: AffiliateService
  ) { }

  ngOnInit(): void {
    this.affiliateStateSub = this.store.select(store => store.affiliate).subscribe(res => {
      this.affiliateState = res;
      if(this.affiliateState.partnerActivities && this.affiliateState.partnerActivities.data 
        && this.affiliateState.partnerActivities.data.length > 0 && !this.affiliateState.partnerActivitiesLoading) {
          this.generateDataToShow();
      }
    });
  }

  onLeft() {
    if(this.leftIndex > 0) {
      this.leftIndex--;
      this.generateDataToShow();
    }
  }

  onRight() {
    if(this.leftIndex < this.affiliateState.partnerActivities.data.length - 2) {
      this.leftIndex++;
      this.generateDataToShow();
    }
  }

  generateDataToShow() {
    this.dataToShow = this.deviceDetectorService.isDesktop ? this.affiliateState.partnerActivities.data
       : this.affiliateState.partnerActivities.data.slice(this.leftIndex, this.leftIndex + 2);
    this.keysOfDuration = this.dataToShow.map(r => {
      if(r.attributes.duration) {
        return Object.keys(r.attributes.duration);
      }
      return null;
    });
  }

  ngOnDestroy() {
    if(this.affiliateStateSub) this.affiliateStateSub.unsubscribe();
  }
}

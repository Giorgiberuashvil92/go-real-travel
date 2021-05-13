import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AffiliateService } from 'src/app/core/services/affiliate.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AppState } from 'src/app/store/models';
import { AffiliateState } from 'src/app/store/reducers/affiliate.reducer';


@Component({
  selector: 'app-city-cards',
  templateUrl: './city-cards.component.html',
  styleUrls: ['./city-cards.component.scss']
})
export class CityCardsComponent implements OnInit, OnDestroy {

  @Input() city: any;

  affiliateState: AffiliateState;
  affiliateStateSub: Subscription;

  dataToShow: any[];

  constructor(
    private store: Store<AppState>,
    private dialogService: DialogService,
    public affiliateService: AffiliateService
  ) { }

  ngOnInit() {
    this.affiliateStateSub = this.store.select(store => store.affiliate).subscribe(res => {
      this.affiliateState = res;
      if(this.affiliateState.partnerActivities && this.affiliateState.partnerActivities.data) {
        this.dataToShow = [...this.affiliateState.partnerActivities.data];
        this.dataToShow.sort((a, b) => a.attributes.position - b.attributes.position)
      }
    });
  }
  
  ngOnDestroy() {
    if(this.affiliateStateSub) this.affiliateStateSub.unsubscribe();
  }
}

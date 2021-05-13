import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LoadAffiliateActivityTypesAction, LoadAffiliatePartnerActivitiesLiveSearchAction } from 'src/app/store/actions';
import { AppState } from 'src/app/store/models';
import { AffiliateState } from 'src/app/store/reducers/affiliate.reducer';


@Component({
  selector: 'app-tour-activities',
  templateUrl: './tour-activities.component.html',
  styleUrls: ['./tour-activities.component.scss']
})
export class TourActivitiesComponent implements OnInit, OnDestroy {

  @Input() city: any;

  affiliateState: AffiliateState;
  affiliateStateSub: Subscription;

  formGroup: FormGroup;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadAffiliateActivityTypesAction());

    this.affiliateStateSub = this.store.select(store => store.affiliate).subscribe(res => {
      this.affiliateState = res;
    });

    this.formGroup = new FormGroup({
      text: new FormControl(null),
      category: new FormControl(null)
    });
  }

  onSubmit() {
    if(!this.formGroup.valid) return;
    let params = { cityId: this.city.id };
    if(this.formGroup.value.category) params['activityTypeId'] = this.formGroup.value.category.id;
    if(this.formGroup.value.text) params['text'] = this.formGroup.value.text;
    this.store.dispatch(new LoadAffiliatePartnerActivitiesLiveSearchAction(params));
  }

  ngOnDestroy() {
    if(this.affiliateStateSub) this.affiliateStateSub.unsubscribe();
  }
}

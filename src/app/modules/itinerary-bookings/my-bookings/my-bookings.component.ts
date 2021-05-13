import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AppState } from 'src/app/store/models';
import { CityState } from 'src/app/store/reducers/city.reducer';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {

  @Input() city: any;
  
  cityState$: Observable<CityState>;

  constructor(
    public dialogService: DialogService,
    private store: Store<AppState>
  ) { }
  items = [
    {name:'prague', imageURL: '../../../../assets/prague.svg'},
    {name:'ROME', imageURL: '../../../../assets/rome.svg'},
    {name:'MILAN', imageURL: '../../../../assets/milan.svg'}
  ]

  musseum = [
    {name:'parris Musseum Card', Image: '../../../../assets/musseum.svg', secImg:'../../../../assets/calendar.svg', thirdImg:'../../../../assets/location.svg', fourImg:'../../../../assets/conf.svg',description:'Enjoy direct access to more than 50 museums and monuments in paris and the surrounding area.', date:'12 FEB 2020', N:'N/A', Conf:'Conf.' , numb:'123456789'},
    {name:'parris Musseum Card', Image: '../../../../assets/musseum.svg', secImg:'../../../../assets/calendar.svg', thirdImg:'../../../../assets/location.svg', fourImg:'../../../../assets/conf.svg',description:'Enjoy direct access to more than 50 museums and monuments in paris and the surrounding area.', date:'12 FEB 2020', N:'N/A', Conf:'Conf.' , numb:'123456789'}
  ]

  ngOnInit(): void {
    this.cityState$ = this.store.select(store => store.city);
  }

}

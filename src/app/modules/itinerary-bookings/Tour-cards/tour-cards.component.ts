import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-tour-cards',
  templateUrl: './tour-cards.component.html',
  styleUrls: ['./tour-cards.component.scss']
})
export class TourCardsComponent implements OnInit {
  ngOnInit(){}

  musseum = [
    {nickname:'PRAGUE', name:'parris Musseum Card', Image: '../../../../assets/musseum.svg', secImg:'../../../../assets/calendar.svg', thirdImg:'../../../../assets/location.svg', fourImg:'../../../../assets/conf.svg',description:'Enjoy direct access to more than 50 museums and monuments in paris and the surrounding area.', date:'12 FEB 2020', N:'N/A', Conf:'Conf.' , numb:'123456789'},
    {nickname:'PARIS',name:'parris Musseum Card', Image: '../../../../assets/musseum.svg', secImg:'../../../../assets/calendar.svg', thirdImg:'../../../../assets/location.svg', fourImg:'../../../../assets/conf.svg',description:'Enjoy direct access to more than 50 museums and monuments in paris and the surrounding area.', date:'12 FEB 2020', N:'N/A', Conf:'Conf.' , numb:'123456789'},
    {nickname:'MILAN',name:'parris Musseum Card', Image: '../../../../assets/musseum.svg', secImg:'../../../../assets/calendar.svg', thirdImg:'../../../../assets/location.svg', fourImg:'../../../../assets/conf.svg',description:'Enjoy direct access to more than 50 museums and monuments in paris and the surrounding area.', date:'12 FEB 2020', N:'N/A', Conf:'Conf.' , numb:'123456789'}
  ]
}

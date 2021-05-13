import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-not-include',
  templateUrl: './not-include.component.html',
  styleUrls: ['./not-include.component.scss']
})
export class NotIncludeComponent implements OnInit {

  cities = [
    {
      name: 'Prague',
      places: [
        {
          img: 'https://img.traveltriangle.com/blog/wp-content/uploads/2018/11/Prague_Cover.jpg',
          title: 'Prague Castle',
          isSelfGuided: true,
          timeInterval: 'Early Afternoon'
        }
      ]
    },
    {
      name: 'Paris',
      places: [
        {
          img: 'https://img.traveltriangle.com/blog/wp-content/uploads/2018/11/Prague_Cover.jpg',
          title: 'Prague Castle',
          isSelfGuided: true,
          timeInterval: 'Early Afternoon'
        },
        {
          img: 'https://img.traveltriangle.com/blog/wp-content/uploads/2018/11/Prague_Cover.jpg',
          title: 'Prague Castle',
          isSelfGuided: true,
          timeInterval: 'Early Afternoon'
        }
      ]
    }
  ]

  constructor(
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

}

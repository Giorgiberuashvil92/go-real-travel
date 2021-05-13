import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

     array = [
    {name:'Traveler References'},
    {name: 'Terms of Use'},
    {name: 'FAQ'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

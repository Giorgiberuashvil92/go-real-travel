import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-accept-dialog',
  templateUrl: './navigation-dialog.component.html',
  styleUrls: ['./navigation-dialog.component.scss']
})
export class NavigationDialogComponent implements OnInit {
  option = 1;

  constructor(
    public dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
  }
  array = [
    {name:'All My bookings', imageURL: '/assets/book.svg'},
    {name:'City Cards & Local Transport', imageURL: '/assets/bus-icon.svg'},
    {name:'Tours & Activities', imageURL: '/assets/walking-man.svg'},
    {name:'Inter-City Transport', imageURL: '/assets/interpoller.svg'},
    {name:'Hotels & Apartments', imageURL: '/assets/bed.svg'},
  ]

}

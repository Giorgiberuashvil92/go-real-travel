import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-no-more-activity-way',
  templateUrl: './no-more-activity-way.component.html',
  styleUrls: ['./no-more-activity-way.component.scss']
})
export class NoMoreActivityWayComponent implements OnInit {

  constructor(
    public dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }
}

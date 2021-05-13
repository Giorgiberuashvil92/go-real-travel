import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationDialogComponent } from 'src/app/modules/itinerary-bookings/navigation-dialog/navigation-dialog.component';
import { AcceptDialogComponent } from 'src/app/modules/itinerary-dashboard/accept-dialog/accept-dialog.component';
import { ArriveDayComponent } from 'src/app/modules/itinerary-dashboard/arrive-day/arrive-day.component';
import { ChangeActivityComponent } from 'src/app/modules/itinerary-dashboard/change-activity/change-activity.component';
import { ChangeTransportComponent } from 'src/app/modules/itinerary-dashboard/change-transport/change-transport.component';
import { ChooseNewActivityComponent } from 'src/app/modules/itinerary-dashboard/choose-new-activity/choose-new-activity.component';
import { EditTripComponent } from 'src/app/modules/itinerary-dashboard/edit-trip/edit-trip.component';
import { NoMoreActivityWayComponent } from 'src/app/modules/itinerary-dashboard/no-more-activity-way/no-more-activity-way.component';
import { NotIncludeComponent } from 'src/app/modules/itinerary-dashboard/not-include/not-include.component';
import { RemoveAcceptComponent } from 'src/app/modules/itinerary-dashboard/remove-accept/remove-accept.component';
import { SelectActivityComponent } from 'src/app/modules/itinerary-dashboard/select-activity/select-activity.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogMap = {
    'changeActivity': {
      component: ChangeActivityComponent,
      maxWidth: '800px'
    },
    'changeTransport': {
      component: ChangeTransportComponent,
      maxWidth: '800px'
    },
    'selectActivity': {
      component: SelectActivityComponent,
      maxWidth: '1400px'
    },
    'editTrip': {
      component: EditTripComponent,
      maxWidth: '762px'
    },
    'arriveDay': {
      component: ArriveDayComponent,
      maxWidth: '500px'
    },
    'acceptDialog': {
      component: AcceptDialogComponent,
      maxWidth: '450px'
    },
    'notInclude': {
      component: NotIncludeComponent,
      maxWidth: '520px'
    },
    'chooseNewActivity': {
      component: ChooseNewActivityComponent,
      maxWidth: '762px'
    },
    'noMoreActivityWay': {
      component: NoMoreActivityWayComponent,
      maxWidth: '700px'
    },
    'navigationDialog': {
      component: NavigationDialogComponent,
      maxWidth: '582px'
    },
    'removeAccept': {
      component: RemoveAcceptComponent,
      maxWidth: '450px'
    },
  }

  public dialogRef: MatDialogRef<any>;

  currentDialogName: string;

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(dialogName: string, data?: any) {
    if(this.dialogMap.hasOwnProperty(dialogName)) {
      this.dialogRef = this.dialog.open(this.dialogMap[dialogName].component, {
        width: '95%',
        maxWidth: this.dialogMap[dialogName].maxWidth,
        data
      });
      this.currentDialogName = dialogName;
    }
  }

  closeDialog() {
    if(this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
      this.currentDialogName = null;
    }
  }

  updateSize(width?: string, height?: string) {
    if(this.dialogRef) {
      this.dialogRef.updateSize(width, height);
    }
  }
}

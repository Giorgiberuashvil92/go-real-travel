import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ItineraryService } from 'src/app/core/services/itinerary.service';
import { PostItinerarySolutionForTourAction, SetDayIndexAction, SetTourAction, SetTourIndexAction } from 'src/app/store/actions';
import { AppState, ItineraryResponse, ItinerarySolutionsForTourResponse } from 'src/app/store/models';
import { ItineraryState } from 'src/app/store/reducers';

@Component({
  selector: 'app-choose-new-activity',
  templateUrl: './choose-new-activity.component.html',
  styleUrls: ['./choose-new-activity.component.scss']
})
export class ChooseNewActivityComponent implements OnInit, OnDestroy {

  itineraryState: ItineraryState;
  tourSolutions: ItinerarySolutionsForTourResponse;

  priorityObj = {
    'compadre': 0,
    'component-group': 1,
    'new-day-group': 2,
    'new-day-component': 3
  }
  typeArr = ['compadre', 'component-group', 'new-day-group', 'new-day-component'];

  sortedArrayIndexes: number[] = [];
  sortedArrayIndexesToUse: number[] = [];
  activeSolutionIndex = 0;
  tourPostLoading = false;
  isMoreOptionsVisible = true;
  itineraryPrevData: ItineraryResponse;

  itineraryStateSub: Subscription;

  constructor(
    public dialogService: DialogService,
    private store: Store<AppState>,
    public itineraryService: ItineraryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.itineraryStateSub = this.store.select(store => store.itinerary).subscribe((itineraryState: ItineraryState) => {
      this.itineraryState = itineraryState;

      if(this.tourPostLoading && !this.itineraryState.tourSolutionPostLoading) {
        if(this.itineraryState.error) {
          this.dialogService.closeDialog();
        }

        let oldDays: any[] = this.itineraryService.generateAllDays(this.itineraryPrevData);
        let newDays: any[] = this.itineraryService.generateAllDays(this.itineraryState.data);
        let dayToJump;
        if(oldDays.length === newDays.length) {
          let oldDaysTours: any[] = oldDays.map(r => this.itineraryService.generateTours(this.itineraryPrevData, r));
          let newDaysTours: any[] = newDays.map(r => this.itineraryService.generateTours(this.itineraryState.data, r));
          for(let i=0; i<newDaysTours.length; i++) {
            let shouldBreak = false;
            for(let j=0; j<newDaysTours[i].length; j++) {
              if(!oldDaysTours[i].find(r => r.id === newDaysTours[i][j].id && r.attributes.name === newDaysTours[i][j].attributes.name)) {
                dayToJump = newDays[i];
                shouldBreak = true;
                break;
              }
            }
            if(shouldBreak) break;
          }
        } else {
          dayToJump = newDays.filter(r => !oldDays.find(e => e.id === r.id))[0];
        }
        setTimeout(() => {
          this.store.dispatch(new SetTourIndexAction(0));
          this.store.dispatch(new SetDayIndexAction(dayToJump.attributes.index));
          this.store.dispatch(new SetTourAction(this.itineraryService.generateTours(this.itineraryState.data, dayToJump)[dayToJump.attributes.index]));
          this.itineraryService.setLocationPaginatorIndex.next(dayToJump.attributes.index);
        }, 0);
        this.dialogService.closeDialog();
      }

      if(!this.itineraryState.tourSolutionsLoading && this.itineraryState.tourSolutions && !this.tourPostLoading) {
        this.fillSortedArrayIndexes();
        this.sortedArrayIndexesToUse = this.generateSortedArrayIndexesToUse(this.typeArr[0]);
        if(this.generateSortedArrayIndexesToUse(this.typeArr[1]).length === 0) {
          this.isMoreOptionsVisible = false;
        }
      }
    });
  }

  onLeft() {
    if(this.activeSolutionIndex <= 0) return;
    this.activeSolutionIndex--;
  }

  onRight() {
    if(this.activeSolutionIndex >= this.sortedArrayIndexesToUse.length - 1) return;
    this.activeSolutionIndex++;
  }

  fillSortedArrayIndexes() {
    this.sortedArrayIndexes = [];
    if(this.itineraryState.tourSolutions.data.length === 1 
      && this.itineraryState.tourSolutions.data[0].attributes.type === 'component-group') {
        this.activeSolutionIndex = 0;
        setTimeout(() => {
          this.onConfirm();
        }, 0);
    }
    for(const elem in this.priorityObj) {
      for(let i=0; i<this.itineraryState.tourSolutions.data.length; i++) {
        if(this.itineraryState.tourSolutions.data[i].attributes.type === elem) {
          this.sortedArrayIndexes.push(i);
        }
      }
    }
    
    if(!!this.itineraryState.tourSolutions.data.find(a => a.attributes.type === 'new-day-group')) {
      this.sortedArrayIndexes = this.sortedArrayIndexes.filter((n: number) => this.itineraryState.tourSolutions.data[n].attributes.type !== 'new-day-component');
    }
  }

  findOriginalTour(): any {
    return this.itineraryState.tourSolutions.data[this.sortedArrayIndexesToUse[this.activeSolutionIndex]].attributes["old-day-tours"].data[
      this.itineraryState.tourSolutions.data[this.sortedArrayIndexesToUse[this.activeSolutionIndex]].attributes["new-day-tours"].data
      .findIndex(r => r.attributes.name === this.itineraryState.tourSolutions.data[this.sortedArrayIndexesToUse[this.activeSolutionIndex]].attributes.name)];
  }

  onConfirm() {
    this.store.dispatch(new PostItinerarySolutionForTourAction({ 
      itineraryId: this.itineraryState.data.data.id,
      body: {
        type: 'tours',
        attributes: {
          "solution-type": this.itineraryState.tourSolutions.data[this.sortedArrayIndexesToUse[this.activeSolutionIndex]].attributes.type,
          "solution-id": this.itineraryState.tourSolutions.data[this.sortedArrayIndexesToUse[this.activeSolutionIndex]].id,
          "day-id": this.itineraryState.tourSolutions.data[this.sortedArrayIndexesToUse[this.activeSolutionIndex]].attributes["day-id"]
        }
      }
    }));
    this.itineraryPrevData = {...this.itineraryState.data};
    this.tourPostLoading = true;
    this.dialogService.updateSize('250px');
  }

  onMoreOptions() {
    // this.dialogService.closeDialog();
    const nextTourIndex = this.typeArr.findIndex(r => r === this.itineraryState.tourSolutions.data[this.sortedArrayIndexesToUse[this.activeSolutionIndex]].attributes.type) + 1;
    if(nextTourIndex >= this.typeArr.length) {
      this.dialogService.closeDialog();
      this.dialogService.openDialog('noMoreActivityWay', {...this.data, toursExist: this.sortedArrayIndexes.length > 0 });
    }
    this.activeSolutionIndex = 0;
    this.sortedArrayIndexesToUse = this.generateSortedArrayIndexesToUse(this.typeArr[nextTourIndex]);
    if(nextTourIndex === 2 || nextTourIndex === 3 || this.generateSortedArrayIndexesToUse(this.typeArr[nextTourIndex + 1]).length === 0) {
      this.isMoreOptionsVisible = false;
    }
  }

  onCancel() {
    this.dialogService.closeDialog();
    if(!this.isMoreOptionsVisible) {
      this.dialogService.openDialog('noMoreActivityWay', {...this.data, toursExist: this.sortedArrayIndexes.length > 0 });
    }
  }

  generateSortedArrayIndexesToUse(solutionType: string) {
    let isAfterSolution = false;
    for(let elem of this.typeArr) {
      if(solutionType === elem) isAfterSolution = true;
      if(isAfterSolution) {
        const tempArr = this.sortedArrayIndexes.filter(r => this.itineraryState.tourSolutions.data[r].attributes.type === elem);
        if(tempArr.length !== 0) {
          return tempArr;
        }
      }
    }
    this.dialogService.closeDialog();
    this.dialogService.openDialog('noMoreActivityWay', {...this.data, toursExist: this.sortedArrayIndexes.length > 0 });
    return [];
  }

  determineMoreOptionsVisibility() {
    const nextTourIndex = this.typeArr.findIndex(r => r === this.itineraryState.tourSolutions.data[this.sortedArrayIndexesToUse[this.activeSolutionIndex]].attributes.type) + 1;
    this.isMoreOptionsVisible =  nextTourIndex < this.typeArr.length;
  }

  ngOnDestroy() {
    if(this.itineraryStateSub) this.itineraryStateSub.unsubscribe();
  }
}

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('wrapper', { static: true }) wrapperRef: ElementRef;
  @ViewChild('picker', { static: false }) pickerRef: MatDatepicker<any>;

  @Input() date: string;
  @Input() isEditable: boolean;
  @Output() dateChange = new EventEmitter<Date>();

  datepickerPositions: { top: number, left: number };
  minDate: string;
  isOpen: boolean = false;

  formGroup: FormGroup;
  formGroupSub: Subscription;
  windowResizeSub: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.minDate = this.date;
    this.formGroup = new FormGroup({
      dateControl: new FormControl(this.date)
    });
    this.formGroupSub = this.formGroup.valueChanges.subscribe((res) => {
      const dateObj = new Date(this.formGroup.value.dateControl);
      this.date = `${dateObj.getFullYear()}-${dateObj.getMonth()+1}-${dateObj.getDate()}`
      this.dateChange.emit(dateObj);
    });

    this.windowResizeSub = 
    fromEvent(window, 'resize')
    .subscribe((e: Event) => {
      if(this.pickerRef) {
        this.pickerRef.close()
      }
    });
  }
  
  ngAfterViewInit() {
    setTimeout(() => this.getInputPosition(), 0);
  }
  
  getInputPosition() {
    const rect = this.wrapperRef.nativeElement.getBoundingClientRect();
    this.datepickerPositions = {
      top: rect.y + rect.height,
      left: rect.x
    }
  }

  setDatepickerPosition() {
    const datepickerPopup = document.getElementsByClassName('mat-datepicker-popup')[0] as HTMLElement;
    if(datepickerPopup) {
      console.log(this.datepickerPositions);
      datepickerPopup.style.top = `${this.datepickerPositions.top}px`;
      datepickerPopup.style.left = `${this.datepickerPositions.left}px`;
    }
  }

  toggleDatepicker() {
    if(this.pickerRef) {
      this.pickerRef.open();
      setTimeout(() => {
        this.getInputPosition();
        this.setDatepickerPosition();
      }, 0);
    }
  }

  parseDate(dateString: string) {
    const dateObj = new Date(dateString);
    return `${dateObj.getMonth()+1 }/${ dateObj.getDate() }/${ dateObj.getFullYear()}`;
  }

  ngOnDestroy() {
    if(this.formGroupSub) this.formGroupSub.unsubscribe();
    if(this.windowResizeSub) this.windowResizeSub.unsubscribe();
  }
}

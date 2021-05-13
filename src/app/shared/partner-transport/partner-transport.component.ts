import { Component, Input, OnInit } from '@angular/core';
import { AffiliateService } from 'src/app/core/services/affiliate.service';

@Component({
  selector: 'app-partner-transport',
  templateUrl: './partner-transport.component.html',
  styleUrls: ['./partner-transport.component.scss']
})
export class PartnerTransportComponent implements OnInit {

  @Input() item: any;

  constructor(
    public affiliateService: AffiliateService
  ) { }

  ngOnInit(): void {
  }

}

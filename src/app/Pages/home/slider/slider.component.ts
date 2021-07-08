import { Component, OnInit } from '@angular/core';
import { SliderD } from 'src/app/DTOs/Sliders/SliderD'
import { SliderService } from 'src/app/services/slider.service';
import{DomainName}from '../../../Uititlites/pathTools'

declare function homeSlider(): any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  public sliders: SliderD[] = [];
  public Domain:string=DomainName;
  constructor(
    private sliderService: SliderService
  ) { }

  ngOnInit(): void {

    this.sliderService.getCurrentSliders().subscribe(sliders => {
      
      
      if (sliders.length===0) {
        this.sliderService.GetSliders().subscribe(res => {      
      if (res.status === 'Success') {
            this.sliderService.setCurrentSliders(res.data);
          }
        });
      } else {
        this.sliders = sliders;
        setInterval(() => {
          homeSlider();
        }, 100);
      }
    });
  }

}

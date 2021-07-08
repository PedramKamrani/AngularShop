import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SliderD } from '../DTOs/Sliders/SliderD';
import { HomeSliderResponse } from '../DTOs/Sliders/‌HomeSliderResponse';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

 
  constructor(
    private http:HttpClient
  ) { }

  private homesliders:BehaviorSubject<SliderD[]> = new BehaviorSubject<SliderD[]>([]);

public GetSliders():Observable<HomeSliderResponse>
{
  return this.http.get<HomeSliderResponse>('/api/Sliders/GetActiveSliders');
}

public getCurrentSliders():Observable<SliderD[]>{
  return this.homesliders;
}
public setCurrentSliders(slider:SliderD[]){
  this.homesliders.next(slider)
}
}

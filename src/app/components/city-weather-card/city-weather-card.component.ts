import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-city-weather-card',
  templateUrl: './city-weather-card.component.html',
  styleUrls: ['./city-weather-card.component.css']
})
export class CityWeatherCardComponent {

  @Input() weather: any;
  @Input() unit: any;
  @Output() deleteCityEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router, public utilService: UtilService) { }

  viewDetails() {
    // Navigating with route param + query param
    this.router.navigate(
      ['/detail', this.weather.name],
      { queryParams: { unit: this.unit } }
    );
  }


  deleteCity(city: string) {
    // Emit event to parent
    this.deleteCityEvent.emit(city);
  }

}

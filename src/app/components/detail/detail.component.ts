import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { WeatherService } from 'src/app/services/weather.service';

interface Weather {
  main: { temp: number };
  weather: { description: string; main: string }[];
}

interface ForecastItem {
  dt_txt: string;
  main: { temp: number };
  weather: { description: string; main: string }[];
}

interface ForecastResponse {
  list: ForecastItem[];
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {

  cityName: string = '';
  unit: string = 'metric';

  currentWeather!: Weather;
  forecastList: ForecastItem[] = [];

  constructor(private route: ActivatedRoute, private weatherService: WeatherService, public utilService: UtilService, private router: Router) { }

  ngOnInit(): void {
    // Get route & query params
    this.cityName = this.route.snapshot.paramMap.get('city') || '';
    this.route.queryParamMap.subscribe(params => {
      this.unit = params.get('unit') || 'metric';
      this.getCurrentWeather();
      this.getForecast();
    });
  }

  getCurrentWeather() {
    this.weatherService.getWeatherByCity(this.cityName, this.unit).subscribe(data => {
      this.currentWeather = data;
    });
  }

  getForecast() {
    this.weatherService.getForecastByCity(this.cityName, this.unit).subscribe(data => {
      this.forecastList = data.list;
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  weatherData: any[] = [];
  cities: string[] = ['New York', 'San Francisco', 'Chicago'];
  unit: string = 'metric';
  zip: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadWeatherData();
  }

  loadWeatherData() {
    this.weatherData = [];
    this.cities.forEach(city => {
      this.weatherService.getWeatherByCity(city, this.unit).subscribe(data => {
        this.weatherData.push(data);
      });
    });
  }

  toggleUnit() {
    this.unit = this.unit === 'metric' ? 'imperial' : 'metric';
    this.loadWeatherData();
  }

  addCityByZip() {
    if (this.zip.trim() === '') return; //use 94040

    this.weatherService.getWeatherByZip(this.zip, this.unit).subscribe({
      next: (data) => {
        // Check if already added
        if (!this.weatherData.some(c => c.name === data.name)) {
          this.weatherData.push(data);
        } else {
          alert('City already added!');
        }
        this.zip = ''; // Clear input
      },
      error: (err) => alert('Invalid ZIP Code or Error fetching data!')
    });
  }

  deleteCity(city: string) {
    this.cities = this.cities.filter(c => c !== city);
    this.loadWeatherData();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = '1cc3fbc4e08e283d0aed271c08205c99';
  WEATHER_URL_ZIP: string = `https://api.openweathermap.org/data/2.5/weather?zip=`;
  WEATHER_URL_CITY: string = `https://api.openweathermap.org/data/2.5/weather?q=`;
  FORECAST_URL_CITY: string = `https://api.openweathermap.org/data/2.5/forecast?q=`;
  count = 5;

  constructor(private http: HttpClient) { }

  getWeatherByZip(zip: string, unit: string): Observable<any> {
    return this.http.get(`${this.WEATHER_URL_ZIP}${zip},us&appid=${this.apiKey}&units=${unit}`);
  }

  getWeatherByCity(city: string, unit: string): Observable<any> {
    return this.http.get(`${this.WEATHER_URL_CITY}${city},us&appid=${this.apiKey}&units=${unit}`);
  }

  getForecastByCity(city: string, unit: string): Observable<any> {
    return this.http.get(`${this.FORECAST_URL_CITY}${city}&cnt=${this.count}&appid=${this.apiKey}&units=${unit}`);
  }
}

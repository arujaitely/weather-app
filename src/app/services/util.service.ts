import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getIcon(condition: string) {
    const map: any = {
      'Snow': '/assets/img/snow.png',
      'Clear': '/assets/img/sunny.png',
      'Rain': '/assets/img/rain.png',
      'Clouds': '/assets/img/cloudy.png',
      'Mist': '/assets/img/partly_cloudy.png'
    };
    return map[condition] || '';
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
  private apiKey = '13b6d0615a18023cae993ab65b92f054';
  selectCity = 'Київ';
  oldSelectedCity = 'Київ';

  constructor(private http: HttpClient) {
  }

  getCities(): Observable<any> {
    const body = {
      "apiKey": this.apiKey,
      "modelName": "Address",
      "calledMethod": "getCities",
      "methodProperties": {}
    };

    return this.http.post(this.apiUrl, body);
  }
}

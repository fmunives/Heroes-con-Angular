import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HeroesModel } from "../models/heroes.model";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  url = "https://login-angular-9714d.firebaseio.com";

  constructor(private http: HttpClient) {}

  createHero(heroe: HeroesModel) {
    return this.http.post(`${this.url}/heros.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  updateHero(heroe: HeroesModel) {
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;
    return this.http.put(`${this.url}/heros/${heroe.id}.json`, heroeTemp);
  }

  getHeros() {
    return this.http.get(`${this.url}/heros.json`);
  }

  getHero(id: string) {
    return this.http.get(`${this.url}/heros/${id}.json`);
  }

  deleteHero(id: string) {
    return this.http.delete(`${this.url}/heros/${id}.json`);
  }
}

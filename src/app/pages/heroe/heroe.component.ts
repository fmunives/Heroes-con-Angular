import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HeroesModel } from "src/app/models/heroes.model";

@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html",
  styles: []
})
export class HeroeComponent implements OnInit {
  heroe: HeroesModel = new HeroesModel();
  constructor() {}

  ngOnInit(): void {}

  guardarInfo(form: NgForm) {
    if (form.invalid) {
      console.log("form no  válido");
      return;
    }
    console.log("form válido");
  }
}

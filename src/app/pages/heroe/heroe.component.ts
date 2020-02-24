import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HeroesModel } from "src/app/models/heroes.model";
import { FirebaseService } from "src/app/services/firebase.service";

import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html",
  styles: []
})
export class HeroeComponent implements OnInit {
  heroe: HeroesModel = new HeroesModel();
  constructor(
    private firebase: FirebaseService,
    private routeLink: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.routeLink.snapshot.paramMap.get("id");
    if (id !== "new") {
      this.firebase.getHero(id).subscribe((resp: HeroesModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  guardarInfo(form: NgForm) {
    if (form.invalid) {
      console.log("form no  válido");
      return;
    }

    Swal.fire({
      title: "espere por favor",
      text: "guardando información",
      icon: "info"
    });
    Swal.showLoading();

    let posicion: Observable<any>;

    if (this.heroe.id) {
      posicion = this.firebase.updateHero(this.heroe);
    } else {
      posicion = this.firebase.createHero(this.heroe);
    }

    posicion.subscribe(resp => {
      Swal.fire({
        title: `${this.heroe.nombre}`,
        text: "actualización correcta",
        icon: "success"
      });
    });

    console.log("form válido");
    console.log(this.heroe);
  }
}

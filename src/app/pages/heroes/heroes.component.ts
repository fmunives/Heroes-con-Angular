import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { HeroesModel } from "src/app/models/heroes.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styles: []
})
export class HeroesComponent implements OnInit {
  heroes: HeroesModel[] = [];
  cargando: boolean = true;
  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.firebase.getHeros().subscribe(resp => {
      this.heroes = resp;
      this.cargando = false;
    });
  }

  eliminarHeroe(heroe: HeroesModel, i: number) {
    Swal.fire({
      title: "Está seguro?",
      text: `eliminar a ${heroe.nombre}`,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.heroes.splice(i, 1);
        this.firebase.deleteHero(heroe.id).subscribe();
      }
    });
  }
}

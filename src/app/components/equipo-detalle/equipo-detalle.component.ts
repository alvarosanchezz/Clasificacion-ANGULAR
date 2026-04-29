import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PremierLeagueService } from '../../services/premier-league.service';
import { Equipo } from '../../models/equipo.model';

@Component({
  selector: 'app-equipo-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './equipo-detalle.component.html',
  styleUrl: './equipo-detalle.component.css'
})
export class EquipoDetalleComponent implements OnInit {
  equipo: Equipo | undefined;

  constructor(
    private route: ActivatedRoute,
    private premierLeagueService: PremierLeagueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.equipo = this.premierLeagueService.getEquipoPorId(id);

      if (!this.equipo) {
        this.router.navigate(['/']);
      }
    });
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  obtenerJugadoresPorPosicion(posicion: string) {
    return this.equipo?.jugadores.filter(j => j.posicion === posicion) || [];
  }
}

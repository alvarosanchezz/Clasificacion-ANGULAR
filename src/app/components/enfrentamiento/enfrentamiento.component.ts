import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PremierLeagueService } from '../../services/premier-league.service';
import { Enfrentamiento } from '../../models/enfrentamiento.model';
import { Equipo } from '../../models/equipo.model';

@Component({
  selector: 'app-enfrentamiento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './enfrentamiento.component.html',
  styleUrl: './enfrentamiento.component.css'
})
export class EnfrentamientoComponent implements OnInit {
  enfrentamientos: Enfrentamiento[] = [];
  equipos: Equipo[] = [];

  form = {
    equipo_local_id: 0,
    equipo_visitante_id: 0,
    goles_local: 0,
    goles_visitante: 0,
    jornada: 12
  };

  mostrarFormulario = false;
  mensajeExito = '';
  mensajeError = '';

  constructor(private service: PremierLeagueService) {}

  ngOnInit(): void {
    this.service.enfrentamientos$.subscribe(data => {
      this.enfrentamientos = [...data].reverse();
    });
    this.service.getEquipos().subscribe(data => {
      this.equipos = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  agregarEnfrentamiento(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.form.equipo_local_id || !this.form.equipo_visitante_id) {
      this.mensajeError = 'Selecciona los dos equipos.';
      return;
    }
    if (this.form.equipo_local_id === this.form.equipo_visitante_id) {
      this.mensajeError = 'Los dos equipos no pueden ser el mismo.';
      return;
    }
    if (this.form.goles_local < 0 || this.form.goles_visitante < 0) {
      this.mensajeError = 'Los goles no pueden ser negativos.';
      return;
    }

    const local     = this.equipos.find(e => e.id === +this.form.equipo_local_id);
    const visitante = this.equipos.find(e => e.id === +this.form.equipo_visitante_id);
    if (!local || !visitante) return;

    this.service.agregarEnfrentamiento(new Enfrentamiento(
      Date.now(),
      local.id,
      visitante.id,
      local.nombre,
      visitante.nombre,
      this.form.goles_local,
      this.form.goles_visitante,
      new Date(),
      this.form.jornada
    ));

    this.form = { equipo_local_id: 0, equipo_visitante_id: 0, goles_local: 0, goles_visitante: 0, jornada: this.form.jornada + 1 };
    this.mensajeExito = `Partido guardado correctamente.`;

    setTimeout(() => {
      this.mensajeExito = '';
      this.mostrarFormulario = false;
    }, 2500);
  }

  getClaseResultado(e: Enfrentamiento): string {
    if (e.goles_local > e.goles_visitante) return 'local-gana';
    if (e.goles_visitante > e.goles_local) return 'visitante-gana';
    return 'empate';
  }
}

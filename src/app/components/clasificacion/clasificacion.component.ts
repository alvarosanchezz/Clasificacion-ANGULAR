import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PremierLeagueService } from '../../services/premier-league.service';
import { Clasificacion } from '../../models/clasificacion.model';

@Component({
  selector: 'app-clasificacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clasificacion.component.html',
  styleUrl: './clasificacion.component.css'
})
export class ClasificacionComponent implements OnInit {
  clasificacion: Clasificacion[] = [];

  constructor(private premierLeagueService: PremierLeagueService) {}

  ngOnInit(): void {
    this.premierLeagueService.getClasificacion().subscribe(data => {
      this.clasificacion = data;
    });
  }

  getZona(posicion: number): string {
    if (posicion <= 4) return 'champions';
    if (posicion <= 6) return 'europa';
    if (posicion === 7) return 'conferencia';
    if (posicion >= 18) return 'descenso';
    return '';
  }
}

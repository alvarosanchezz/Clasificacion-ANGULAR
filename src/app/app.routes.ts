import { Routes } from '@angular/router';
import { ClasificacionComponent } from './components/clasificacion/clasificacion.component';
import { EquipoDetalleComponent } from './components/equipo-detalle/equipo-detalle.component';
import { EnfrentamientoComponent } from './components/enfrentamiento/enfrentamiento.component';

export const routes: Routes = [
  { path: '', component: ClasificacionComponent },
  { path: 'equipo/:id', component: EquipoDetalleComponent },
  { path: 'enfrentamientos', component: EnfrentamientoComponent },
  { path: '**', redirectTo: '' }
];

export class Enfrentamiento {
  id: number;
  equipo_local_id: number;
  equipo_visitante_id: number;
  nombre_equipo_local: string;
  nombre_equipo_visitante: string;
  goles_local: number;
  goles_visitante: number;
  fecha: Date;
  jornada: number;

  constructor(
    id: number,
    equipo_local_id: number,
    equipo_visitante_id: number,
    nombre_equipo_local: string,
    nombre_equipo_visitante: string,
    goles_local: number,
    goles_visitante: number,
    fecha: Date,
    jornada: number
  ) {
    this.id = id;
    this.equipo_local_id = equipo_local_id;
    this.equipo_visitante_id = equipo_visitante_id;
    this.nombre_equipo_local = nombre_equipo_local;
    this.nombre_equipo_visitante = nombre_equipo_visitante;
    this.goles_local = goles_local;
    this.goles_visitante = goles_visitante;
    this.fecha = fecha;
    this.jornada = jornada;
  }

  get resultado(): string {
    if (this.goles_local > this.goles_visitante) return 'Local';
    if (this.goles_visitante > this.goles_local) return 'Visitante';
    return 'Empate';
  }
}

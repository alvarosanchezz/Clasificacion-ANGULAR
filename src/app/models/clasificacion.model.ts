export class Clasificacion {
  posicion: number;
  equipo_id: number;
  nombre_equipo: string;
  puntos: number;
  partidos_jugados: number;
  ganados: number;
  empatados: number;
  perdidos: number;
  goles_favor: number;
  goles_contra: number;

  constructor(
    posicion: number,
    equipo_id: number,
    nombre_equipo: string,
    puntos: number,
    partidos_jugados: number,
    ganados: number,
    empatados: number,
    perdidos: number,
    goles_favor: number,
    goles_contra: number
  ) {
    this.posicion = posicion;
    this.equipo_id = equipo_id;
    this.nombre_equipo = nombre_equipo;
    this.puntos = puntos;
    this.partidos_jugados = partidos_jugados;
    this.ganados = ganados;
    this.empatados = empatados;
    this.perdidos = perdidos;
    this.goles_favor = goles_favor;
    this.goles_contra = goles_contra;
  }

  get diferencia_goles(): number {
    return this.goles_favor - this.goles_contra;
  }

  get porcentaje_victoria(): number {
    if (this.partidos_jugados === 0) return 0;
    return (this.ganados / this.partidos_jugados) * 100;
  }
}

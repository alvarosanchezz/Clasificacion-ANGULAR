import { Jugador } from './jugador.model';

export class Equipo {
  id: number;
  nombre: string;
  ciudad: string;
  fundacion: number;
  estadio: string;
  entrenador: string;
  escudo: string; // URL del escudo
  jugadores: Jugador[];
  partidos_jugados: number;
  ganados: number;
  empatados: number;
  perdidos: number;
  goles_favor: number;
  goles_contra: number;

  constructor(
    id: number,
    nombre: string,
    ciudad: string,
    fundacion: number,
    estadio: string,
    entrenador: string,
    escudo: string,
    jugadores: Jugador[] = [],
    partidos_jugados: number = 0,
    ganados: number = 0,
    empatados: number = 0,
    perdidos: number = 0,
    goles_favor: number = 0,
    goles_contra: number = 0
  ) {
    this.id = id;
    this.nombre = nombre;
    this.ciudad = ciudad;
    this.fundacion = fundacion;
    this.estadio = estadio;
    this.entrenador = entrenador;
    this.escudo = escudo;
    this.jugadores = jugadores;
    this.partidos_jugados = partidos_jugados;
    this.ganados = ganados;
    this.empatados = empatados;
    this.perdidos = perdidos;
    this.goles_favor = goles_favor;
    this.goles_contra = goles_contra;
  }

  get puntos(): number {
    return this.ganados * 3 + this.empatados;
  }

  get diferencia_goles(): number {
    return this.goles_favor - this.goles_contra;
  }

  get porcentaje_victoria(): number {
    if (this.partidos_jugados === 0) return 0;
    return (this.ganados / this.partidos_jugados) * 100;
  }
}

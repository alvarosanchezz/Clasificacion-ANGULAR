import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Equipo } from '../models/equipo.model';
import { Jugador } from '../models/jugador.model';
import { Clasificacion } from '../models/clasificacion.model';
import { Enfrentamiento } from '../models/enfrentamiento.model';

interface StatsBase {
  pj: number; pg: number; pe: number; pp: number; gf: number; gc: number;
}

@Injectable({ providedIn: 'root' })
export class PremierLeagueService {
  private equipos: Equipo[] = [];
  private enfrentamientos: Enfrentamiento[] = [];

  private equiposSubject = new BehaviorSubject<Equipo[]>([]);
  private clasificacionSubject = new BehaviorSubject<Clasificacion[]>([]);
  private enfrentamientosSubject = new BehaviorSubject<Enfrentamiento[]>([]);

  public equipos$ = this.equiposSubject.asObservable();
  public clasificacion$ = this.clasificacionSubject.asObservable();
  public enfrentamientos$ = this.enfrentamientosSubject.asObservable();

  // Estadísticas base del proyecto original (Jornada 11)
  private readonly STATS_BASE: { [id: number]: StatsBase } = {
    1:  { pj: 11, pg: 7, pe: 1, pp: 3, gf: 23, gc: 8  }, // Manchester City
    2:  { pj: 11, pg: 6, pe: 0, pp: 5, gf: 18, gc: 17 }, // Liverpool
    3:  { pj: 11, pg: 8, pe: 2, pp: 1, gf: 20, gc: 5  }, // Arsenal
    4:  { pj: 11, pg: 6, pe: 2, pp: 3, gf: 21, gc: 11 }, // Chelsea
    5:  { pj: 11, pg: 5, pe: 3, pp: 3, gf: 19, gc: 18 }, // Manchester United
    6:  { pj: 11, pg: 5, pe: 3, pp: 3, gf: 19, gc: 10 }, // Tottenham
    7:  { pj: 11, pg: 3, pe: 3, pp: 5, gf: 11, gc: 14 }, // Newcastle
    8:  { pj: 11, pg: 5, pe: 3, pp: 3, gf: 13, gc: 10 }, // Aston Villa
    9:  { pj: 11, pg: 3, pe: 2, pp: 6, gf: 12, gc: 16 }, // Fulham
    10: { pj: 11, pg: 4, pe: 4, pp: 3, gf: 17, gc: 15 }, // Brighton
    11: { pj: 11, pg: 5, pe: 1, pp: 5, gf: 17, gc: 17 }, // Brentford
    12: { pj: 11, pg: 3, pe: 1, pp: 7, gf: 13, gc: 23 }, // West Ham
    13: { pj: 11, pg: 4, pe: 5, pp: 2, gf: 14, gc: 9  }, // Crystal Palace
    14: { pj: 11, pg: 4, pe: 3, pp: 4, gf: 12, gc: 13 }, // Everton
    15: { pj: 11, pg: 2, pe: 3, pp: 6, gf: 10, gc: 20 }, // Nottingham Forest
    16: { pj: 11, pg: 5, pe: 4, pp: 2, gf: 14, gc: 10 }, // Sunderland
    17: { pj: 11, pg: 5, pe: 3, pp: 3, gf: 17, gc: 18 }, // AFC Bournemouth
    18: { pj: 11, pg: 3, pe: 2, pp: 6, gf: 10, gc: 20 }, // Leeds United
    19: { pj: 11, pg: 3, pe: 1, pp: 7, gf: 14, gc: 22 }, // Burnley
    20: { pj: 11, pg: 0, pe: 2, pp: 9, gf: 7,  gc: 25 }, // Wolves
  };

  constructor() {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.crearEquiposConJugadores();
    this.cargarEnfrentamientosDelStorage();
    this.calcularClasificacion();
  }

  private cargarEnfrentamientosDelStorage(): void {
    const stored = localStorage.getItem('pl_matches_v2');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.enfrentamientos = data.map((e: any) => new Enfrentamiento(
          e.id, e.equipo_local_id, e.equipo_visitante_id,
          e.nombre_equipo_local, e.nombre_equipo_visitante,
          e.goles_local, e.goles_visitante,
          new Date(e.fecha), e.jornada
        ));
      } catch {
        this.enfrentamientos = [];
      }
    }
    this.enfrentamientosSubject.next(this.enfrentamientos);
  }

  private guardarEnfrentamientosEnStorage(): void {
    localStorage.setItem('pl_matches_v2', JSON.stringify(this.enfrentamientos));
  }

  private crearEquiposConJugadores(): void {
    const datos_equipos = [
      { id: 1,  nombre: 'Manchester City',         ciudad: 'Manchester',    fundacion: 1880, estadio: 'Etihad Stadium',            entrenador: 'Pep Guardiola',       escudo: 'assets/escudos/man-city.png'    },
      { id: 2,  nombre: 'Liverpool',               ciudad: 'Liverpool',     fundacion: 1892, estadio: 'Anfield',                  entrenador: 'Arne Slot',            escudo: 'assets/escudos/liverpool.png'   },
      { id: 3,  nombre: 'Arsenal',                 ciudad: 'Londres',       fundacion: 1886, estadio: 'Emirates Stadium',         entrenador: 'Mikel Arteta',         escudo: 'assets/escudos/arsenal.png'     },
      { id: 4,  nombre: 'Chelsea',                 ciudad: 'Londres',       fundacion: 1905, estadio: 'Stamford Bridge',          entrenador: 'Enzo Maresca',         escudo: 'assets/escudos/chelsea.png'     },
      { id: 5,  nombre: 'Manchester United',       ciudad: 'Manchester',    fundacion: 1878, estadio: 'Old Trafford',             entrenador: 'Ruben Amorim',         escudo: 'assets/escudos/man-utd.png'     },
      { id: 6,  nombre: 'Tottenham',               ciudad: 'Londres',       fundacion: 1882, estadio: 'Tottenham Hotspur Stadium', entrenador: 'Ange Postecoglou',    escudo: 'assets/escudos/tottenham.png'   },
      { id: 7,  nombre: 'Newcastle',               ciudad: 'Newcastle',     fundacion: 1881, estadio: "St James' Park",           entrenador: 'Eddie Howe',           escudo: 'assets/escudos/newcastle.png'   },
      { id: 8,  nombre: 'Aston Villa',             ciudad: 'Birmingham',    fundacion: 1874, estadio: 'Villa Park',               entrenador: 'Unai Emery',           escudo: 'assets/escudos/aston-villa.png' },
      { id: 9,  nombre: 'Fulham',                  ciudad: 'Londres',       fundacion: 1879, estadio: 'Craven Cottage',           entrenador: 'Marco Silva',          escudo: 'assets/escudos/fulham.png'      },
      { id: 10, nombre: 'Brighton',                ciudad: 'Brighton',      fundacion: 1901, estadio: 'Amex Stadium',             entrenador: 'Fabian Hürzeler',      escudo: 'assets/escudos/brighton.png'    },
      { id: 11, nombre: 'Brentford',               ciudad: 'Londres',       fundacion: 1889, estadio: 'Gtech Community Stadium',  entrenador: 'Thomas Frank',         escudo: 'assets/escudos/brentford.png'   },
      { id: 12, nombre: 'West Ham',                ciudad: 'Londres',       fundacion: 1895, estadio: 'London Stadium',           entrenador: 'Julen Lopetegui',      escudo: 'assets/escudos/west-ham.png'    },
      { id: 13, nombre: 'Crystal Palace',          ciudad: 'Londres',       fundacion: 1905, estadio: 'Selhurst Park',            entrenador: 'Oliver Glasner',       escudo: 'assets/escudos/crystal-palace.png' },
      { id: 14, nombre: 'Everton',                 ciudad: 'Liverpool',     fundacion: 1878, estadio: 'Goodison Park',            entrenador: 'Sean Dyche',           escudo: 'assets/escudos/everton.png'     },
      { id: 15, nombre: 'Nottingham Forest',       ciudad: 'Nottingham',    fundacion: 1865, estadio: 'City Ground',              entrenador: 'Nuno Espírito Santo',  escudo: 'assets/escudos/forest.png'      },
      { id: 16, nombre: 'Sunderland',              ciudad: 'Sunderland',    fundacion: 1879, estadio: 'Stadium of Light',         entrenador: 'Régis Le Bris',        escudo: 'assets/escudos/sunderland.png'  },
      { id: 17, nombre: 'AFC Bournemouth',         ciudad: 'Bournemouth',   fundacion: 1899, estadio: 'Vitality Stadium',         entrenador: 'Andoni Iraola',        escudo: 'assets/escudos/bournemouth.png' },
      { id: 18, nombre: 'Leeds United',            ciudad: 'Leeds',         fundacion: 1919, estadio: 'Elland Road',              entrenador: 'Daniel Farke',         escudo: 'assets/escudos/leeds.png'       },
      { id: 19, nombre: 'Burnley',                 ciudad: 'Burnley',       fundacion: 1882, estadio: 'Turf Moor',                entrenador: 'Scott Parker',         escudo: 'assets/escudos/burnley.png'     },
      { id: 20, nombre: 'Wolves',                  ciudad: 'Wolverhampton', fundacion: 1877, estadio: 'Molineux Stadium',         entrenador: "Gary O'Neil",          escudo: 'assets/escudos/wolves.png'      },
    ];

    this.equipos = datos_equipos.map(datos => {
      const jugadores = this.crearJugadoresParaEquipo(datos.id, datos.nombre);
      return new Equipo(datos.id, datos.nombre, datos.ciudad, datos.fundacion,
        datos.estadio, datos.entrenador, datos.escudo, jugadores, 0, 0, 0, 0, 0, 0);
    });

    this.equiposSubject.next(this.equipos);
  }

  private crearJugadoresParaEquipo(equipo_id: number, nombre_equipo: string): Jugador[] {
    const posiciones = ['Portero', 'Defensa', 'Defensa', 'Defensa', 'Defensa',
                        'Centrocampista', 'Centrocampista', 'Centrocampista',
                        'Delantero', 'Delantero', 'Delantero',
                        'Defensa', 'Centrocampista', 'Delantero', 'Portero'];
    const nacionalidades = ['Inglés', 'Español', 'Francés', 'Holandés', 'Alemán',
                            'Portugués', 'Argentino', 'Brasileño', 'Italiano', 'Belga'];
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 22];

    return posiciones.map((posicion, i) =>
      new Jugador(
        equipo_id * 100 + i,
        `Jugador ${i + 1}`,
        nombre_equipo.split(' ')[0],
        numeros[i],
        posicion,
        nacionalidades[i % nacionalidades.length],
        new Date(1994 + Math.floor(i / 3), i % 12, (i % 28) + 1),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 8),
        Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 2)
      )
    );
  }

  // Recalcula clasificación desde cero: stats base + enfrentamientos del usuario
  // Esto evita el bug de doble conteo al añadir nuevos partidos
  private calcularClasificacion(): void {
    this.equipos.forEach(equipo => {
      const base = this.STATS_BASE[equipo.id] ?? { pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 };
      equipo.partidos_jugados = base.pj;
      equipo.ganados          = base.pg;
      equipo.empatados        = base.pe;
      equipo.perdidos         = base.pp;
      equipo.goles_favor      = base.gf;
      equipo.goles_contra     = base.gc;
    });

    this.enfrentamientos.forEach(e => {
      const local     = this.equipos.find(eq => eq.id === e.equipo_local_id);
      const visitante = this.equipos.find(eq => eq.id === e.equipo_visitante_id);
      if (!local || !visitante) return;

      local.partidos_jugados++;
      visitante.partidos_jugados++;
      local.goles_favor     += e.goles_local;
      local.goles_contra    += e.goles_visitante;
      visitante.goles_favor += e.goles_visitante;
      visitante.goles_contra += e.goles_local;

      if (e.goles_local > e.goles_visitante) {
        local.ganados++; visitante.perdidos++;
      } else if (e.goles_visitante > e.goles_local) {
        visitante.ganados++; local.perdidos++;
      } else {
        local.empatados++; visitante.empatados++;
      }
    });

    this.generarClasificacion();
    this.equiposSubject.next([...this.equipos]);
  }

  private generarClasificacion(): void {
    const clasificacion: Clasificacion[] = this.equipos
      .map(eq => new Clasificacion(0, eq.id, eq.nombre, eq.puntos,
        eq.partidos_jugados, eq.ganados, eq.empatados, eq.perdidos,
        eq.goles_favor, eq.goles_contra))
      .sort((a, b) => {
        if (b.puntos !== a.puntos) return b.puntos - a.puntos;
        if (b.diferencia_goles !== a.diferencia_goles) return b.diferencia_goles - a.diferencia_goles;
        return b.goles_favor - a.goles_favor;
      })
      .map((c, i) => { c.posicion = i + 1; return c; });

    this.clasificacionSubject.next(clasificacion);
  }

  public getEquipos(): Observable<Equipo[]> { return this.equipos$; }
  public getClasificacion(): Observable<Clasificacion[]> { return this.clasificacion$; }
  public getEquipoPorId(id: number): Equipo | undefined { return this.equipos.find(e => e.id === id); }
  public getEnfrentamientos(): Enfrentamiento[] { return this.enfrentamientos; }

  public agregarEnfrentamiento(enfrentamiento: Enfrentamiento): void {
    this.enfrentamientos.push(enfrentamiento);
    this.guardarEnfrentamientosEnStorage();
    this.calcularClasificacion();
    this.enfrentamientosSubject.next([...this.enfrentamientos]);
  }
}

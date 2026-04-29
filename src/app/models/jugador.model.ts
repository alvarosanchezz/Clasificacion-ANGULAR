export class Jugador {
  id: number;
  nombre: string;
  apellido: string;
  numero_camiseta: number;
  posicion: string; // Portero, Defensa, Centrocampista, Delantero
  nacionalidad: string;
  fecha_nacimiento: Date;
  goles: number;
  asistencias: number;
  tarjetas_amarillas: number;
  tarjetas_rojas: number;

  constructor(
    id: number,
    nombre: string,
    apellido: string,
    numero_camiseta: number,
    posicion: string,
    nacionalidad: string,
    fecha_nacimiento: Date,
    goles: number = 0,
    asistencias: number = 0,
    tarjetas_amarillas: number = 0,
    tarjetas_rojas: number = 0
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.numero_camiseta = numero_camiseta;
    this.posicion = posicion;
    this.nacionalidad = nacionalidad;
    this.fecha_nacimiento = fecha_nacimiento;
    this.goles = goles;
    this.asistencias = asistencias;
    this.tarjetas_amarillas = tarjetas_amarillas;
    this.tarjetas_rojas = tarjetas_rojas;
  }

  get nombre_completo(): string {
    return `${this.nombre} ${this.apellido}`;
  }

  get edad(): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - this.fecha_nacimiento.getFullYear();
    const diferencia_meses = hoy.getMonth() - this.fecha_nacimiento.getMonth();

    if (
      diferencia_meses < 0 ||
      (diferencia_meses === 0 && hoy.getDate() < this.fecha_nacimiento.getDate())
    ) {
      edad--;
    }
    return edad;
  }
}

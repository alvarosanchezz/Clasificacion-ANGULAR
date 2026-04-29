# 👨‍💻 Guía de Desarrollo - Clasificación Premier League

## 🔧 Configuración del Entorno

### Prerequisitos
- Node.js 18+ (descargar desde https://nodejs.org/)
- npm (incluido con Node.js)
- Visual Studio Code (recomendado)
- Angular CLI v18

### Instalación de Herramientas

```bash
# Instalar Angular CLI globalmente
npm install -g @angular/cli@18

# Verificar instalación
ng version
```

---

## 📖 Estructura de Archivos Clave

### `/src/app/models/`
Contiene las clases del modelo de datos:

**equipo.model.ts**
- Propiedades: id, nombre, ciudad, fundacion, estadio, entrenador, escudo, jugadores, estadísticas
- Métodos getter: puntos, diferencia_goles, porcentaje_victoria
- Constructor completo con validaciones

**jugador.model.ts**
- Propiedades: id, nombre, apellido, numero_camiseta, posicion, nacionalidad, fecha_nacimiento, estadísticas
- Métodos getter: nombre_completo, edad (calcula edad actual)
- Posiciones válidas: Portero, Defensa, Centrocampista, Delantero

**clasificacion.model.ts**
- Propiedades de clasificación y puntuación
- Getter para diferencia_goles y porcentaje_victoria
- Utilizado para ordenar la tabla

**enfrentamiento.model.ts**
- Propiedades: equipos local y visitante, goles, fecha, jornada
- Getter para resultado (Local/Visitante/Empate)

### `/src/app/services/`

**premier-league.service.ts**
- Singleton service con `providedIn: 'root'`
- BehaviorSubject para observables reactivos
- Métodos principales:
  - `cargarDatos()` - Inicializa todos los datos
  - `crearEquiposConJugadores()` - Genera 20 equipos con jugadores
  - `calcularClasificacion()` - Ordena tabla por puntos y DG
  - `agregarEnfrentamiento()` - Agrega partido y recalcula

### `/src/app/components/`

**clasificacion/**
- Tabla interactiva de 20 equipos
- Colores por categoría (Champions, Europa, Descenso)
- Enlaces a fichas de equipos

**equipo-detalle/**
- Ficha completa del equipo seleccionado
- Estadísticas en cards
- Plantilla organizada por posición
- Resuelve equipo por ID en ruta parametrizada

**enfrentamiento/**
- Formulario con selects de equipos
- Validación de entrada
- Historial de enfrentamientos
- Actualización reactiva

---

## 🚀 Desarrollo Local

### Iniciar servidor de desarrollo
```bash
ng serve --open
# o
npm start
```

El servidor estará en: **http://localhost:4200/**

### Hot Module Reload
- Los cambios en archivos se recargan automáticamente
- No necesita reiniciar el servidor

### Modo de producción local
```bash
ng serve --configuration production
```

---

## 🛠️ Tareas Comunes

### Agregar nuevo equipo

1. Edita `premier-league.service.ts`
2. Busca `datos_equipos`
3. Agrega objeto con estructura:
```typescript
{
  id: 21,
  nombre: 'Nuevo Equipo',
  ciudad: 'Ciudad',
  fundacion: 2000,
  estadio: 'Estadio',
  entrenador: 'Entrenador',
  escudo: 'https://...'
}
```

### Modificar estadísticas de equipo

1. En `premier-league.service.ts`
2. Método `crearEnfrentamientos()`
3. Agrega `new Enfrentamiento(...)` con los datos

### Cambiar colores de clasificación

1. Edita `clasificacion.component.css`
2. Busca `.row-champions`, `.row-europa`, `.row-descenso`
3. Modifica colores de fondo

### Agregar nuevo componente

```bash
# Generar componente
ng generate component components/nuevo-componente

# Importar en app.routes.ts
import { NuevoComponente } from './components/nuevo-componente/nuevo-componente.component';

# Agregar ruta
{ path: 'nueva-ruta', component: NuevoComponente }
```

---

## 🐛 Debugging

### En VS Code

1. Instala extensión "Angular Language Service"
2. En `launch.json`, agrega configuración:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "ng serve",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:4200",
      "webRoot": "${workspaceFolder}",
      "sourceMap": true
    }
  ]
}
```

### Console en navegador
- Abre DevTools (F12)
- Pestaña Console para logs
- Usa `console.log()` en componentes

### Debugging con Angular DevTools
1. Instala extensión de Chrome
2. Devtools → Angular tab
3. Inspecciona componentes y servicios

---

## 📝 Convenciones de Código

### Nombres de archivos
- Componentes: `componente.component.ts`
- Servicios: `servicio.service.ts`
- Modelos: `modelo.model.ts`
- Interfaces: `modelo.interface.ts`

### Clases
```typescript
export class MiClase {
  // Propiedades privadas con _
  private _propiedad: string;

  // Getters sin underscore
  get propiedad(): string {
    return this._propiedad;
  }

  // Métodos en camelCase
  miMetodo(): void {
    // código
  }
}
```

### Componentes
```typescript
export class MiComponent implements OnInit {
  datos: Data[] = [];

  constructor(private service: MiService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.service.obtenerDatos().subscribe(data => {
      this.datos = data;
    });
  }
}
```

---

## 🔍 Testing

### Ejecutar tests
```bash
ng test
```

### Escribir test
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiComponent } from './mi.component';

describe('MiComponent', () => {
  let component: MiComponent;
  let fixture: ComponentFixture<MiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## 📦 Build y Despliegue

### Build de desarrollo
```bash
ng build
# Archivos en: dist/proyecto-clasificacion-angular/
```

### Build de producción
```bash
ng build --configuration production
```

### Servir build localmente
```bash
npm install -g http-server
http-server dist/proyecto-clasificacion-angular/
```

---

## 🔐 Buenas Prácticas

✅ Siempre tipear variables con TypeScript  
✅ Usar servicios para compartir datos  
✅ Desuscribirse de Observables en ngOnDestroy  
✅ Usar OnPush change detection cuando sea posible  
✅ Componentes pequeños y reutilizables  
✅ Inyectar dependencias, no instanciar directamente  

---

## 📚 Recursos Útiles

- [Angular Docs](https://angular.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)
- [Angular CLI Reference](https://angular.dev/cli)

---

## 🤔 Resolución de Problemas

### "Cannot find module"
```bash
# Elimina node_modules e instala nuevamente
rm -r node_modules
npm install
```

### Puerto 4200 ya está en uso
```bash
# Usar otro puerto
ng serve --port 4201
```

### Errores de TypeScript
- Verifica tipos en `tsconfig.json`
- Asegúrate de importar tipos correctamente
- Usa `any` solo como último recurso

### Cambios no se reflejan
- Limpia caché del navegador (Ctrl+F5)
- Verifica que no haya errores en consola
- Recarga la página manualmente

---

## 📋 Checklist antes de Commit

- [ ] Código formateado correctamente
- [ ] Sin errores en la consola
- [ ] Tests pasando (si existen)
- [ ] Cambios documentados
- [ ] No hay valores hardcodeados
- [ ] Variables con nombres descriptivos

---

## 🚢 Despliegue a Producción

### En Vercel
```bash
# Vercel detecta automáticamente Angular
# Solo necesitas hacer push a repositorio
```

### En Netlify
```bash
# Crea archivo: netlify.toml
[build]
  command = "npm run build"
  publish = "dist/proyecto-clasificacion-angular"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### En tu propio servidor
```bash
# Build
ng build --configuration production

# Copia carpeta dist/ a tu servidor
# Configura servidor para servir index.html en todas las rutas
```

---

**¡Feliz desarrollo! 🚀**
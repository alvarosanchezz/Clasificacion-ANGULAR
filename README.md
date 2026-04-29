# ⚽ Clasificación Premier League - Angular 18

Aplicación Angular que reproduce la práctica de **Clasificación de la Premier League** con una arquitectura orientada a objetos, componentes separados por funcionalidad y modelo de datos completo.

## 📋 Características Principales

✅ **Modelo de Datos POO** - Clases para Equipo, Jugador, Clasificación y Enfrentamiento  
✅ **Proyecto Angular Funcional** - Compilado y listo para producción  
✅ **Documentación UML** - Diagrama de clases completo en DOCUMENTACION.md  
✅ **3 Componentes Principales** - Clasificación, Equipo-Detalle, Enfrentamiento  
✅ **Enlaces Funcionales** - Nombres de equipos con navegación a fichas detalladas  
✅ **Plantilla de Jugadores** - Organizados por posición (Portero, Defensa, Centrocampista, Delantero)  
✅ **20 Equipos de Premier League** - Datos completos con escudos y estadísticas  
✅ **Gestión de Enfrentamientos** - Formulario para agregar nuevos partidos  

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18.x o superior
- npm 9.x o superior
- Angular CLI 18.x

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/proyecto-Clasificacion-ANGULAR.git
cd proyecto-Clasificacion-ANGULAR

# 2. Instalar dependencias
npm install

# 3. Ejecutar servidor de desarrollo
ng serve --open

# La aplicación se abrirá en http://localhost:4200/
```

### Compilación para Producción

```bash
ng build --configuration production

# Los archivos compilados estarán en: dist/proyecto-clasificacion-angular/
```

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── models/
│   │   ├── equipo.model.ts              # Clase Equipo con estadísticas
│   │   ├── jugador.model.ts             # Clase Jugador con datos personales
│   │   ├── clasificacion.model.ts       # Clase Clasificación para tabla
│   │   └── enfrentamiento.model.ts      # Clase Enfrentamiento de partidos
│   │
│   ├── services/
│   │   └── premier-league.service.ts    # Servicio de datos y lógica
│   │
│   ├── components/
│   │   ├── clasificacion/               # Tabla de clasificación interactiva
│   │   │   ├── clasificacion.component.ts
│   │   │   ├── clasificacion.component.html
│   │   │   └── clasificacion.component.css
│   │   │
│   │   ├── equipo-detalle/              # Ficha completa de equipo
│   │   │   ├── equipo-detalle.component.ts
│   │   │   ├── equipo-detalle.component.html
│   │   │   └── equipo-detalle.component.css
│   │   │
│   │   └── enfrentamiento/              # Gestor de enfrentamientos
│   │       ├── enfrentamiento.component.ts
│   │       ├── enfrentamiento.component.html
│   │       └── enfrentamiento.component.css
│   │
│   ├── app.component.ts                 # Componente raíz con navegación
│   ├── app.component.html               # Plantilla principal
│   ├── app.component.css                # Estilos globales
│   ├── app.routes.ts                    # Rutas de navegación
│   └── app.config.ts                    # Configuración de la app
│
├── main.ts
├── styles.css
└── index.html

DOCUMENTACION.md                          # Diagrama UML y documentación completa
README.md                                 # Este archivo
```

---

## 🎯 Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | ClasificacionComponent | Tabla de clasificación de 20 equipos |
| `/equipo/:id` | EquipoDetalleComponent | Ficha del equipo con plantilla de jugadores |
| `/enfrentamientos` | EnfrentamientoComponent | Gestor de enfrentamientos y resultados |

---

## 📊 Modelos de Datos

### Equipo
- ID, nombre, ciudad, fundación, estadio, entrenador
- Escudo (URL)
- Jugadores (array de Jugador)
- Estadísticas: partidos, ganados, empatados, perdidos, goles
- Getters: puntos, diferencia de goles, porcentaje de victoria

### Jugador
- ID, nombre, apellido, número de camiseta
- Posición (Portero, Defensa, Centrocampista, Delantero)
- Nacionalidad, fecha de nacimiento
- Estadísticas: goles, asistencias, tarjetas
- Getters: nombre completo, edad

### Clasificación
- Posición en tabla, datos del equipo
- Estadísticas del equipo
- Getters: diferencia de goles, porcentaje de victoria

### Enfrentamiento
- ID de equipos local y visitante
- Goles de cada equipo
- Fecha y jornada
- Getter: resultado (Local/Visitante/Empate)

---

## 🎨 Interfaz de Usuario

### Navbar
- Navegación principal con logo ⚽
- Enlaces activos destacados
- Responsive en dispositivos móviles

### Clasificación
- **Colores por categoría:**
  - 🔵 Azul: Champions League (posiciones 1-4)
  - 🟠 Naranja: Europa League (posiciones 5-6)
  - 🔴 Rojo: Descenso (posiciones 18-20)
- Columnas: Pos, Equipo, PJ, G, E, P, GF, GC, DG, Pts
- Enlaces en nombres de equipos

### Ficha de Equipo
- Información general (ciudad, estadio, entrenador, fundación)
- Estadísticas en cards
- Plantilla organizada por posición
- Botón para volver a clasificación

### Enfrentamientos
- Formulario interactivo para agregar partidos
- Historial de enfrentamientos
- Actualización automática de clasificación

---

## 🔄 Flujo de Datos

```
PremierLeagueService
    ↓
    ├─→ Equipo[] (20 equipos)
    │    └─→ Jugador[] (15 por equipo)
    │
    ├─→ Enfrentamiento[] (resultados)
    │
    └─→ Clasificación[] (tabla ordenada)
         ↓
    Usa: sort() → puntos → diferencia_goles
```

---

## 📚 Tecnologías Utilizadas

- **Angular 18** - Framework principal
- **TypeScript 5.x** - Lenguaje tipado
- **RxJS 7.x** - Manejo de observables
- **CSS3** - Estilos responsive
- **Componentes Standalone** - Arquitectura moderna

---

## 🧪 Scripts Disponibles

```bash
# Desarrollo
npm start                    # ng serve

# Compilación
npm run build               # ng build
npm run build:prod          # ng build --configuration production

# Testing
npm test                    # ng test
npm run test:ci             # Pruebas en CI/CD

# Linting
npm run lint                # ng lint (si está configurado)

# Auditoría
npm audit                   # Verificar vulnerabilidades
npm audit fix               # Arreglar vulnerabilidades
```

---

## 🎓 Conceptos Implementados

### Programación Orientada a Objetos
✅ Clases con propiedades y métodos  
✅ Getters para propiedades calculadas  
✅ Encapsulación de datos  

### Angular Moderno
✅ Componentes Standalone  
✅ Rutas con lazy loading  
✅ Servicios con inyección de dependencias  
✅ Observables con RxJS  

### Diseño de Componentes
✅ Separación por funcionalidad visual  
✅ Reutilización de datos  
✅ Comunicación entre componentes  

---

## 📖 Documentación Adicional

Para ver el **Diagrama UML completo** y más detalles técnicos, consulta:
📄 [DOCUMENTACION.md](DOCUMENTACION.md)

---

## 🤝 Requisitos de la Práctica Completados

| # | Requisito | Estado |
|---|-----------|--------|
| 1 | Modelo de datos en POO | ✅ Completado |
| 2 | Proyecto Angular funcional | ✅ Completado |
| 3 | Documentación UML en repositorio | ✅ Completado |
| 4 | Componentes separados por funcionalidad | ✅ Completado |
| 5 | Enlaces en nombres de equipos | ✅ Completado |
| 6 | Funcionalidad adicional (jugadores) | ✅ Completado |
| 7 | Todos los datos cargados | ✅ Completado |

---

## 💡 Extensiones Futuras

- [ ] Backend API REST con Node.js/Express
- [ ] Base de datos con MongoDB
- [ ] Autenticación de usuarios
- [ ] Estadísticas detalladas de jugadores
- [ ] Gráficos de rendimiento
- [ ] Sistema de predicción de resultados
- [ ] Comentarios y puntuaciones
- [ ] Modo oscuro

---

## 📝 Licencia

Proyecto educativo - Práctica de Clasificación Angular

---

## 👨‍💻 Autor

Desarrollado como práctica académica de Angular 18 con arquitectura POO.

**Fecha:** Abril 2026

---

## 📞 Soporte

Si tienes dudas sobre el proyecto:
1. Revisa la [DOCUMENTACION.md](DOCUMENTACION.md)
2. Verifica las rutas en [app.routes.ts](src/app/app.routes.ts)
3. Consulta los comentarios en el código

---

**¡Disfrutá de la aplicación! ⚽**

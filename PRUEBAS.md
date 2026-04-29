# 🧪 Guía de Pruebas - Clasificación Premier League

## ✅ Verificación de Funcionalidades

La aplicación está corriendo en: **http://localhost:4200/**

### 1. Página Principal - Clasificación

**URL:** `http://localhost:4200/`

**Verificar:**
- [ ] Tabla con 20 equipos cargada correctamente
- [ ] Columnas: Pos, Equipo, PJ, G, E, P, GF, GC, DG, Pts
- [ ] Colores diferenciados:
  - Azul (posiciones 1-4) - Champions League
  - Naranja (posiciones 5-6) - Europa League
  - Rojo (posiciones 18-20) - Descenso
- [ ] Leyenda de colores visible al final
- [ ] Nombres de equipos son enlaces clickeables (azul y subrayados al pasar)

**Equipos visibles:**
1. Manchester City
2. Liverpool
3. Arsenal
4. Chelsea
5. Manchester United
... hasta 20. Wolverhampton Wanderers

---

### 2. Ficha de Equipo - Navegación

**Pasos:**
1. En la tabla de clasificación, haz click en cualquier nombre de equipo
2. Por ejemplo: "Manchester City"

**Verificar:**
- [ ] URL cambia a `/equipo/1` (o el ID correspondiente)
- [ ] Se carga la ficha del equipo
- [ ] Muestra escudo del equipo
- [ ] Información visible:
  - Nombre del equipo
  - Ciudad
  - Estadio
  - Entrenador
  - Año de fundación

**Estadísticas (cards):**
- [ ] 8 cards con estadísticas principales
- [ ] Partidos jugados
- [ ] Ganados (verde)
- [ ] Empatados (naranja)
- [ ] Perdidos (rojo)
- [ ] Goles Favor
- [ ] Goles Contra
- [ ] Diferencia de goles (con color + o -)
- [ ] Puntos (con fondo destacado)

**Plantilla de Jugadores:**
- [ ] 4 secciones: Porteros, Defensas, Centrocampistas, Delanteros
- [ ] Cada sección es una tabla con:
  - Número de camiseta
  - Nombre completo
  - Nacionalidad
  - Edad (calculada desde fecha de nacimiento)
  - Goles
  - Asistencias
  - Tarjetas amarillas (color amarillo)
  - Tarjetas rojas (color rojo)
- [ ] Porteros: 1 jugador
- [ ] Defensas: 4 jugadores
- [ ] Centrocampistas: 4 jugadores
- [ ] Delanteros: 2+ jugadores

**Botón Volver:**
- [ ] Botón "← Volver" en la parte superior
- [ ] Regresa a la clasificación principal

---

### 3. Navegación Principal

**Navbar (barra superior):**
- [ ] Logo "⚽ Premier League" visible
- [ ] 2 opciones de menú:
  - "Clasificación" (enlace activo destacado)
  - "Enfrentamientos"

**Verificar enlaces activos:**
- [ ] En `/` -> "Clasificación" está destacado
- [ ] Haz click en "Enfrentamientos" -> URL cambia a `/enfrentamientos`
- [ ] El enlace "Enfrentamientos" se destaca
- [ ] Haz click en "Clasificación" -> Regresa a `/`

---

### 4. Gestor de Enfrentamientos

**URL:** `http://localhost:4200/enfrentamientos`

**Verificar página:**
- [ ] Título "Enfrentamientos" visible
- [ ] Botón "+ Agregar Enfrentamiento"
- [ ] Sección con enfrentamientos iniciales (si existen)

**Agregar Enfrentamiento:**
1. Haz click en "+ Agregar Enfrentamiento"
2. El formulario debe aparecer

**Verificar formulario:**
- [ ] 5 campos de entrada:
  - Dropdown "Equipo Local" (con todos los equipos)
  - Input "Goles Local" (número, mín 0)
  - Input "Goles Visitante" (número, mín 0)
  - Dropdown "Equipo Visitante" (con todos los equipos)
  - Input "Jornada" (número, mín 1)
- [ ] Botón "Guardar Enfrentamiento" (verde)

**Probar agregar enfrentamiento:**
1. Selecciona "Manchester City" como local
2. Ingresa "2" goles local
3. Ingresa "1" goles visitante
4. Selecciona "Liverpool" como visitante
5. Jornada: "2"
6. Haz click en "Guardar Enfrentamiento"

**Verificar resultado:**
- [ ] Mensaje de éxito: "¡Enfrentamiento agregado exitosamente!"
- [ ] Formulario se cierra automáticamente
- [ ] Nuevo enfrentamiento aparece en la lista
- [ ] Card del enfrentamiento muestra:
  - Nombre equipo local (izquierda)
  - Goles en formato grande
  - Nombre equipo visitante (derecha)
  - Jornada
- [ ] Colores por resultado:
  - Verde izquierda: victoria local
  - Verde derecha: victoria visitante
  - Naranja: empate

**Verificar actualización de clasificación:**
1. Agrega varios enfrentamientos entre equipos
2. Regresa a Clasificación (`/`)
3. Verifica que las estadísticas de los equipos se actualizaron:
   - Partidos jugados incrementó
   - Ganados/Empatados/Perdidos actualizados
   - Goles favor/contra cambiaron
   - Diferencia de goles actualizada
   - Puntos recalculados
   - Posición en tabla cambió si es necesario

---

## 🔄 Flujo Completo de Prueba

### Flujo 1: Navegación Completa
```
1. Abrir http://localhost:4200/
2. Ver clasificación de 20 equipos
3. Hacer click en "Manchester City"
4. Ver ficha con 15 jugadores
5. Hacer click en botón "Volver"
6. Regresa a clasificación
7. Hacer click en "Enfrentamientos"
8. Ver gestor de enfrentamientos
9. Hacer click en "Clasificación"
10. Regresa a clasificación principal
```

### Flujo 2: Agregar Enfrentamiento
```
1. Ir a /enfrentamientos
2. Agregar: Manchester City 3 - 1 Liverpool (Jornada 1)
3. Agregar: Arsenal 2 - 0 Chelsea (Jornada 1)
4. Agregar: Man United 1 - 1 Tottenham (Jornada 1)
5. Verificar enfrentamientos en la lista
6. Ir a Clasificación
7. Verificar estadísticas actualizadas
```

### Flujo 3: Validación de Datos
```
1. En ficha de equipo (ej: Manchester City)
2. Verificar: 15 jugadores totales
   - 1 portero
   - 4 defensas
   - 4 centrocampistas
   - Resto delanteros
3. Verificar edades calculadas correctamente
   - Deben estar entre 20-35 años aprox
4. Verificar números de camiseta únicos (1-15)
5. Verificar posiciones correctas
```

---

## 📋 Casos de Prueba Especiales

### Test de Responsividad

1. En navegador, abre DevTools (F12)
2. Haz click en icono de "Toggle device toolbar" (Ctrl+Shift+M)
3. Prueba en diferentes tamaños:
   - [ ] Mobile (320px)
   - [ ] Tablet (768px)
   - [ ] Desktop (1024px)

**Verificar:**
- [ ] Tabla es legible en todos los tamaños
- [ ] Navbar se adapta correctamente
- [ ] Formularios son usables en mobile
- [ ] No hay elementos fuera de pantalla

### Test de Validación

1. En formulario de enfrentamiento, intenta:
   - [ ] Seleccionar el mismo equipo local y visitante
   - [ ] Dejar campos vacíos
   - [ ] Valores negativos en goles

**Esperado:** El formulario debe prevenir datos inválidos

### Test de Performance

1. Abre DevTools → Network
2. Recarga la página (F5)
3. Observa tamaño de archivos:
   - [ ] main.js ≈ 77 KB
   - [ ] polyfills.js ≈ 90 KB
   - [ ] styles.css ≈ 1 KB (pequeño)
4. Tiempo de carga debería ser < 2 segundos

---

## 🐛 Checklist de Bugs Comunes

- [ ] Clasificación no actualiza después de agregar enfrentamiento
  - **Solución:** Recargar página (F5)
  
- [ ] Componente no carga correctamente
  - **Solución:** Abrir DevTools (F12) → Console y buscar errores
  
- [ ] Enlaces no funcionan
  - **Solución:** Verificar que `RouterLink` está importado
  
- [ ] Estilos no se aplican
  - **Solución:** Limpiar caché (Ctrl+Shift+Del) y recargar
  
- [ ] Servicio no tiene datos
  - **Solución:** Verificar que `PremierLeagueService` está iniciado

---

## 📊 Resultados Esperados

### Datos Correctos
- ✅ 20 equipos cargados
- ✅ 15 jugadores por equipo (total 300)
- ✅ Puntos calculados correctamente
- ✅ Clasificación ordenada por puntos y DG

### Funcionalidades Operativas
- ✅ Navegación entre componentes
- ✅ Enlaces activos en navbar
- ✅ Formulario de enfrentamientos
- ✅ Actualización reactiva de datos

### Diseño y UX
- ✅ Colores diferenciados por categoría
- ✅ Tablas legibles y bien organizadas
- ✅ Responsive en todos los dispositivos
- ✅ Transiciones suaves

---

## 📝 Reporte de Pruebas

Completa este reporte después de las pruebas:

```
Fecha de Prueba: ___________
Navegador: ___________
Sistema Operativo: ___________

FUNCIONALIDADES PROBADAS:
- [ ] Clasificación: PASS / FAIL
- [ ] Ficha de Equipo: PASS / FAIL
- [ ] Navegación: PASS / FAIL
- [ ] Enfrentamientos: PASS / FAIL
- [ ] Actualización de datos: PASS / FAIL

PROBLEMAS ENCONTRADOS:
1. ___________
2. ___________
3. ___________

OBSERVACIONES:
___________
___________

Testeado por: ___________
```

---

## 🎉 Prueba Exitosa!

Si todas las pruebas pasaron, ¡la aplicación está lista para usar!

**Próximos pasos:**
1. Hacer commit del código
2. Push a repositorio
3. Considerar despliegue a producción

---

*Última actualización: Abril 2026*
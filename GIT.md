# 🔄 GIT Y CONTROL DE VERSIÓN

## 📌 Primer Commit

El proyecto está listo para hacer el primer commit a git. Aquí te muestro cómo:

### Paso 1: Iniciar Repositorio (si no lo has hecho)
```bash
git init
```

### Paso 2: Agregar Todos los Archivos
```bash
git add .
```

### Paso 3: Hacer Commit Inicial
```bash
git commit -m "feat: Clasificación Premier League Angular - Implementación completa

- Modelo de datos con 4 clases POO
- 3 componentes funcionales (Clasificación, Equipo-Detalle, Enfrentamiento)
- 20 equipos de Premier League con 15 jugadores cada uno
- Servicio centralizado con datos reactivos
- Documentación completa con diagrama UML
- Interfaz responsive y profesional
- Build compilado y listo para producción"
```

### Paso 4: Conectar Repositorio Remoto
```bash
# Si usas GitHub
git remote add origin https://github.com/tu-usuario/proyecto-Clasificacion-ANGULAR.git

# Cambiar rama a 'main' (si es necesario)
git branch -M main

# Push al repositorio remoto
git push -u origin main
```

---

## 📂 Estructura de Ramas Recomendada

```
main                    ← Producción (código stable)
├── develop            ← Desarrollo (integración)
│   ├── feature/tabla-jugadores
│   ├── feature/estadisticas-avanzadas
│   └── bugfix/clasificacion-orden
└── ...
```

---

## 🔗 Archivos Ignorados (.gitignore)

El archivo `.gitignore` ya está configurado para:
- ✅ node_modules/ (dependencias)
- ✅ dist/ (build compilado)
- ✅ .angular/ (caché)
- ✅ .DS_Store (macOS)
- ✅ Thumbs.db (Windows)

---

## 💾 Workflow de Desarrollo

### Para hacer cambios pequeños:
```bash
# 1. En rama main
git pull origin main

# 2. Hacer cambios
vim src/app/...

# 3. Verificar cambios
git status
git diff

# 4. Agregar cambios
git add .

# 5. Hacer commit
git commit -m "fix: descripción del cambio"

# 6. Push
git push origin main
```

### Para nuevas funciones (recomendado):
```bash
# 1. Crear rama feature
git checkout -b feature/mi-nueva-funcion

# 2. Hacer cambios y commits
git add .
git commit -m "feat: descripción"

# 3. Push de la rama
git push origin feature/mi-nueva-funcion

# 4. Crear Pull Request en GitHub
# (merge a 'develop' o 'main')

# 5. Después de mergear
git checkout main
git pull origin main
git branch -d feature/mi-nueva-funcion
```

---

## 📝 Mensajes de Commit

### Formato recomendado:
```
<tipo>(<ámbito>): <descripción>

<cuerpo opcional>

<footer opcional>
```

### Tipos:
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato (no afectan lógica)
- `refactor:` Cambio de código sin nueva funcionalidad
- `perf:` Mejora de performance
- `test:` Agregar o actualizar tests

### Ejemplos:
```bash
git commit -m "feat(clasificacion): agregar filtro por equipo"

git commit -m "fix(equipo-detalle): corregir cálculo de edad de jugadores"

git commit -m "docs: actualizar README con instrucciones"

git commit -m "refactor(service): reorganizar lógica de cálculo de puntos"
```

---

## 🔄 Sincronización con Remoto

### Ver estado
```bash
git status
git log --oneline
```

### Actualizar local desde remoto
```bash
git fetch origin
git pull origin main
```

### Resolver conflictos (si los hay)
```bash
# 1. Ver conflictos
git diff

# 2. Editar archivos conflictivos
vim archivo-con-conflicto.ts

# 3. Marcar como resuelto
git add archivo-con-conflicto.ts

# 4. Completar merge
git commit -m "merge: resolver conflictos"
```

---

## 🏷️ Etiquetas (Tags)

### Crear tag para release
```bash
# Tag anotado (recomendado)
git tag -a v1.0.0 -m "Versión 1.0.0 - Funcionalidad completa"

# Push de tags
git push origin v1.0.0

# O todos los tags
git push origin --tags
```

### Ver tags
```bash
git tag
git show v1.0.0
```

---

## 🔀 Revertir Cambios

### Deshacer cambios locales
```bash
# Un archivo específico
git checkout -- src/app/models/equipo.model.ts

# Todos los cambios
git checkout -- .
```

### Deshacer commit (no pusheado)
```bash
# Deshacer pero mantener cambios
git reset --soft HEAD~1

# Deshacer y perder cambios
git reset --hard HEAD~1
```

### Deshacer commit (ya pusheado)
```bash
# Crear commit que revierte
git revert HEAD
git push origin main
```

---

## 📊 Ver Historial

### Log simple
```bash
git log --oneline
```

### Log con gráfico
```bash
git log --oneline --graph --all
```

### Log de un archivo
```bash
git log -p src/app/models/equipo.model.ts
```

### Ver autor de cambios
```bash
git blame src/app/services/premier-league.service.ts
```

---

## 🔐 Configuración de Git

### Configurar usuario (primera vez)
```bash
git config user.name "Tu Nombre"
git config user.email "tu@email.com"

# Global (todos los proyectos)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### Ver configuración
```bash
git config --list
```

---

## 🚀 Flujo Completo (GitHub)

### 1. Crear repositorio en GitHub
- Ir a github.com
- New Repository
- Nombre: `proyecto-Clasificacion-ANGULAR`
- Descripción: "Clasificación Premier League con Angular 18"
- Público o Privado (según prefieras)

### 2. En tu computadora
```bash
# Clonar (si es nuevo)
git clone https://github.com/tu-usuario/proyecto-Clasificacion-ANGULAR.git

# O conectar existente
git remote add origin https://github.com/tu-usuario/proyecto-Clasificacion-ANGULAR.git
git branch -M main
git push -u origin main
```

### 3. Hacer cambios y push
```bash
# Cambiar código
nano src/app/...

# Agregar y commit
git add .
git commit -m "feat: descripción"

# Push
git push origin main
```

---

## 🤝 Contribuciones

Si quieres que otros contribuyan:

### 1. Configurar permisos en GitHub
- Settings → Collaborators
- Agregar usuarios

### 2. Colaborador clona
```bash
git clone https://github.com/tu-usuario/proyecto-Clasificacion-ANGULAR.git
```

### 3. Colaborador hace cambios
```bash
git checkout -b feature/su-funcionalidad
# ... cambios ...
git push origin feature/su-funcionalidad
```

### 4. Pull Request
- En GitHub, crear Pull Request
- Revisar cambios
- Merge cuando esté aprobado

---

## 📋 Checklist de Git

- [ ] Repositorio inicializado (`git init`)
- [ ] `.gitignore` configurado
- [ ] Usuario configurado (`git config`)
- [ ] Primer commit realizado
- [ ] Conectado a remoto (GitHub/GitLab)
- [ ] Push exitoso

---

## 🔗 Recursos Útiles

- [Git Official](https://git-scm.com/)
- [GitHub Docs](https://docs.github.com/)
- [Atlassian Git Tutorial](https://www.atlassian.com/git)
- [Oh My Git!](https://ohmygit.org/)

---

## 💡 Consejos

✅ Commit frecuentemente (cambios pequeños)  
✅ Mensajes de commit claros y descriptivos  
✅ Revisa cambios antes de commit (`git diff`)  
✅ Sincroniza con remoto regularmente  
✅ Usa ramas para nuevas funciones  
✅ Nunca hagas push de `node_modules/`  

---

**¡Git configurado! Ahora a hacer cambios y colaborar 🚀**
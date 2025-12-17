**Propósito**: Instrucciones concisas para agentes AI que trabajan en este repo "mini_pokeapi". Están diseñadas para que el agente sea productivo inmediatamente con la estructura y convenciones detectadas.

**Contexto general**:
- **Stack**: Proyecto Node.js/Express minimal (esqueleto). Archivos clave se encuentran en `src/`.
- **Estructura principal**: `src/app.js`, `src/config/environment.js`, `src/routes/index.js`, `src/controllers/index.js`, `src/models/index.js`.
- **Estado actual**: Muchos archivos son placeholders (comentarios vacíos). Antes de hacer cambios grandes, confirma con el mantenedor si la intención es un esqueleto o falta contenido.

**Qué hacer primero (obligatorio)**
- Verificar existencia de `package.json` en la raíz. Si no existe, preguntar al mantenedor antes de agregar dependencias o scripts.
- Revisar `.env` y `.env.template` para variables esperadas. `src/config/environment.js` está pensado para leer `.env`.
- Notar el archivo `index,js` (coma en el nombre). Confirma si es un error tipográfico y si debe renombrarse a `index.js`.

**Patrones y convenciones detectadas**
- Agregación por `index` en directorios: cada carpeta `routes/`, `controllers/`, `models/` contiene `index.js` como punto de entrada. Mantén esa convención al agregar nuevos módulos (ej.: `src/controllers/pokemon.js` exportando funciones y luego importándolo desde `src/controllers/index.js`).
- Separación de responsabilidades:
  - `src/config/*`: configuración y lectura de `.env`.
  - `src/routes/*`: definición de rutas y montaje en `app`.
  - `src/controllers/*`: lógica de manejo de peticiones.
  - `src/models/*`: acceso a datos (persistencia / mapeo), incluso si ahora está vacío.
- Archivos minimalistas: muchos archivos contienen solo comentarios. Cuando escribas código nuevo, añade tests o pequeñas comprobaciones si el mantenedor lo solicita.

**Ejemplos concretos (copiar/pegar de referencia)**
- Añadir una ruta en `src/routes/index.js` (ejemplo de estilo):

```js
// src/routes/index.js
const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.get('/health', (req, res) => res.json({ ok: true }));
router.get('/pokemon/:id', controllers.getPokemonById);

module.exports = router;
```

- Controlador ejemplo exportado desde `src/controllers/index.js`:

```js
// src/controllers/index.js
const getPokemonById = async (req, res) => {
  const { id } = req.params;
  // lógica: llamar a modelo o a API externa
  res.json({ id, name: 'placeholder' });
};

module.exports = { getPokemonById };
```

**Comandos y flujos de desarrollador (qué verificar)**
- Antes de ejecutar: buscar `package.json`. Si existe, los comandos familiares son `npm install` y `npm start` / `npm run dev`.
- Si `package.json` no existe, no crear paquetes automáticamente: preguntar al mantenedor si desea npm o yarn.
- Para debugging: el agente puede instrumentar `src/app.js` (o `index.js`) agregando `console.log` y verificando rutas con `curl` o Postman. Mantén cambios reversibles en commits separados.

**Reglas para el agente (siempre seguir)**
- No renombrar archivos raíz sin confirmación (p. ej. `index,js` -> `index.js`) — reporta y pregunta.
- No añadir dependencias nuevas sin `package.json` y sin aprobación explícita.
- Evitar opinión estilística fuerte: respeta la forma y estilo existente. Usa `module.exports`/`require` si ya se usa CommonJS.
- Documenta cualquier función pública nueva en el archivo `README.md` o en el mismo módulo si el repo carece de docs.

**Qué reportar al mantenedor**
- Archivos vacíos que parecieran intencionados vs. faltantes.
- Variables `.env` esperadas y sugerencias para `environment.js` si faltan lecturas.
- Renombrado potencial de `index,js`.

Si algo no es evidente desde el código (scripts de ejecución, gestor de paquetes deseado, o intención del esqueleto), pregunta al mantenedor antes de implementar cambios significativos.

Por favor revisa este borrador: indícame si quieres que incluya snippets de test, convenciones de commit, o ejemplos de `package.json` / `Dockerfile`.

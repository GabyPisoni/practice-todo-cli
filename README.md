mytodotask
=================

Este proyecto trata de CLI en Node (oclif) para gestionar  tus tareas (add, update, list, remove) con prompts interactivos en la terminal.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

Requisitos
- Node >= 18

Instalación (local)
1. Instala dependencias: `npm install`
2. Compila: `npm run build`
3. Ejecuta con loader de ts-node sin compilar: `npm run dev -- add`

Uso rápido
```sh
$ todo-cli --help           # ver comandos
$ todo-cli add              # crear tarea (prompts interactivos) -> Completar con lo que pide
$ todo-cli list             # listar tareas
$ todo-cli update <id|idx>  # editar tarea con un id para el comando
$ todo-cli remove <id|idx>  # eliminar tarea con un id para el comando
```

Comandos
- `todo-cli add`
  - Crea una tarea nueva solicitando título, descripción, estado, prioridad y fecha.

- `todo-cli list`
  - Muestra todas las tareas guardadas con colores y detalles.

- `todo-cli update <id|idx>`
  - Edita una tarea existente (id o índice de la lista).

- `todo-cli remove <id|idx>`
  - Elimina una tarea por id o índice.

Scripts de desarrollo
- `npm run dev -- add`   Ejecuta el comando add en modo ts-node (sin compilar)
- `npm run build`        Genera `dist/`
- `npm run lint`         Linter
- `npm test`             Tests (Mocha)


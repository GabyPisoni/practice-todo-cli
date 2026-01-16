# mytodotask

Este proyecto trata de CLI en Node (oclif) para gestionar tus tareas (add, update, list, remove) con prompts interactivos en la terminal.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

## Requisitos

- Node >= 18

## Instalación (local)

1. Instala dependencias: `npm install`
2. Compila: `npm run build`
3. Ejecuta con loader de ts-node sin compilar: `npm run dev -- add`

Uso rápido

```sh
$ todo-cli --help           # ver comandos
$ todo-cli add              # crear tarea (prompts interactivos)
$ todo-cli list             # listar tareas
$ todo-cli update <id|idx>  # editar tarea
$ todo-cli remove <id|idx>  # eliminar tarea
```

## 📁 Estructura del proyecto (terminal)

```
src/
├── commands/                  # Comandos CLI (add, update, list, remove)
├── data/
│   └── todo.json              # Almacenamiento de tareas
├── models/
│   └── todo.ts                # Esquema y tipos del modelo Todo
├── service/
│   └── todoRepository.ts      # Capa de datos (CRUD)
├── types/
│   └── enums.ts               # Enums de Status y Priority
└── ui/
    ├── Prompt.ts              # Entrada interactiva de usuario
    └── TodoListFormatter.ts    # Formato y visualización de tareas
```

## Comandos

- `todo-cli add`: crea una tarea nueva solicitando título, descripción, estado, prioridad y fecha.
- `todo-cli list`: muestra todas las tareas guardadas con colores y detalles.
- `todo-cli update <id|idx>`: edita una tarea existente (id o índice de la lista).
- `todo-cli remove <id|idx>`: elimina una tarea por id o índice.

## Scripts de desarrollo

- `npm run dev -- add`  Ejecuta el comando add en modo ts-node (sin compilar)
- `npm run build`        Genera `dist/`
- `npm run lint`         Linter
- `npm test`             Tests (Mocha)

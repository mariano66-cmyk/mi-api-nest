# Task Manager API — NestJS

API RESTful modular desarrollada con NestJS y TypeScript para la gestión eficiente de tareas, diseñada siguiendo buenas prácticas de arquitectura de software, validación de datos y pruebas automatizadas.

## Tecnologías y Herramientas

- **Framework:** NestJS
- **Lenguaje:** TypeScript
- **ORM & Base de Datos:** TypeORM, SQLite
- **Validaciones:** Class Validator, Class Transformer, Custom Pipes
- **Testing:** Vitest
- **Pruebas de Integración:** Postman

## Características Principales

- Operaciones CRUD completas para la entidad `Task` (`pending`, `in_progress`, `done`).
- Búsqueda por query params y endpoint especializado para métricas por estado (`GET /tasks/stats`).
- Manejo centralizado y tipado de excepciones (`NotFoundException`, `InternalServerErrorException`).
- Cobertura de tests unitarios aislados para servicios y controladores mediante mocks y testing modules.

## Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/mariano66-cmyk/mi-api-nest.git](https://github.com/mariano66-cmyk/mi-api-nest.git)
   cd mi-api-nest

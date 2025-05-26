# Calculadora React
## David Dominguez 23712  

Una calculadora funcional construida con React, Vite y Vitest.

## Características

- Operaciones básicas: suma, resta, multiplicación y división
- Botón para cambiar signo (+/-)
- Botón de porcentaje (%)
- Manejo de decimales
- Límite de 9 dígitos en pantalla

## Tecnologías utilizadas

- React 19
- Vite
- Vitest (para testing)
- Storybook (para documentación de componentes)
- ESLint (para linting)

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   bun install
   ```

## Scripts disponibles

- `bun dev`: Inicia el servidor de desarrollo
- `bun build`: Crea la versión de producción
- `bun test`: Ejecuta los tests
- `bun storybook`: Inicia Storybook
- `bun lint`: Ejecuta el linter


## Componentes principales

- `Calculator`: Componente principal que contiene la lógica
- `Display`: Muestra el valor actual
- `Button`: Botones de la calculadora

## Custom Hook

- `useCalculator`: Contiene toda la lógica de la calculadora

## Testing

Los tests cubren:
- Operaciones matemáticas básicas
- Manejo de errores
- Límites de dígitos
- Comportamiento del punto decimal

Ejecuta los tests con:
```bash
bun test
```

## Storybook

Para ver la documentación de componentes:
```bash
bun storybook
```

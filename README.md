# Demo SDK Web Punto Web 2.0 - Frontend (Sandbox)

Este repositorio corresponde a una **demo técnica del frontend** para pruebas de integración del **SDK Web de Punto Web 2.0**.

## Finalidad

El objetivo de este proyecto es mostrar el flujo de integración desde el lado cliente:

- Consumo de token generado por backend
- Carga del formulario de pago
- Ejecución de la transacción en entorno de prueba

## Arquitectura

Este repositorio contiene **únicamente la capa frontend**.

La generación de token y lógica backend se encuentra en un repositorio separado:
- Backend demo: `demoDanielBack`

## Alcance

- Uso exclusivo para **pruebas y validación técnica**
- Configurado para trabajar con **credenciales de ambiente sandbox**
- No corresponde a una solución productiva
- No almacena información en base de datos
- No persiste información sensible; el flujo funciona de manera temporal (memoria/cache del lado cliente)

## Credenciales y datos de prueba

Las credenciales y datos visibles en este repositorio:

- Corresponden únicamente a **sandbox**
- Son utilizadas con fines de demostración
- No otorgan acceso a ambientes productivos

Estas credenciales forman parte de ejemplos de integración y no representan información sensible.

Asimismo, los datos como correo, teléfono o documento son **valores de prueba** y pueden ser reemplazados por datos ficticios (ej. `test@example.com`).

## Consideraciones importantes

- Este repositorio **no debe ser utilizado en producción**
- No incluye credenciales productivas
- El cambio de entorno a producción requiere configuración y credenciales válidas que no están incluidas aquí
- La seguridad del flujo real depende del backend (no incluido en este repositorio)

## Tecnologías usadas

- React
- Vite
- JavaScript

## Ejecución local

```bash
npm install
npm run dev
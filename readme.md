# Cripto Tracker v1.0
Evaluador de pérdidas y ganancias de criptomonedas en tiempo real.<br />
Este proyecto fue desarrollado para el curso de Javascript de Coderhouse.<br />
**Todos los cambios notables serán documentados en este archivo.**

## [Entrega final] - 24-07-2022
- Se continuó con la simplificación del código JS y se implementaron funciones en bloques repetitivos.
- Se separaron las estructuras estáticas en otro archivo JS para mantener el código limpio.
- Se implementó SASS para un mantenimiento y actualización de estilos más sencillo.
- Se trabajó en la estética general de la app, se reubicó el reloj y se agregó un footer.

## [0.4] - 20-07-2022
- Se reescribió y simplificó el 100% del código JS. Pasando de más de 1000 a 800 lineas aprox.
- Pusheo en Operaciones Abiertas fixeado. Checkea un ID libre antes de pushear.
- Pusheo y eliminación de Radar fixeado. Checkea un ID libre antes de pushear.
- El sistema ahora checkea la respuesta del fetch para saber si el par existe en la base de datos.
- Se implementó un sistema para buscar info de monedas con su respectivo modal.

## [0.3] - 11-07-2022
- Implementado modal para inicio de sesión con operadores ternarios y desestructuración.
- Utilización de Toastify para mostrar alertas al ingresar correcta o incorrectamente los datos de login.
- Utilización de Luxon para mostrar la fecha y la hora en el header.
- Se definió una función compareMax, la cual recibe por parametro un array de beneficios realizados y devuelve el máximo (uso de spread).

## [0.2] - 04-07-2022
- Rediseño completo de la estructura HTML de la tabla.
- Rediseño de la estructura HTML de Radar.
- Creación del sistema para abrir operaciones con un modal.
- Creación del sistema para eliminar operaciones con un modal.
- La función 'eliminar operación' elimina la linea de la tabla y el objeto del array.
- Agregado boton para minimizar el panel de seguidas en la navbar y menu mobile.
- Agregado boton que permite eliminar las monedas seguidas.
- Agregado mensaje de bienvenida al abrir la aplicación por primera vez.
- Implementado mensaje cuando no hay operaciones registradas.
- Implementado mensaje cuando no hay monedas en el panel de seguidas.
- Implementado mensaje cuando la busqueda de operaciones no arroja resultados.
- Implementado funcionamiento de monedas seguidas.
- Implementado suma de los porcentajes y de los beneficios realizados unicamente de las monedas mostradas en tabla.
- Se limitaron los campos del modal al agregar monedas en la tabla. No permite agregar hasta que no se completen correctamente todos los campos.
- Fixeado sistema de eliminación de monedas de la tabla. Había un problema con la referencia del id del array al hacer el splice.
- Ligeras adaptaciones mobile con media queries e implementación de menú mobile.
- Implementado localStorage para mostrar/ocultar radar, tabla de monedas y monedas en radar.

## [0.1] - 23-06-2022
- Mejora en la interfaz gráfica.
- Capacidad para mostrar múltiples monedas en la tabla desde un array.
- Mejora en el sistema de obtención de datos. Ahora permite obtener multiples precios y mostrarlos en tiempo real en la tabla, así como el porcentaje y el beneficio realizados.
- Implementación del sistema de búsqueda por moneda.
- Se agregó un boton para resetear la búsqueda.
#Linguo (Pruebas de Caja Negra)

Esta herramienta escrita en Javascript, automatiza pruebas de validación de formularios. lo que hace es recorrer los formularios y hacer screenshots de la validación de cada campo.

##Pre requisitos

- [NodeJS](https://nodejs.org/) 0.10.*
- [GruntJS](https://nodejs.org/) 0.1.13
- [CasperJS](http://casperjs.org/) 1.1.0
- [PhantomJS](http://phantomjs.org/) 1.8.2
- [Python](https://www.python.org/) 2.6

##Instalación
Lo primero que debe hacer es clonar este repositori en su equipo para poder realizar las pruebas localmente
```Javascript
npm install
```

##Configuración

1. En el archivo *params.json* dentro de la carpeta **casper** se deben colocar los valores name de cada input del formulario.
    - En el parametro **url** se debe colocar la url del formulario que se va a testear.
    - En los inputs de tipo select y option, se debe escribir el value que se va escoger.
    - En los input de tipo checkbox se debe escribir true o false.
2. en el formulario se deben agregar los atributos:
    - **aria-validar="texto"**: Inputs que solo acepten entradas de texto.
    - **aria-validar="numeros"**: Inputs que solo acepten entradas de número.
    - **aria-validar="maxlength"**: Inputs que tengan un largo de texto determinado.
    - **aria-validar="confirmar-password"**: Inputs que sean para validar un password.
    - **aria-validar="fecha"**: Inputs que sean de tipo date
    - **aria-validar="rango"**: Inputs que sean de tipo rango

3. Los mensajes de error se pueden cambiar dentro del archivo **validarForm.js**, para la validación se usa el plugin [jQuery Validate](http://jqueryvalidation.org/) se deben agregar estos 2 scripts al formulario que se está validando.

4. Dentro del archivo **validarForm.js** se deben escribir los names de cada input dentro del arreglo **rules** y el arreglo **messages**.

##Uso
1. Se enciende el servidor
    ```Javascript
    grunt
    ```
    
2. Se corre el script de CasperJS con gruntJS:
    ```Javascript
    grunt casper
    ```


## Copyright & License

Copyright (C) 2015 - Released under the MIT License.
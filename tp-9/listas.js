var listaNumerosEjemplo = [2,4,6,-1,5,-4,0];

/**
 * 01 - invertirLista
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - una lista de números con los mismos elementos pero en orden inverso al que fueron recibidos.
 * 
 * Ejemplos:
 * - invertirLista([2,3,4]) retorna [4,3,2]
 */
// Usando declaración de función
function invertirLista(listaDeNumeros) {
    return listaDeNumeros.slice().reverse();
}
console.log("invertirLista([2,3,4]): ", invertirLista([2,3,4]))

/**
 * 02 - sumarLista
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - un numero con el resultado de la suma de todos los elementos de la lista.
 * 
 * Ejemplos:
 * - sumarLista([2,3,4]) retorna 9
 */
// Usando arrow function
const sumarLista = (listaDeNumeros) => {
    let suma = 0;
    for (let i = 0; i < listaDeNumeros.length; i++) {
        suma += listaDeNumeros[i];
    }
    return suma;
}
console.log("sumarLista([2,3,4]): ", sumarLista([2,3,4]))

/**
 * 03 - contarElementosLista
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - un numero con la cantidad de elementos contenidos dentro de la lista.
 * 
 * Ejemplos:
 * - contarElementosLista([2,3,4]) retorna 3
 * - contarElementosLista([2,3]) retorna 2
 * - contarElementosLista([]) retorna 0
 */
// Usando declaración de función
function contarElementosLista(listaDeNumeros) {
    return listaDeNumeros.length;
}
console.log("contarElementosLista([2,3,4]): ", contarElementosLista([2,3,4]))

/**
 * 04 - calcularPromedio
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - un numero, con el valor calculado de promedio para los números en la lista recibida.
 * 
 * Ejemplos:
 * - calcularPromedio([2,3,4]) retorna 3
 */
// Usando expresión de función
const calcularPromedio = function(listaDeNumeros) {
    if (listaDeNumeros.length === 0) {
        return 0;
    }
    return sumarLista(listaDeNumeros) / contarElementosLista(listaDeNumeros);
}
console.log("calcularPromedio([2,3,4]): ", calcularPromedio([2,3,4]))
console.log("calcularPromedio(listaNumerosEjemplo): ", calcularPromedio(listaNumerosEjemplo))

/**
 * 05 - triplicarLista
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - una lista de números donde cada elemento es el triple del valor original.
 * 
 * Ejemplos:
 * - triplicarLista([1, 2, 3]) retorna [3, 6, 9]
 */
// Usando arrow function
const triplicarLista = (listaDeNumeros) => {
    return listaDeNumeros.map(num => num * 3);
}
console.log("triplicarLista([1, 2, 3]): ", triplicarLista([1, 2, 3]));

/**
 * 06 - crearListaDeNumeros
 * 
 * Recibe
 * - `inicio`: un número, con el valor inicial de la lista
 * - `fin`: un número, con el valor final de la lista
 * 
 * Retorna: 
 * - una lista (array) con valores numéricos en secuencia, desde `inicio` hasta `fin`.
 * 
 * Ejemplos:
 * - crearListaDeNumeros(1,5) retorna [1,2,3,4,5]
 * - crearListaDeNumeros(3,6) retorna [3,4,5,6]
 * - crearListaDeNumeros(2,2) retorna [2]
 */
// Usando declaración de función
function crearListaDeNumeros(inicio, fin) {
    let lista = [];
    for (let i = inicio; i <= fin; i++) {
        lista.push(i);
    }
    return lista;
}
console.log("crearListaDeNumeros(2,5): ", crearListaDeNumeros(2,5))

/**
 * 07 - ordenarDeMayorAMenor
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - una lista de números con los mismos elementos pero en orden decreciente (de mayor a menor).
 * 
 * Ejemplos:
 * - ordenarDeMayorAMenor([2,-1,4]) retorna [4,2,-1]
 */
// Usando expresión de función
const ordenarDeMayorAMenor = function(listaDeNumeros) {
    return listaDeNumeros.slice().sort((a, b) => b - a);
}
console.log("ordenarDeMayorAMenor([2,3,4]): ", ordenarDeMayorAMenor([2,3,4]))
console.log("ordenarDeMayorAMenor(listaNumerosEjemplo): ", ordenarDeMayorAMenor(listaNumerosEjemplo))

/**
 * 08 - encontrarNumeroMayor
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - un numero, con el valor del numero más grande contenido en la lista recibida.
 * 
 * Ejemplos:
 * - encontrarNumeroMayor([2,3,4]) retorna 4
 */
// Usando arrow function
const encontrarNumeroMayor = (listaDeNumeros) => {
    if (listaDeNumeros.length === 0) {
        return undefined;
    }
    let mayor = listaDeNumeros[0];
    for (let i = 1; i < listaDeNumeros.length; i++) {
        if (listaDeNumeros[i] > mayor) {
            mayor = listaDeNumeros[i];
        }
    }
    return mayor;
}
console.log("encontrarNumeroMayor([2,3,4]): ", encontrarNumeroMayor([2,3,4]))
console.log("encontrarNumeroMayor(listaNumerosEjemplo): ", encontrarNumeroMayor(listaNumerosEjemplo))

/**
 * 09 - ordenarPalabrasPorLongitud
 * 
 * Recibe
 * - `listaDePalabras`: una lista (array) de palabras (string).
 * 
 * Retorna: 
 * - una lista (array) de palabras (string), con los mismos valores que la lista recibida pero ordenados de manera creciente de acuerdo a su cantidad de caracteres.
 * 
 * Ejemplos:
 * - ordenarPalabrasPorLongitud(['abc', 'a', 'ab']) retorna ['a', 'ab', 'abc']
 */
// Usando declaración de función
function ordenarPalabrasPorLongitud(listaDePalabras) {
    return listaDePalabras.slice().sort((a, b) => a.length - b.length);
}
console.log("ordenarPalabrasPorLongitud(['abc', 'a', 'ab']): ", ordenarPalabrasPorLongitud(['abc', 'a', 'ab']))

/**
 * 10 - encontrarPalabraMasCorta
 * 
 * Recibe
 * - `listaDePalabras`: una lista (array) de palabras (string).
 * 
 * Retorna: 
 * - una palabras (string) que dentro del listado tenga la menor cantidad de caracteres de longitud. En caso de que haya varias palabras con la misma longitud, se puede devolver la primera encontrada.
 * 
 * Ejemplos:
 * - encontrarPalabraMasCorta(['abc', 'a', 'ab', 'c']) retorna 'a'
 */
// Usando arrow function
const encontrarPalabraMasCorta = (listaDePalabras) => {
    if (listaDePalabras.length === 0) {
        return undefined;
    }
    let masCorta = listaDePalabras[0];
    for (let i = 1; i < listaDePalabras.length; i++) {
        if (listaDePalabras[i].length < masCorta.length) {
            masCorta = listaDePalabras[i];
        }
    }
    return masCorta;
}
console.log("encontrarPalabraMasCorta(['abc', 'a', 'ab']): ", encontrarPalabraMasCorta(['abc', 'a', 'ab']))

/**
 * 11 - filtrarSoloPositivos
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - una lista (array) de números, conteniendo sólo los valores positivos de la lista de números recibida.
 * 
 * Ejemplos:
 * - filtrarSoloPositivos([1,-1,2]) retorna [1,2]
 */
// Usando expresión de función
const filtrarSoloPositivos = function(listaDeNumeros) {
    return listaDeNumeros.filter(num => num > 0);
}
console.log("filtrarSoloPositivos([1,-1,0]): ", filtrarSoloPositivos([1,-1,0]))
console.log("filtrarSoloPositivos(listaNumerosEjemplo): ", filtrarSoloPositivos(listaNumerosEjemplo))

/**
 * 12 - contarAprobados
 * 
 * Recibe
 * - `listaDeNotas`: una lista (array) de números con valores entre 1 y 10.
 * 
 * Retorna: 
 * - un numero, con la cantidad de notas que superan el criterio de aprobación.
 * 
 * Ejemplos:
 * - contarAprobados([10,2,9]) retorna 2
 */
// Usando declaración de función
function contarAprobados(listaDeNotas) {
    let aprobados = 0;
    for (let i = 0; i < listaDeNotas.length; i++) {
        if (listaDeNotas[i] >= 6) {
            aprobados++;
        }
    }
    return aprobados;
}
console.log("contarAprobados([10, 4, 6, 7, 1, 9]): ", contarAprobados([10, 4, 6, 7, 1, 9]))

/**
 * 13 - filtrarSoloTruthy
 * 
 * Recibe
 * - `listaDeValores`: una lista (array) de valores de distintos tipos.
 * 
 * Retorna: 
 * - una lista (array) conteniendo sólo los valores que son considerados 'truthy' por el lenguaje JavaScript
 * 
 * Ejemplos:
 * - filtrarSoloTruthy(["Hola", "", 0, 1]) retorna ["Hola", 1]
 */
// Usando arrow function
const filtrarSoloTruthy = (listaDeValores) => {
    return listaDeValores.filter(valor => Boolean(valor));
}
console.log("filtrarSoloTruthy(): ", filtrarSoloTruthy(["Hola", "", null, 1, 0, -1, undefined, [], {}]))

/**
 * 14 - enumerarLista
 * Recibe
 * - `listaDePalabras`: una lista (array) de palabras (strings).
 * 
 * Retorna: 
 * - Una oración (string), donde se enumeran cada una de las palabras recibidas en la lista.
 * - Bonus: una oración correctamente formada debería empezar en mayúscula, terminar con punto, y además el ultimo elemento de enumeración deberia estar separado con "y".
 * 
 * Ejemplos:
 * - enumerarLista(["Han", "Leia", "Luke", "Yoda"]) "Han, Leia, Luke y Yoda."
 */
// Usando expresión de función
const enumerarLista = function(listaDePalabras) {
    if (listaDePalabras.length === 0) {
        return "";
    }
    if (listaDePalabras.length === 1) {
        return listaDePalabras[0].charAt(0).toUpperCase() + listaDePalabras[0].slice(1) + ".";
    }
    if (listaDePalabras.length === 2) {
        return listaDePalabras[0].charAt(0).toUpperCase() + listaDePalabras[0].slice(1) + " y " + listaDePalabras[1] + ".";
    }
    let resultado = listaDePalabras[0].charAt(0).toUpperCase() + listaDePalabras[0].slice(1);
    for (let i = 1; i < listaDePalabras.length - 1; i++) {
        resultado += ", " + listaDePalabras[i];
    }
    resultado += " y " + listaDePalabras[listaDePalabras.length - 1] + ".";
    return resultado;
}
console.log("enumerarLista(): ", enumerarLista(["Han", "Leia", "Luke", "Yoda"]))


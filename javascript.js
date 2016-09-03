var cont = 0

function dibujarMatriz(filas, columnas, tabla) {
  tabla.innerHTML = "";
  for (i = 0; i < filas; i++) {
    var nuevaFila = tabla.insertRow(-1)
    for (j = 0; j < columnas; j++) {
      var celda = nuevaFila.insertCell(-1)
      var input = document.createElement('input')
      input.setAttribute('type', 'text')
      input.setAttribute('data-fila', i)
      input.setAttribute('data-columna', j)
      input.setAttribute('size', '3')
      celda.appendChild(input)
    }
  }
}

var es = {
  vacio: function(str) {
    if (str === '' || str === null) {
      return true
    } else {
      return false
    }
  },
  entero: function(str) {
    if (str === parseInt(str, 10).toString()) {
      return true
    } else {
      return false
    }
  },
  numero: function(str) {
    if (str === parseFloat(str).toString()) {
      return true
    } else {
      return false
    }
  },
  par: function(num) {
    if(num %2 === 0){
      return true
    } else {
      return false
    }
  }
}

function validarVacio(parametros) {
  for (var i = 0; i < parametros.length; i++) {
    if (typeof(parametros[i]) === "object") {
      for (var j = 0; j < parametros.length; j++) {
        if (es.vacio(parametros[i][j])) {
          return true
        }
      }
    } else if (es.vacio(parametros[i])) {
      return true
    }
  }
  return false
}

function validarEntero(parametros) {
  for (var i = 0; i < parametros.length; i++) {
    if (typeof(parametros[i]) === "object") {
      for (var j = 0; j < parametros[i].length; j++) {
        if (!es.entero(parametros[i][j])) {
          return false
        }
      }
    } else if (!es.entero(parametros[i])) {
      return false
    }
  }
  return true
}

function validarNumero(parametros) {
  for (var i = 0; i < parametros.length; i++) {
    if (typeof(parametros[i]) === "object") {
      for (var j = 0; j < parametros[i].length; j++) {
        if (!es.numero(parametros[i][j])) {
          return false
        }
      }
    } else if (!es.numero(parametros[i])) {
      return false
    }
  }
  return true
}

function convertirAArreglo(filas, columnas, tabla) {
  var arreglo = new Array()
  for (i = 0; i < filas; i++) {
    for (j = 0; j < columnas; j++) {
      if (arreglo[i] === undefined) {
        arreglo[i] = new Array()
      }

      arreglo[i][j] = tabla.querySelectorAll('[data-fila="' + i + '"][data-columna="' + j + '"]')[0].value
    }
  }
  return arreglo
}

function creandoMatrices() {
  //window.alert("Ingresaste Genial")
  var formulario = document.getElementById('dimensionesA')
  var filasA = formulario.elements['size'].value
  var columnasA = filasA
  var matrizA = document.getElementById('matrizA')
  try {
    if (validarVacio([filasA, columnasA])) {
      throw new Error('Algunos campos se encuentran vacíos')
    }
    if (!validarEntero([filasA, columnasA])) {
      throw new Error('Algunos campos no son enteros')
    }
    if (filasA != columnasA) {
      throw new Error('La matriz no es cuadrada')
    }
    if (filasA <= 1) {
      throw new Error('La matriz es unidimensional o menor a cero')
    }
  } catch (e) {
    window.alert(e)
    return e
  }
  dibujarMatriz(filasA, columnasA, matrizA)
  var boton = document.createElement('input')
  boton.setAttribute('type', 'button')
  boton.setAttribute('class', 'boton-central')
  boton.setAttribute('value', 'Calcular Determinante')
  boton.onclick = function() {
    calcular(filasA, columnasA, matrizA)
  }
  document.getElementById('container').innerHTML = ''
  document.getElementById('container').appendChild(boton)
}

function productoria(matriz, sigma, n) {
  producto = 1
  cont += 3
  for (var i = 0; i < n; i++) {
    cont += 7
    //console.log(matriz,sigma,sigma[i],i)
    producto = producto * matriz[sigma[i]-1][i]
  }
  return producto
}

function S(n) {
  var arreglo = new Array()
  cont += 3
  for (var i = 1; i <= n; i++) {
    cont += 3
    arreglo.push(i)
  }
  return arreglo
}

function rem(a, b) {
  return a % b
}

//http://math.stackexchange.com/questions/65923/how-does-one-compute-the-sign-of-a-permutation#65938
function permutationSignOpt1(p) {
  var n = p.length
  var visited = new Array()
  for (var i = 0; i < n; i++) {
    visited[i] = false
  }
  var sgn = 1
  for (var k = 0; k < n; k++) {
    if (!visited[k]) {
      var next = k
      var L = 0
      while (!visited[next]) {
        L = L + 1
        visited[next] = true
        next = p[next]
      }
      if (rem(L,2) === 0) {
        sgn = -sgn;
      }
    }
  }
  return sgn
}

//http://math.stackexchange.com/questions/65923/how-does-one-compute-the-sign-of-a-permutation
function permutationSign(sigma) {
  var productoria = 1
  cont += 3
  for (var i = 0; i < sigma.length; i++) {
    cont += 4
    for (var j = 0; j < sigma.length; j++) {
      cont += 2
      if (i < j) {
        var frac = (sigma[i] - sigma[j]) / (i - j)
        productoria = productoria * frac
      }
    }
  }
  return productoria
}

//http://stackoverflow.com/questions/9960908/permutations-in-javascript
function permutator(inputArr) {
  var results = []
  cont += 1
  function permute(arr, memo) {
    var cur, memo = memo || []
    cont += 3
    for (var i = 0; i < arr.length; i++) {
      cont += 4
      cur = arr.splice(i, 1)
      if (arr.length === 0) {
        results.push(memo.concat(cur))
      }
      permute(arr.slice(), memo.concat(cur))
      arr.splice(i, 0, cur[0])
    }
    return results
  }
  return permute(inputArr)
}

//https://es.wikipedia.org/wiki/F%C3%B3rmula_de_Leibniz_para_el_c%C3%A1lculo_de_determinantes
function determinante(matriz) {
  var sumatoria = 0
  var n = matriz.length
  var sigma = S(n)
  var permutaciones = permutator(sigma)
  cont += 6
  for (var a = 0; a < permutaciones.length; a++) {
    cont += 6
    var sigma_a = permutaciones[a]
    var sgn = permutationSign(sigma_a)
    var prod = productoria(matriz, sigma_a, n)
    //console.log("sig", sgn, prod)
    sumatoria += sgn * prod
  }
  return sumatoria
}

function calcular(filasA, columnasA, matrizA) {
  matrizA = convertirAArreglo(filasA, columnasA, matrizA)
  try {
    if (validarVacio(matrizA)) {
      throw new Error('Algunos campos de la matriz A se encuentran vacíos')
    }
    if (!validarNumero(matrizA)) {
      throw new Error('Algunos campos de la matriz A no son números')
    }
  } catch (e) {
    window.alert(e)
    return e
  }

  //https://en.wikipedia.org/wiki/Leibniz_formula_for_determinants
  cont = 0
  det = determinante(matrizA)
  window.alert(cont)

  var h1 = document.createElement('h1')
  h1.innerHTML = det
  document.getElementById('result').innerHTML = ''
  document.getElementById('result').appendChild(h1)
}

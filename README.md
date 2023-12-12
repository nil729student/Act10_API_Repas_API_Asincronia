# Abans de començar

## Entorn

Aquest repositori és un entorn bàsic amb Prettier, ESLint i Jest. Pots mirar el fitxer package.json per veure les versions de les dependències.

## Instal·lació

```bash
npm install
```

Verifica si la configuració per defecte de Prettier, ESLint i Jest et convé. Si no, modifica els fitxers de configuració.

# Abans de començar

## Entorn

Aquest repositori és un entorn bàsic amb Prettier, ESLint i Jest. Pots mirar el fitxer package.json per veure les versions de les dependències.

## Instal·lació

```bash
npm install
```

Verifica si la configuració per defecte de Prettier, ESLint i Jest et convé. Si no, modifica els fitxers de configuració.

## Part 1 - Callbacks i Operacions Asíncrones

### Configuració ínicial

Anem a afegir al nostre projecte de Node.js el paquet **express** per poder crear un servidor web. Per fer-ho, executem la següent comanda:

```bash
npm install express node-fetch
```

Crea un arxiu anomenat `app.js` i copia el següent codi:

```javascript
import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = 3000;

// Fem que el servidor mostri el contingut de la carpeta public
app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor escoltant al port ${port}`);
});
```

Com que estem utilitzant mòduls d'ES6, amb l'ús de `import` per exemple, hem de dir-li a Node.js que utilitzi la versió més recent de Javascript. Per fer-ho, de manera ràpida canvia l'extensió de `app.js` a `app.mjs`.

Per defecte si executem `node ./src/app.mjs` el servidor escoltarà a la ruta http://localhost:3000. Si obres el navegador veuràs el missatge "Cannot GET /". Això és perquè hem dit on servir els arxius (carpeta `public`) però no tenim res encara. Crea la carpeta `public` amb un arxiu `index.html` per ex:

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="utf-8" />
    <title>Node.js</title>
  </head>
  <body>
    <h1>Node.js</h1>
    <p>Exemple de servidor web amb Node.js</p>
  </body>
</html>
```

I veuràs que el servidor web respon amb el contingut de l'arxiu `index.html`.

### Callbacks

Treballarem amb una API Rest que ens permetrà obtenir informació sobre països. La API és aquesta: https://restcountries.eu/. Pots consultar la documentació per veure com funciona. Per exemple, si volem obtenir informació sobre Espanya, podem fer una petició GET a la següent URL: https://restcountries.com/v3.1/name/spain. Si ho fas des del navegador veuràs que la resposta és un array amb un sol element, que és un objecte amb informació sobre Espanya.

Anem a modificar el nostre HTML amb el següent codi:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Peticions a l'API de Països</title>
  </head>
  <body>
    <h1>Peticions a l'API de Països</h1>

    <label for="country">Introdueix un país:</label>
    <input type="text" id="country" name="country" required />

    <button onclick="ferPeticioAmbPromesa()">Fer petició amb Promesa</button>
    <button onclick="ferPeticioAmbAsyncAwait()">
      Fer petició amb Async/Await
    </button>

    <div id="resposta"></div>

    <script src="main.js"></script>
  </body>
</html>
```

Com pots veure hem afegit 2 botons. Un per fer una petició seguint el patró de promeses i un altre seguint el patró de async/await.

Antigament, abans de l'arribada de les promeses, les funcions que feien peticions asíncrones rebien un paràmetre que era una funció de callback. Aquesta funció de callback era la que s'executava quan la petició finalitzava. Aquesta funció de callback rebia un paràmetre que era la resposta de la petició. Així doncs, el codi amb callbacks seria el següent:

```javascript
const pais = document.getElementById('pais').value;
const url = `https://restcountries.com/v3.1/name/${pais}`;

function obtenirInfoPaisCallback() {
  const request = require('request');
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      document.getElementById('resposta').innerText = JSON.stringify(data);
    }
  });
}
```

Això ara mateix no funcionaria entre d'altres coses perquè Node.js no ho soporta en les noves versions però ens serveix com a punt de partida. Anem a plantejar-ho directament amb promeses. Per fer-ho, utilitzarem el paquet `node-fetch` que hem instal·lat abans. Aquest paquet ens permet fer peticions HTTP des de Node.js com ja ho havíem vist anteriorment. Intenta fer el següent.

1. Crea una funció anomenada `obtenirInfoPaisPromesa` que faci una petició GET a la API de REST Countries i que mostri la resposta a la consola.
2. Un cop vegis que estàs recuperant les dades correctament, mostra les dades a la pàgina web aprofitant que tens un element amb id `resposta`.
3. Implementa la funció `obtenirInfoPaisAsyncAwait` que faci el mateix però utilitzant async/await i la lògica de try/catch.
4. Modifica la lògica de manera que mostris les següents dades del país a la pàgina web: nom, capital, població i idiomes que s'hi parlen. Pots consultar la documentació de la API per veure com accedir a aquestes dades.

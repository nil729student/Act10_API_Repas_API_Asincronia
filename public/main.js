// Fetch és específic per fer peticions http
// Les Promise poden ser útils per fer alguns accions que duguin un cert temps que no siguin peticions http:
//  - llegir un arxiu, esperar a un timeout...
// Embolcallar un fetch amb una Promesa no té massa sentit però podem fer-ho per recuperar la sintaxi.

function obtenirInfoPaisPromesa(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          reject(`HTTP error! status: ${response.status}`);
        } else {
          resolve(response.json());
        }
      })
      .catch((error) => {
        reject('Fetch error: ' + error.message);
      });
  });
}

function ferPeticioAmbPromesa() {
  const country = document.getElementById('country').value;
  const url = `https://restcountries.com/v3.1/name/${country}`;

  obtenirInfoPaisPromesa(url)
    .then((data) => {
      document.getElementById('resposta').innerText = JSON.stringify(data);
      // Anem a mostrar la informació del país a la pàgina de manera més amigable. Volem mostrar el nom, la capital, la població, la bandera i els idiomes.
      // Per això, creem un element div amb la classe country-info i el posem dins el div amb id resposta.
      const countryInfo = document.createElement('div');
      countryInfo.classList.add('country-info'); //
    })
    .catch((error) => {
      console.error('Error de petició:', error);
    });
}

// And now with Async/Await syntax

async function ferPeticioAmbAsync() {
  const country = document.getElementById('country').value;
  const url = `https://restcountries.com/v3.1/name/${country}`;

  try {
    const data = await obtenirInfoPaisAsync(url);
    document.getElementById('resposta').innerText = JSON.stringify(data);
  } catch (error) {
    console.error('Error de petició:', error);
  }
}

async function obtenirInfoPaisAsync(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

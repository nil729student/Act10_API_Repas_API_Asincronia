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

const BASE_URL = "https://swapi.info/api/";
const film_URL = "https://swapi.info/api/films";
const people_URL = "https://swapi.info/api/people";
const planets_URL = "https://swapi.info/api/planets";
const species_URL = "https://swapi.info/api/species";
const vehicles_URL = "https://swapi.info/api/vehicles";
const starships_URL = "https://swapi.info/api/starships";

// FETCH API
fetch(BASE_URL)
  .then(response => response.json())
  .then(data => {

    // for...of loop
    for (const films of data.results) {

      // destructuring
      const { name, director, title } = film_URL;

      console.log(
        `Navn: ${name}, Klima: ${climate}, Befolkning: ${population}`
      );
    }
  })
  .catch(error => {
    console.error("Failed to fetch API..:", error);
  });

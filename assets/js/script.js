const BASE_URL = "https://swapi.info/api/planets";

// FETCH API
fetch(BASE_URL)
  .then(response => response.json())
  .then(data => {

    // for...of loop
    for (const planet of data.results) {

      // destructuring
      const { name, climate, population } = planet;

      console.log(
        `Navn: ${name}, Klima: ${climate}, Befolkning: ${population}`
      );
    }
  })
  .catch(error => {
    console.error("Failed to fetch API..:", error);
  });
  
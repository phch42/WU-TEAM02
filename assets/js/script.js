  fetch("https://swapi.info/api/starships")
      .then(response => response.json())
      .then(data => {
        const starshipsContainer = document.getElementById("starships");

        data.forEach(starship => {
          const starshipDiv = document.createElement("div");

          starshipDiv.innerHTML = `
            <h2>${starship.name}</h2>
            <p>Model: ${starship.model}</p>
            <p>Manufacturer: ${starship.manufacturer}</p>
            <p>Starship Class: ${starship.starship_class}</p>
            <p>Crew: ${starship.crew}</p>
            <p>Passengers: ${starship.passengers}</p>
            <p>Hyperdrive Rating: ${starship.hyperdrive_rating}</p>
          `;

          starshipsContainer.appendChild(starshipDiv);
        });
      })
      .catch(error => {
        console.error("Error fetching starships:", error);
      });
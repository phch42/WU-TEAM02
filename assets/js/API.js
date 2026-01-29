const ROOT = document.getElementById("root");


const filmImages = {
  "A New Hope": "hope.jpg",
  "The Empire Strikes Back": "empire.webp",
  "Return of the Jedi": "return of the jedi.jpeg",
  "Revenge of the Sith": "revenge.jpeg",
  "The Phantom Menace": "phantom.jpg",
  "Attack of the Clones": "clones.jpg"
};


export const getFilms = () => {
  fetch("https://swapi.info/api/films")
    .then((response) => response.json())
    .then((data) => {
      const ulWrapper = document.createElement("ul");

      for (const item of data) {
        const { title, episode_id, director, release_date } = item;

        const liWrapper = document.createElement("li");

    
        const figure = document.createElement("figure");
        figure.className = "film-card";

        const img = document.createElement("img");
        img.src = `./assets/images/${filmImages[title]}`;
        img.alt = title;
        img.loading = "lazy";

        const figcaption = document.createElement("figcaption");
        figcaption.innerText = title;

        figure.append(img, figcaption);

        const ulDetails = document.createElement("ul");

        const liDir = document.createElement("li");
        liDir.innerText = `Instruktør: ${director}`;

        const liEpisode = document.createElement("li");
        liEpisode.innerText = `Episode: ${episode_id}`;

        const liRelease = document.createElement("li");
        liRelease.innerText = `Udgivelsesår: ${new Date(release_date).getFullYear()}`;

        ulDetails.append(liDir, liEpisode, liRelease);

        liWrapper.append(figure, ulDetails);
        ulWrapper.append(liWrapper);
      }

      ROOT.innerHTML = "";
      ROOT.append(ulWrapper);
    })
    .catch((error) => {
      console.error(error);
    });
};


export const getPeople = () => {
  fetch("https://swapi.info/api/people")
    .then((response) => response.json())
    .then((data) => {
      const ulWrapper = document.createElement("ul");
      ulWrapper.className = "people";

      for (const item of data.slice(0, 10)) {
        const { name, gender, films } = item;

        const liWrapper = document.createElement("li");
        liWrapper.innerHTML = `<b>${name}</b>`;

        const ulDetails = document.createElement("ul");

        const liDir = document.createElement("li");
        liDir.innerText = `Køn: ${gender}`;

        const liEpisode = document.createElement("li");
        liEpisode.innerHTML = `Film: <ul><li>${films.join("</li><li>")}</li></ul>`;

        ulDetails.append(liDir, liEpisode);
        liWrapper.append(ulDetails);
        ulWrapper.append(liWrapper);
      }

      ROOT.innerHTML = "";
      ROOT.append(ulWrapper);
    })
    .catch((error) => {
      console.error(error);
    });
};


export const getPlanets = () => {
  fetch("https://swapi.info/api/planets")
    .then((response) => response.json())
    .then((data) => {
      const ulWrapper = document.createElement("ul");
      ulWrapper.className = "planets";

      for (const item of data.slice(0, 10)) {
        const { name, climate, terrain } = item;

        const liWrapper = document.createElement("li");
        liWrapper.innerHTML = `<b>${name}</b>`;

        const ullist = document.createElement("ul");

        const liClimate = document.createElement("li");
        liClimate.innerText = `climate: ${climate}`;

        const liTerrain = document.createElement("li");
        liTerrain.innerText = `terrain: ${terrain}`;

        ullist.append(liClimate, liTerrain);
        liWrapper.append(ullist);
        ulWrapper.append(liWrapper);
      }

      ROOT.innerHTML = "";
      ROOT.append(ulWrapper);
    })
    .catch((error) => {
      console.error(error);
    });
};


export const getSpecies = () => {
  fetch("https://swapi.info/api/species")
    .then(response => response.json())
    .then(data => {
      const ulWrapper = document.createElement("ul");
      ulWrapper.className = "species";

      for (const item of data.slice(0, 10)) {
        const { name, classification, designation, skin_colors, hair_colors } = item;

        const liWrapper = document.createElement("li");
        liWrapper.innerHTML = `<b>${name}</b>`;

        const ullist = document.createElement("ul");

        ullist.innerHTML = `
          <li>Classification: ${classification}</li>
          <li>Designation: ${designation}</li>
          <li>Skin colors: ${skin_colors}</li>
          <li>Hair colors: ${hair_colors}</li>
        `;

        liWrapper.append(ullist);
        ulWrapper.append(liWrapper);
      }

      ROOT.innerHTML = "";
      ROOT.append(ulWrapper);
    })
    .catch(error => {
      console.error(error);
    });
};


export const getVehicles = () => {
  fetch("https://swapi.info/api/vehicles")
    .then(response => response.json())
    .then(data => {
      const ulWrapper = document.createElement("ul");
      ulWrapper.className = "vehicles";

      for (const item of data) {
        const { name, model, manufacturer, vehicle_class, crew, cargo_capacity, films } = item;

        const liWrapper = document.createElement("li");
        const h2 = document.createElement("h2");
        h2.innerText = name;

        const ulInner = document.createElement("ul");

        const liModel = document.createElement("li");
        liModel.innerText = `Model: ${model}`;

        const liManu = document.createElement("li");
        liManu.innerText = `Producent: ${manufacturer}`;

        const liVehicles = document.createElement("li");
        liVehicles.innerText = `Fartøjsklasse: ${vehicle_class}`;

        const liCrew = document.createElement("li");
        liCrew.innerText = `Antal besætning: ${crew}`;

        const liCargo = document.createElement("li");
        liCargo.innerText = `Kapacitet: ${cargo_capacity}`;

        const liFilms = document.createElement("li");
        liFilms.innerText = `Film: ${films}`;

        ulInner.append(liModel, liManu, liVehicles, liCrew, liCargo, liFilms);
        liWrapper.append(h2, ulInner);
        ulWrapper.append(liWrapper);
      }

      ROOT.innerHTML = "";
      ROOT.append(ulWrapper);
    });
};


export const getStarships = () => {
  fetch("https://swapi.info/api/starships")
    .then(response => response.json())
    .then(data => {
      const ulWrapper = document.createElement("ul");
      ulWrapper.className = "starships";

      for (const item of data) {
        const { name, model, manufacturer, length, crew, passengers, films } = item;

        const liWrapper = document.createElement("li");
        const h2 = document.createElement("h2");
        h2.innerText = name;

        const ulInner = document.createElement("ul");

        ulInner.innerHTML = `
          <li>Model: ${model}</li>
          <li>Manufacturer: ${manufacturer}</li>
          <li>Length: ${length}</li>
          <li>Crew: ${crew}</li>
          <li>Passengers: ${passengers}</li>
          <li>Films: ${films.length}</li>
        `;

        liWrapper.append(h2, ulInner);
        ulWrapper.append(liWrapper);
      }

      ROOT.innerHTML = "";
      ROOT.append(ulWrapper);
    });
};

const filmImages = {
  "A New Hope": "hope.jpg",
  "The Empire Strikes Back": "empire.webp",
  "Return of the Jedi": "return of the jedi.jpeg",
  "Revenge of the Sith": "revenge.jpeg",
  "The Phantom Menace": "phantom.jpg",
  "Attack of the Clones": "clones.jpg"
};

const peopleImages = {
  "Luke Skywalker": "luke.jpg",
  "Darth Vader": "darth vader.jpg",
  "Leia Organa": "Leia organa.jpg",
  "Obi-Wan Kenobi": "obi wan.webp",
  "Owen Lars": "Owen.webp",
  "Beru Whitesun Lars": "Beru.webp",
  "R2-D2": "r2d2.jpeg",
  "C-3PO": "c-3po.jpeg",
  "Biggs Darklighter": "biggs.jpg",
  "R5-D4": "r5-d4.jpg"
};


const getRoot = () => document.getElementById("root");


export const getFilms = () => {
  const ROOT = getRoot();

  fetch("https://swapi.info/api/films")
    .then((response) => response.json())
    .then((data) => {
      const ulWrapper = document.createElement("ul");

      for (const item of data) {
        const { title, episode_id, director, release_date } = item;

        const liWrapper = document.createElement("li");

     
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = `./assets/images/${filmImages[title] || "placeholder.jpg"}`;
        img.alt = title;

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
    .catch((error) => console.error(error));
};


export const getPeople = () => {
  const ROOT = getRoot();

  fetch("https://swapi.info/api/people")
    .then((response) => response.json())
    .then((data) => {
      const ulWrapper = document.createElement("ul");
      ulWrapper.className = "people";

      for (const item of data.slice(0, 10)) {
        const { name, gender, films } = item;

        const liWrapper = document.createElement("li");

        const figure = document.createElement("figure");
        figure.className = "people-card";

        const img = document.createElement("img");
        img.src = `./assets/people/${peopleImages[name] || "placeholder.jpg"}`;
        img.alt = name;
        img.loading = "lazy";

        const figcaption = document.createElement("figcaption");
        figcaption.innerText = name;

        figure.append(img, figcaption);

        const ulDetails = document.createElement("ul");

        const liGender = document.createElement("li");
        liGender.innerText = `Køn: ${gender}`;

        const liFilms = document.createElement("li");
        liFilms.innerHTML = `Film: <ul><li>${films.join("</li><li>")}</li></ul>`;

        ulDetails.append(liGender, liFilms);

        liWrapper.append(figure, ulDetails);
        ulWrapper.append(liWrapper);
      }

      ROOT.innerHTML = "";
      ROOT.append(ulWrapper);
    })
    .catch((error) => console.error(error));
};

export const getPlanets = () => {
  const ROOT = getRoot();

  fetch("https://swapi.info/api/planets")
    .then(response => response.json())
    .then(data => {
      const ulWrapper = document.createElement("ul");
      ulWrapper.className = "planets";
  
      for (const item of data.slice(0, 10)) {
        console.log(item)
        const { name, climate, terrain } = item;

        const liWrapper = document.createElement("li");
        liWrapper.innerHTML = `<b>${name}</b>`;

        const ullist = document.createElement("ul");
        const liClimate = document.createElement("li");
        liClimate.innerText = `Climate: ${climate}`;
        const liTerrain = document.createElement("li");
        liTerrain.innerText = `Terrain: ${terrain}`;

        ullist.append(liClimate, liTerrain);
        liWrapper.append(ullist);
        ulWrapper.append(liWrapper);
      }

      ROOT.innerHTML = "";
      ROOT.append(ulWrapper);
    })
    .catch(error => console.error(error));
};



export const getSpecies = () => {
  const ROOT = getRoot();

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
    .catch(error => console.error(error));
};


export const getVehicles = () => {
  const ROOT = getRoot();

  fetch("https://swapi.info/api/vehicles")
    .then(response => response.json())
    .then(data => {
      const ulWrapper = document.createElement("ul");
      ulWrapper.className = "vehicles";

      for (const item of data) {
        const { name, model, manufacturer, vehicle_class, crew, cargo_capacity, films } = item;

        const liWrapper = document.createElement("li");
        liWrapper.className = "vehicle";

        const h2 = document.createElement("h2");
        h2.className = "vehicleName";
        h2.innerText = name;

        const ulInner = document.createElement("ul");
        ulInner.className = "vehicleDetails";

        ulInner.innerHTML = `
          <li>Model: ${model}</li>
          <li>Producent: ${manufacturer}</li>
          <li>Fartøjsklasse: ${vehicle_class}</li>
          <li>Antal besætning: ${crew}</li>
          <li>Kapacitet: ${cargo_capacity}</li>
          <li>Film: ${films.join(", ")}</li>
        `;

        liWrapper.append(h2, ulInner);
        ulWrapper.append(liWrapper);
      }

      ROOT.innerHTML = "";
      ROOT.append(ulWrapper);
    })
    .catch(error => console.error(error));
};


export const getStarships = () => {
  const ROOT = getRoot();

  fetch("https://swapi.info/api/starships")
    .then(response => response.json())
    .then(data => {
      const ulWrapper = document.createElement("ul");
      ulWrapper.className = "starships";

      for (const item of data) {
        const { name, model, manufacturer, crew } = item;

        const li = document.createElement("li");
        li.innerHTML = `
          <b>${name}</b>
          <ul>
            <li>Model: ${model}</li>
            <li>Manufacturer: ${manufacturer}</li>
            <li>Crew: ${crew}</li>
          </ul>
        `;

        ulWrapper.append(li);
      }

      ROOT.innerHTML = "";
      ROOT.append(ulWrapper);
    })
    .catch(error => console.error(error));
};

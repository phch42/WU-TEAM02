// URLS (OBJ)
const urls = {
  films: 'https://swapi.info/api/films',
  people: 'https://swapi.info/api/people',
  planets: 'https://swapi.info/api/planets',
  species: 'https://swapi.info/api/species',
  vehicles: 'https://swapi.info/api/vehicles',
  starships: 'https://swapi.info/api/starships'
};

// ROOT container div
const ROOT = document.getElementById('root');

const clearRoot = () => {
  ROOT.innerHTML = '';
};

// Response check if url is valid
const fetchData = (url) => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.results ?? data);
};

/* FILMS */
let filmsCache = null; // set to null

export const getFilms = () => {
  clearRoot();
  ROOT.textContent = 'Loading films...';
// FETCH FILMS DATA
  fetchData(urls.films)
    .then(data => {
      filmsCache = new Map(data.map(f => [f.url, f.title])); // cache for people
      const ulWrapper = document.createElement('ul');

      data.forEach(({ title, episode_id, director, release_date }) => {
        const li = document.createElement('li');
        li.textContent = title;

        const ulDetails = document.createElement('ul');
        ulDetails.innerHTML = `
          <li>Director: ${director}</li>
          <li>Episode: ${episode_id}</li>
          <li>Release: ${new Date(release_date).getFullYear()}</li>
        `;

        li.append(ulDetails);
        ulWrapper.append(li);
      });

      clearRoot();
      ROOT.append(ulWrapper);
    })
    .catch(err => {
      console.error(err);
      ROOT.textContent = 'Failed to load films.';
    });
};

/* PEOPLE */

// CACHE FUNCTION
export const getPeople = () => {
  clearRoot();
  ROOT.textContent = 'Loading people...';

  const ensureFilmsCache = () => {
  if (filmsCache) {
    return Promise.resolve();
  }

  return fetchData(urls.films).then(data => {
    filmsCache = new Map(data.map(f => [f.url, f.title]));
  });
};
// FETCH PEOPLE DATA
  ensureFilmsCache()
    .then(() => fetchData(urls.people))
    .then(data => {
      const ulWrapper = document.createElement('ul');
      ulWrapper.className = 'people';

      data.slice(0, 10).forEach(({ name, gender, films }) => {
        const li = document.createElement('li');
        const nameEl = document.createElement('strong');
        nameEl.textContent = name;

        const ulDetails = document.createElement('ul');
        const liGender = document.createElement('li');
        liGender.textContent = `Gender: ${gender}`;

        const liFilms = document.createElement('li');
        liFilms.textContent = 'Films:';
        const filmsList = document.createElement('ul');

        films.forEach(filmUrl => {
          const filmLi = document.createElement('li');
          filmLi.textContent =
            filmsCache.get(filmUrl) ?? 'Unknown film';
          filmsList.append(filmLi);
        });

        liFilms.append(filmsList);
        ulDetails.append(liGender, liFilms);
        li.append(nameEl, ulDetails);
        ulWrapper.append(li);
      });

      clearRoot();
      ROOT.append(ulWrapper);
    })
    .catch(err => {
      console.error(err);
      ROOT.textContent = 'Failed to load people.';
    });
};

/* PLANETS */
export const getPlanets = () => {
  clearRoot();
  ROOT.textContent = 'Loading planets...';
// FETCH PLANETS DATA
  fetchData(urls.planets)
    .then(data => {
      const ulWrapper = document.createElement('ul');
      ulWrapper.className = 'planets';

      data.slice(0, 10).forEach(({ name, climate, terrain }) => {
        const li = document.createElement('li');
        const nameEl = document.createElement('strong');
        nameEl.textContent = name;

        const ulDetails = document.createElement('ul');
        ulDetails.innerHTML = `
          <li>Climate: ${climate}</li>
          <li>Terrain: ${terrain}</li>
        `;

        li.append(nameEl, ulDetails);
        ulWrapper.append(li);
      });

      clearRoot();
      ROOT.append(ulWrapper);
    })
    .catch(err => {
      console.error(err);
      ROOT.textContent = 'Failed to load planets.';
    });
};

/* SPECIES */
let speciesCache = null;

export const getSpecies = () => {
  clearRoot();
  ROOT.textContent = 'Loading species...';
// FETCH SPECIES DATA
  fetchData(urls.species)
    .then(data => {
      speciesCache = new Map(data.map(s => [s.url, s.name])); // cache for people if needed
      const ulWrapper = document.createElement('ul');
      ulWrapper.className = 'species';

      data.slice(0, 10).forEach(({ name, classification, language }) => {
        const li = document.createElement('li');
        const nameEl = document.createElement('strong');
        nameEl.textContent = name;

        const ulDetails = document.createElement('ul');
        ulDetails.innerHTML = `
          <li>Classification: ${classification}</li>
          <li>Language: ${language}</li>
        `;

        li.append(nameEl, ulDetails);
        ulWrapper.append(li);
      });

      clearRoot();
      ROOT.append(ulWrapper);
    })
    .catch(err => {
      console.error(err);
      ROOT.textContent = 'Failed to load species.';
    });
};

/* VEHICLES */
export const getVehicles = () => {
  clearRoot();
  ROOT.textContent = 'Loading vehicles...';
// FETCH VEHICLES DATA
  fetchData(urls.vehicles)
    .then(data => {
      const ulWrapper = document.createElement('ul');
      ulWrapper.className = 'vehicles';

      data.slice(0, 10).forEach(({ name, model, manufacturer, crew }) => {
        const li = document.createElement('li');
        const nameEl = document.createElement('strong');
        nameEl.textContent = name;

        const ulDetails = document.createElement('ul');
        ulDetails.innerHTML = `
          <li>Model: ${model}</li>
          <li>Manufacturer: ${manufacturer}</li>
          <li>Crew: ${crew}</li>
        `;

        li.append(nameEl, ulDetails);
        ulWrapper.append(li);
      });

      clearRoot();
      ROOT.append(ulWrapper);
    })
    .catch(err => {
      console.error(err);
      ROOT.textContent = 'Failed to load vehicles.';
    });
};

/* STARSHIPS */
export const getStarships = () => {
  clearRoot();
  ROOT.textContent = 'Loading starships...';
// FETCH STARSHIPS DATA
  fetchData(urls.starships)
    .then(data => {
      const ulWrapper = document.createElement('ul');
      ulWrapper.className = 'starships';

      data.slice(0, 10).forEach(({ name, model, manufacturer, crew }) => {
        const li = document.createElement('li');
        const nameEl = document.createElement('strong');
        nameEl.textContent = name;

        const ulDetails = document.createElement('ul');
        ulDetails.innerHTML = `
          <li>Model: ${model}</li>
          <li>Manufacturer: ${manufacturer}</li>
          <li>Crew: ${crew}</li>
        `;

        li.append(nameEl, ulDetails);
        ulWrapper.append(li);
      });

      clearRoot();
      ROOT.append(ulWrapper);
    })
    .catch(err => {
      console.error(err);
      ROOT.textContent = 'Failed to load starships.';
    });
};
// URLS (OBJ)
const urls = {
  films: 'https://swapi.info/api/films',
  people: 'https://swapi.info/api/people',
  planets: 'https://swapi.info/api/planets',
  species: 'https://swapi.info/api/species',
  vehicles: 'https://swapi.info/api/vehicles',
  starships: 'https://swapi.info/api/starships'
};

/* PEOPLE */

// CACHE
let filmsCache = null;

// FETCH HELPER
const fetchData = (url) => fetch(url).then(res => res.json());

// GET ROOT
const getRoot = () => document.getElementById("root");

// CLEAR ROOT
export const clearRoot = () => {
  const ROOT = getRoot();
  if (ROOT) ROOT.innerHTML = "";
};

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

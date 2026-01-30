// URLS (OBJ)
const urls = {
  films: 'https://swapi.info/api/films',
  people: 'https://swapi.info/api/people',
  planets: 'https://swapi.info/api/planets',
  species: 'https://swapi.info/api/species',
  vehicles: 'https://swapi.info/api/vehicles',
  starships: 'https://swapi.info/api/starships'
};

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

// GET FILMS
export const getFilms = () => {
  const ROOT = getRoot();
  ROOT.textContent = 'Loading films...';

  fetchData(urls.films)
    .then(data => {
      const ulWrapper = document.createElement('ul');

      data.forEach(({ title, episode_id, director, release_date }) => {
        const liWrapper = document.createElement('li');

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = `./assets/images/${filmImages[title] || "placeholder.jpg"}`;
        img.alt = title;

        const figcaption = document.createElement('figcaption');
        figcaption.innerText = title;
        figure.append(img, figcaption);

        const ulDetails = document.createElement('ul');
        const liDir = document.createElement('li');
        liDir.innerText = `Instruktør: ${director}`;
        const liEpisode = document.createElement('li');
        liEpisode.innerText = `Episode: ${episode_id}`;
        const liRelease = document.createElement('li');
        liRelease.innerText = `Udgivelsesår: ${new Date(release_date).getFullYear()}`;

        ulDetails.append(liDir, liEpisode, liRelease);

        liWrapper.append(figure, ulDetails);
        ulWrapper.append(liWrapper);
      });

      clearRoot();
      ROOT.append(ulWrapper);
    })
    .catch(err => console.error(err));
};

// GET PEOPLE
export const getPeople = () => {
  clearRoot();
  const ROOT = getRoot();
  ROOT.textContent = 'Loading people...';

  const ensureFilmsCache = () => {
    if (filmsCache) return Promise.resolve();
    return fetchData(urls.films).then(data => {
      filmsCache = new Map(data.map(f => [f.url, f.title]));
    });
  };

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
          filmLi.textContent = filmsCache.get(filmUrl) ?? 'Unknown film';
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

// GET PLANETS
export const getPlanets = () => {
  clearRoot();
  const ROOT = getRoot();
  ROOT.textContent = 'Loading planets...';

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

// GET SPECIES
export const getSpecies = () => {
  const ROOT = getRoot();

  fetch(urls.species)
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

// GET VEHICLES
export const getVehicles = () => {
  const ROOT = getRoot();

  fetch(urls.vehicles)
    .then(response => response.json())
    .then(data => {
      const ulWrapper = document.createElement("ul");
      ulWrapper.className = "vehicles";

      for (const item of data) {
        const { name, model, manufacturer, vehicle_class, crew, cargo_capacity, films } = item;

        const liWrapper = document.createElement('li');
        liWrapper.className = 'vehicle';

        const h2 = document.createElement('h2');
        h2.className = 'vehicleName';
        h2.innerText = name;

        const ulInner = document.createElement('ul');
        ulInner.className = 'vehicleDetails';

        const liModel = document.createElement('li');
        liModel.className = 'vehicleDetail';
        liModel.innerText = `Model: ${model}`;

        const liManu = document.createElement('li');
        liManu.className = 'vehicleDetail';
        liManu.innerText = `Producent: ${manufacturer}`;

        const liVehicles = document.createElement('li');
        liVehicles.className = 'vehicleDetail';

        const label = document.createElement('span');
        label.className = 'label';
        label.innerText = 'Fartøjsklasse:';
        const value = document.createElement('span');
        value.className = 'value';
        value.innerText = `${vehicle_class}`;

        liVehicles.append(label, value);

        const liCrew = document.createElement('li');
        liCrew.className = 'vehicleDetail';
        liCrew.innerText = `Antal besætning: ${crew}`;

        const liCargo = document.createElement('li');
        liCargo.className = 'vehicleDetail';
        liCargo.innerText = `Kapacitet: ${cargo_capacity}`;

        const liFilms = document.createElement('li');
        liFilms.className = 'vehicleDetail';
        liFilms.innerText = `Film: ${films}`;

        ulInner.append(liModel, liManu, label, value, liCrew, liCargo, liFilms);

        liWrapper.append(h2, ulInner);
        ulWrapper.append(liWrapper);
      }

      ROOT.innerHTML = '';
      ROOT.append(ulWrapper);
    })
    .catch(error => console.error(error));
};

// мы создаём функцию, которую можно использовать в других файлах
// эта функция будет загружать и показывать starships
export const getStarships = () => {
  const ROOT = getRoot();

    // fetch говорит браузеру:
    // "сходи по этой ссылке в интернет и принеси данные"
    fetch(urls.starships)
                    // когда браузер получил ответ
                    // мы превращаем его в JSON (читаемый для JavaScript формат)
        .then(response => response.json())
                    // когда JSON уже готов
                    // data — это объект со всеми данными от API
        .then(data => {
                    // создаём HTML элемент <ul>
                    // это будет список всех кораблей
           const ulWrapper = document.createElement('ul')
                    // добавляем класс, чтобы CSS мог его оформить
            ulWrapper.className = 'starships'

                    // data — это коробка, в которой лежал определенный item
            for (const item of data) {
                    // из одного корабля мы достаём нужные данные
                    // это destructuring — короткий способ взять свойства
                const { name, model, manufacturer, length, crew, passengers, films } = item
// создаём <li> это один корабль в списке
                const liWrapper = document.createElement('li')

                    // создаём заголовок <h2> в нём будет имя корабля
                const h2 = document.createElement('h2')
                    // записываем имя корабля внутрь <h2>
                h2.innerText = name


                    // создаём вложенный список <ul>
                    // в нём будут детали корабля (model, length и т.д.)
                const ulInner = document.createElement('ul')

                    // создаём <li> для модели корабля
                const liModel = document.createElement('li')

                    // записываем текст, который увидит пользователь ${model} подставляет значение из API
                liModel.innerText = 'Model: ${model}'

                const liManu = document.createElement('li')
                liManu.innerText = 'Manufacturer: ${manufacturer}'

                const liLength = document.createElement("li")
                liLength.innerText = 'Length: ${length}'

                const liCrew = document.createElement("li")
                liCrew.innerText = 'Crew: ${crew}'

                const liPassengers = document.createElement("li")
                liPassengers.innerText = 'Passengers: ${passengers}'
const liFilms = document.createElement("li")
                liFilms.innerText = 'Films: ${films.length};'

                   // добавляем строку с моделью внутрь списка деталей
                ulInner.append(liModel, liManu, liLength, liCrew, liPassengers, liFilms)

                    // кладём заголовок и список деталей внутрь одного корабля
                liWrapper.append(h2, ulInner) 
                    // кладём корабль в общий список кораблей
                ulWrapper.append(liWrapper)


            }

                    // очищаем ROOT чтобы старый контент исчез
            ROOT.innerHTML = ''
                    // добавляем новый список кораблей на страницу
            ROOT.append(ulWrapper)


        });
}
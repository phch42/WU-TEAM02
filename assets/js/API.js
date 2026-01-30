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
  fetch("https://swapi.info/api/people")
    .then((response) => response.json())
    .then((data) => {
      const ulWrapper = document.createElement("ul");
      ulWrapper.className = "people";

      for (const item of data.slice(0, 10)) {
        const { name, gender, films } = item;
      for (const item of data.slice(0, 10)) {
        const { name, gender, films } = item;

        const liWrapper = document.createElement("li");


        const figure = document.createElement("figure");
        figure.className = "people-card";

        const img = document.createElement("img");
        img.src = `./assets/people/${peopleImages[name] || "placeholder.jpg"}`;
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
    }})
    .catch((error) => console.error(error));
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

  fetch('https://swapi.info/api/vehicles')
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

    // fetch говорит браузеру:
    // "сходи по этой ссылке в интернет и принеси данные"
    fetch('https://swapi.info/api/starships')
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
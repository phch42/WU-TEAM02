const endpoints = {
  films: "https://swapi.info/api/films",
  people: "https://swapi.info/api/people",
  planets: "https://swapi.info/api/planets",
  species: "https://swapi.info/api/species",
  vehicles: "https://swapi.info/api/vehicles",
  starships: "https://swapi.info/api/starships"
};

/* ---------------- FETCH ---------------- */
function fetchData(url) {
  return fetch(url)
    .then(response => response.json());
}

/* ---------------- LOAD FUNCTIONS ---------------- */
function loadFilms() {
  fetchData(endpoints.films)
    .then(data => {
      console.log("Films data:", data); // DEBUG
      showList(data.results, "title");
    });
}

function loadPeople() {
  fetchData(endpoints.people)
    .then(data => showList(data.results, "name"));
}

function loadPlanets() {
  fetchData(endpoints.planets)
    .then(data => showList(data.results, "name"));
}

function loadStarships() {
  fetchData(endpoints.starships)
    .then(data => showList(data.results, "name"));
}

function loadVehicles() {
  fetchData(endpoints.vehicles)
    .then(data => showList(data.results, "name"));
}

function loadSpecies() {
  fetchData(endpoints.species)
    .then(data => showList(data.results, "name"));
}

/* ---------------- LIST VIEW ---------------- */
function showList(items, field) {
  const list = document.getElementById("list");
  const details = document.getElementById("details");

  list.innerHTML = "";
  details.innerHTML = "";

  // 🔒 SAFETY CHECK (prevents "not iterable")
  if (!Array.isArray(items)) {
    console.error("Expected array, got:", items);
    return;
  }

  // for...of loop
  for (const item of items) {
    const { url } = item; // destructuring

    const li = document.createElement("li");
    li.textContent = item[field];
    li.addEventListener("click", () => showDetails(url));

    list.appendChild(li);
  }
}

/* ---------------- DETAILS ---------------- */
function showDetails(url) {
  const details = document.getElementById("details");
  details.innerHTML = "<h2>Details</h2>";

  fetchData(url).then(data => {
    for (const key in data) {
      const value = data[key];

      if (Array.isArray(value)) {
        const ul = document.createElement("ul");

        for (const relationUrl of value) {
          fetchData(relationUrl).then(rel => {
            const li = document.createElement("li");
            li.textContent = rel.name || rel.title;
            ul.appendChild(li);
          });
        }

        details.appendChild(ul);
      } else {
        const p = document.createElement("p");
        p.textContent = `${key}: ${value}`;
        details.appendChild(p);
      }
    }
  });
}
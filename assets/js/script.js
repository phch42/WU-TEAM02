/* ---------------- ENDPOINTS ---------------- */
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
  return fetch(url).then(res => res.json());
}

/* ---------------- GENERIC LOAD FUNCTION ---------------- */
function loadResource(resource) {
  fetchData(endpoints[resource]).then(data => {
    const items = Array.isArray(data) ? data : data.results;
    const field = resource === "films" ? "title" : "name";
    showList(items, field);
  });
}

/* ---------------- LIST VIEW ---------------- */
function showList(items, field) {
  const list = document.getElementById("list");
  const details = document.getElementById("details");
  list.innerHTML = "";
  details.innerHTML = "";

  if (!Array.isArray(items)) return console.error("Expected array, got:", items);

  for (const item of items) {
    const { url } = item; // destructuring
    const li = document.createElement("li");
    li.textContent = item[field];
    li.addEventListener("click", () => showDetails(url));
    list.appendChild(li);
  }
}

/* ---------------- DETAILS VIEW ---------------- */
function showDetails(url) {
  const details = document.getElementById("details");
  details.innerHTML = "<h2>Details</h2>";

  fetchData(url).then(data => {
    for (const key in data) {
      const value = data[key];

      if (Array.isArray(value) && value.length > 0) {
        const ul = document.createElement("ul");
        for (const relUrl of value) fetchRelationName(relUrl, ul);
        details.appendChild(document.createElement("h3")).textContent = key;
        details.appendChild(ul);
      } else if (value && typeof value !== "object") {
        const p = document.createElement("p");
        p.textContent = `${key}: ${value}`;
        details.appendChild(p);
      }
    }
  });
}

/* ---------------- FETCH RELATION NAMES ---------------- */
function fetchRelationName(url, parentUl) {
  fetchData(url).then(rel => {
    const li = document.createElement("li");
    li.textContent = rel.name || rel.title || "Unknown";
    parentUl.appendChild(li);
  });
}

/* ---------------- BUTTON FUNCTIONS ---------------- */
function loadFilms() { loadResource("films"); }
function loadPeople() { loadResource("people"); }
function loadPlanets() { loadResource("planets"); }
function loadStarships() { loadResource("starships"); }
function loadVehicles() { loadResource("vehicles"); }
function loadSpecies() { loadResource("species"); }
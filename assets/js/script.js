const endpoints = {
  films: "https://swapi.dev/api/films",
  people: "https://swapi.dev/api/people",
  planets: "https://swapi.dev/api/planets",
  species: "https://swapi.dev/api/species",
  vehicles: "https://swapi.dev/api/vehicles",
  starships: "https://swapi.dev/api/starships"
};

// Generic fetch function
async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

// Generic load function for any resource
async function load(resource) {
  const data = await fetchData(endpoints[resource]);
  if (!data) return;

  const items = data.results || data;
  const list = document.getElementById("list");
  const details = document.getElementById("details");
  list.innerHTML = "";
  details.innerHTML = "";

  const field = resource === "films" ? "title" : "name";

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item[field] || "Unknown";
    li.addEventListener("click", () => showDetails(resource, item));
    list.appendChild(li);
  });
}

// Show details for selected item
async function showDetails(resource, item) {
  const details = document.getElementById("details");
  details.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "Details";
  details.appendChild(title);

  if (resource === "films") {
    // Show main film info
    const fields = [
      ["Title", item.title],
      ["Episode", item.episode_id],
      ["Director", item.director],
      ["Release", item.release_date]
    ];

    fields.forEach(([label, value]) => {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${label}:</strong> ${value}`;
      details.appendChild(p);
    });

    // Show characters
    if (item.characters && item.characters.length > 0) {
      const h3 = document.createElement("h3");
      h3.textContent = "Characters";
      details.appendChild(h3);

      const ul = document.createElement("ul");
      details.appendChild(ul);

      const names = await Promise.all(
        item.characters.map(async url => {
          const data = await fetchData(url);
          return data ? data.name : "Unknown";
        })
      );

      names.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        ul.appendChild(li);
      });
    }
  } else {
    // Other resources
    for (const key in item) {
      if (typeof item[key] !== "object" && item[key] !== null) {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${key}:</strong> ${item[key]}`;
        details.appendChild(p);
      }
    }
  }
}

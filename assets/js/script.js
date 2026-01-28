 const endpoints = {
      films: "https://swapi.dev/api/films",
      people: "https://swapi.dev/api/people",
      planets: "https://swapi.dev/api/planets",
      species: "https://swapi.dev/api/species",
      vehicles: "https://swapi.dev/api/vehicles",
      starships: "https://swapi.dev/api/starships"
    };

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
        li.onclick = () => showDetails(resource, item);
        list.appendChild(li);
      });
    }

    function showDetails(resource, item) {
      const details = document.getElementById("details");
      details.innerHTML = "<h2>Details</h2>";

      if (resource === "films") {
        details.innerHTML += `
          <p><strong>Title:</strong> ${item.title}</p>
          <p><strong>Episode:</strong> ${item.episode_id}</p>
          <p><strong>Director:</strong> ${item.director}</p>
          <p><strong>Release:</strong> ${item.release_date}</p>
        `;
      } else {
        for (const key in item) {
          if (typeof item[key] !== "object" && item[key] !== null) {
            details.innerHTML += `<p><strong>${key}:</strong> ${item[key]}</p>`;
          }
        }
      }
    }
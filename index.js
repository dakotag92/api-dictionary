function search() {
  const word = document.getElementById("search-input").value;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayData(data[0]);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function displayData(data) {
  let html = `<h2>${data.word}</h2>`;
  for (let meaning of data.meanings) {
    html += `<h3>${meaning.partOfSpeech}</h3>`;
    for (let definition of meaning.definitions) {
      html += `<p>${definition.definition}</p>`;
      if (definition.example) {
        html += `<p><i>${definition.example}</i></p>`;
      }
      if (definition.synonyms && definition.synonyms.length > 0) {
        html += "<p>Synonyms: " + definition.synonyms.join(", ") + "</p>";
      }
      if (definition.antonyms && definition.antonyms.length > 0) {
        html += "<p>Antonyms: " + definition.antonyms.join(", ") + "</p>";
      }
    }
  }

  document.getElementById("result").innerHTML = html;
}

document.getElementById("search-btn").addEventListener("click", function () {
  search();
});

document
  .getElementById("search-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      search();
    }
  });

let darkModeToggle = document.querySelector(".switch input");

darkModeToggle.addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");
});

let serifButton = document.querySelector("#serif-font-btn");
let monoButton = document.querySelector("#mono-font-btn");

serifButton.addEventListener("click", function () {
  document.body.classList.remove("mono-font");
  document.body.classList.add("serif-font");
});

monoButton.addEventListener("click", function () {
  document.body.classList.remove("serif-font");
  document.body.classList.add("mono-font");
});

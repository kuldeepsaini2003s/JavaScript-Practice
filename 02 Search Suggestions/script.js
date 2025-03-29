const allSuggestions = [
  "JavaScript",
  "Python",
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "TypeScript",
  "HTML",
  "CSS",
  "Machine Learning",
  "Data Science",
  "Web Development",
  "Mobile Development",
  "Cloud Computing",
  "Artificial Intelligence",
];

const input = document.getElementById("search-input");
const suggestionsContainer = document.getElementById("suggestions-container");

input.addEventListener("input", function () {
  const searchItem = this.value.toLowerCase();
  const filteredSuggestion = allSuggestions.filter((suggestions) =>
    suggestions.toLocaleLowerCase().includes(searchItem)
  );  

  if (searchItem && filteredSuggestion.length > 0) {
    suggestionsContainer.innerHTML = filteredSuggestion
      .map(
        (suggestion) =>
          `
      <div
        class="suggestion-item"
        onclick="selectedSuggestion('${suggestion}')"
      >
        ${suggestion}
      </div>`
      )
      .join("");
    suggestionsContainer.classList.add("active");
  } else {
    suggestionsContainer.classList.remove("active");
  }
});

function selectedSuggestion(suggestion) {
  input.value = suggestion;
  suggestionsContainer.classList.remove("active");
}

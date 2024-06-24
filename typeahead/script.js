import SUGGESTIONS from "./data.js";

function getSuggestionsData({ searchTerm }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredSuggestions = searchTerm
        ? SUGGESTIONS.filter(suggestion => (suggestion.startsWith(searchTerm)))
        : SUGGESTIONS;

      resolve(filteredSuggestions)
    }, 2000)
  })
}

function showSearchBox({ element, onSearch }) {
  const searchBox = document.createElement('input');
  searchBox.type = 'search';
  searchBox.placeholder = 'Enter the keyword. Min 3 letters';
  searchBox.classList.add('searchBox');

  searchBox.addEventListener('keyup', onSearch);

  element.append(searchBox);
}

function showSuggestion({ suggestion, onSelect }) {
  const suggestionContainer = document.createElement('div');
  suggestionContainer.classList.add('suggestionContainer');
  suggestionContainer.innerHTML = suggestion;

  suggestionContainer.addEventListener('click', onSelect);

  return suggestionContainer;
}

function showSuggestions({ element, suggestions, onSelect }) {
  let suggestionsContainer = null;
  if (document.getElementsByClassName('suggestionsContainer').length > 0) {
    clearSuggestions();
    suggestionsContainer = document.getElementsByClassName('suggestionsContainer')[0];
  } else {
    suggestionsContainer = document.createElement('div');
    suggestionsContainer.classList.add('suggestionsContainer');
  }

  if (suggestions.length > 0) {
    suggestions.forEach((suggestion) => {
      const suggestionElement = showSuggestion({
        suggestion,
        onSelect
      })
  
      suggestionsContainer.append(suggestionElement)
    })
  } else {
      const suggestionElement = showSuggestion({
        suggestion: 'No result found',
        onSelect: () => {}
      })
  
      suggestionsContainer.append(suggestionElement)
  }


  element.append(suggestionsContainer);
}

function showSelectedSuggestion({ element, suggestion }) {
  let selectedSuggestionContainer = null;
  
  if (document.getElementsByClassName('selectedSuggestionContainer').length > 0) {
    selectedSuggestionContainer = document.getElementsByClassName('selectedSuggestionContainer')[0];
    selectedSuggestionContainer.innerHTML = '';
  } else {
    selectedSuggestionContainer = document.createElement('div');
    selectedSuggestionContainer.classList.add('selectedSuggestionContainer');
  }

  selectedSuggestionContainer.innerHTML = suggestion;

  element.append(selectedSuggestionContainer);
}


function destroySuggestions() {
  const suggestionsContainer = document.querySelector('.suggestionsContainer');
  suggestionsContainer.remove();
}

function clearSuggestions() {
  const suggestionsContainer = document.querySelector('.suggestionsContainer');
  suggestionsContainer.innerHTML = '';
}


function App() {
  let filteredSuggestions = [];

  const rootElement = document.getElementById("root");

  const searchContainer = document.createElement('div');
  searchContainer.classList.add('searchContainer');
  rootElement.append(searchContainer);

  const onSearch = async (e) => {
    const searchTerm = e.target.value;

    filteredSuggestions = await getSuggestionsData({ searchTerm });

    filteredSuggestions && showSuggestions({
      element: searchContainer,
      suggestions: filteredSuggestions,
      onSelect
    });
  }

  const onSelect = (e) => {
    destroySuggestions();

    showSelectedSuggestion({
      element: rootElement,
      suggestion: e.target.innerHTML
    });
  }

  showSearchBox({ element: searchContainer, onSearch });
}

App();
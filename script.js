const suggestions = ['but', 'whether', 'the', 'senpie', 'sender', 'grammatically', 'correct', 'isn’t', 'nearly', 'as', 'important', 'the', 'sentence', 'is', 'fun', 'funny','funky', 'or', 'beautiful'];

function showSearchBox({ element, onSearch }) {
  // create search box
  // trigger onSearch on every keyup
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
  // show the list down below the search box
  let suggestionsContainer = null;
  if(document.getElementsByClassName('suggestionsContainer').length > 0) {
    suggestionsContainer = document.getElementsByClassName('suggestionsContainer')[0];
    suggestionsContainer.innerHTML = '';
  } else {
    suggestionsContainer = document.createElement('div');
    suggestionsContainer.classList.add('suggestionsContainer');
  }

  suggestions.forEach((suggestion) => {
    const suggestionElement = showSuggestion({
      suggestion, 
      onSelect 
    })

    suggestionsContainer.append(suggestionElement)
  })

  element.append(suggestionsContainer);
}

function showSelectedSuggestion({ element, suggestion }) {
  let selectedSuggestionContainer = null;
  if(document.getElementsByClassName('selectedSuggestionContainer').length > 0) {
    selectedSuggestionContainer = document.getElementsByClassName('selectedSuggestionContainer')[0];
    selectedSuggestionContainer.innerHTML = '';
  } else {
    selectedSuggestionContainer = document.createElement('div');
    selectedSuggestionContainer.classList.add('selectedSuggestionContainer');
  }

  selectedSuggestionContainer.innerHTML = suggestion;
  
  element.append(selectedSuggestionContainer);
}


function App() {
  let filteredSuggestions = suggestions;

  const onSearch = (e) => {
    const searchTerm = e.target.value;

    filteredSuggestions = searchTerm 
      ? suggestions.filter(suggestion => (suggestion.startsWith(searchTerm))) 
      : suggestions;

    showSuggestions({ 
      element: searchContainer, 
      suggestions: filteredSuggestions, 
      onSelect 
    });
  }

  const onSelect = (e) => {
    const suggestionsContainer = document.getElementsByClassName('suggestionsContainer')[0];
    suggestionsContainer.remove();
    
    showSelectedSuggestion({ 
      element: rootElement, 
      suggestion: e.target.innerHTML 
    });
  }


  const rootElement = document.getElementById("root");

  const searchContainer = document.createElement('div');
  searchContainer.classList.add('searchContainer');
  rootElement.append(searchContainer);

  showSearchBox({ element: searchContainer, onSearch });
}

App();
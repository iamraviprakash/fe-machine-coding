
// Localstorage usage
function markUserFavourite({ data, element }) {
  let favouriteList = localStorage.getItem("favourite");
  favouriteList = favouriteList ? JSON.parse(favouriteList) : []
    
  if(favouriteList.includes(data.id)) {
    favouriteList = favouriteList.filter(id => id != data.id);
  } else {
    favouriteList.push(data.id);
  }

  localStorage.setItem("favourite", JSON.stringify(favouriteList))
  
  element.classList.toggle("favourite");
}

function getUserDOMElement({ data }) {
  const containerElement = document.createElement("div");
  containerElement.classList.add("container");

  const nameElement = document.createElement("div");
  const nameNode = document.createTextNode(data.name);
  nameElement.append(nameNode);
  containerElement.append(nameElement)


  const emailElement = document.createElement("div");
  emailElement.classList.add("email")
  const emailNode = document.createTextNode(data.email);
  emailElement.append(emailNode)
  containerElement.append(emailElement)

  containerElement.addEventListener('click', 
    () => markUserFavourite({ element: containerElement, data })
  )
  
  return containerElement;
}

function showUsersList({ data }) {  
  clearUsersList();

  const userListElement = document.getElementById("userList");
  const fragment = document.createDocumentFragment();

  let favouriteList = localStorage.getItem("favourite");
  favouriteList = favouriteList ? JSON.parse(favouriteList) : []
  
  data.map(user => {
    const userElement = getUserDOMElement({ data: user })

    if(favouriteList.includes(user.id)) {
      userElement.classList.add("favourite");
    }
    
    fragment.append(userElement)
  })

  userListElement.append(fragment)
}


function showPaginationControl({ element, onClickPrev, onClickNext}) {  
  const paginationElement = document.createElement("div");
  paginationElement.classList.add("paginationContainer")

  const prevButtonElement = document.createElement("button");
  prevButtonElement.innerHTML = "Prev";
  paginationElement.append(prevButtonElement);

  prevButtonElement.addEventListener('click', onClickPrev)

  
  const nextButtonElement = document.createElement("button");
  nextButtonElement.innerHTML = "Next";
  paginationElement.append(nextButtonElement);

  nextButtonElement.addEventListener('click', onClickNext)
  
  element.append(paginationElement);
}

function showSearchBar({ element, onSearch }) {
  const searchElement = document.createElement("input");
  searchElement.type = 'text';
  searchElement.classList.add("searchBar");
  searchElement.placeholder = 'Search by Name';

  searchElement.addEventListener('keyup', onSearch)

  element.append(searchElement);
}

function clearUsersList() {
  const userListElement = document.getElementById("userList");
  if(userListElement) {
    userListElement.innerHTML = "";
  }
}

// Search along with pagination
function showUserDashboard({ data, element }) {  
  let filteredData = data;
  
  const stepSize = 5;
  let prevCursor = 0;
  let nextCursor = Math.min(stepSize, filteredData.length);

  const onClickPrev = () => {
    if(prevCursor >= stepSize) {
      prevCursor -= stepSize;
      nextCursor -= stepSize;

      showUsersList({ 
        data: filteredData.slice(prevCursor, nextCursor) 
      })
    }
  }

  const onClickNext = () => {
    if(nextCursor <= (filteredData.length - stepSize -1)) {
      nextCursor += stepSize;
      prevCursor += stepSize;

      showUsersList({ 
        data: filteredData.slice(prevCursor, nextCursor) 
      })
    }
  }
    
  const onSearch = (e) => {
    const searchTerm = e.target.value;

    filteredData = searchTerm.length > 0 
      ? filteredData.filter(user => (user.name.toLowerCase().includes(searchTerm.toLowerCase()))) 
      : data;

    showUsersList({ 
      data: filteredData.slice(prevCursor, nextCursor) 
    })
  }

  showSearchBar({ 
    element, 
    onSearch: _.debounce(onSearch, 300) 
  });
  
  const userListElement = document.createElement("div");
  userListElement.id = "userList";
  element.append(userListElement);

  showUsersList({ 
    data: filteredData.slice(prevCursor, nextCursor) 
  })
  
  showPaginationControl({ element, onClickPrev, onClickNext })
}

// Fetch usage
async function App({ element }) {
  const response = await fetch("https://gorest.co.in/public/v2/users", {
    method: "GET", 
    headers: {}
  })

  if (response.ok) {
    const data = await response.json();
    showUserDashboard({ element, data })
  }
}

export default App;
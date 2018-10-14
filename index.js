'use strict';


const searchURL = 'https://api.github.com/search/users';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through the articles array, stopping at the max number of results
    for (let i = 0; i < responseJson.items.length; i++){
      // for each user in the items
      //array, add a list item to the results 
      //list with the username, link to user github page, author,
      //description, and image
      $('#results-list').append(
        `<li><img src='${responseJson.items[i].avatar_url}'>
        <h3><a href="${responseJson.items[i].html_url}">${responseJson.items[i].login}</a></h3>
        </li>`
      )};
    //display the results section  
    $('#results').removeClass('hidden');
  };
  

  function getNews(query) {
  const params = {
    q: query,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getNews(searchTerm);
  });
}

$(watchForm);
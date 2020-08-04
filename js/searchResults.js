
// create a class for a list of search results
function SearchResults(htmlElement) {
  const ul = document.createElement('ul');
  ul.className = 'list-group list-group-flush';
  htmlElement.appendChild(ul);
  
  this.renderResults = (companies) => {
    ul.innerHTML = '';
    companies.forEach(company => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      const img = document.createElement('img');
      img.src = company.profile.image;
      const a = document.createElement('a');
      a.href = `./company.html?symbol=${company.symbol}`;
      a.textContent = `${company.profile.companyName} (${company.symbol})`;
      const span = document.createElement('span');
      span.textContent = `${company.profile.changes}`;
      span.setAttribute('class', (span.textContent > 0)?'green':'red');
      li.appendChild(img);
      li.appendChild(a);
      li.appendChild(span);
      ul.appendChild(li);
      highlightSearch(input.value, a);
    });
  };

  //function highliting search results
  function highlightSearch (userInput, companyName) {
    const matchedWith = companyName.textContent;
    const regex = new RegExp(userInput, "gi");
    const highlitedResult = matchedWith.replace(regex, function (str) {
      return "<span style = 'background-color: #EEFD09;'>" + str + "</span>";
    });
    companyName.innerHTML = highlitedResult;
  };
};

export default SearchResults;

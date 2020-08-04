import { searchNasdaqWithProfile, searchInInternalServer } from "./api.js";
class SearchForm {
  constructor (htmlElement) {
    this.form = document.getElementById('form');
    this.init();
  }

  // adding event listener and debounce timeout
  init() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = event.target.querySelector('input[name=search]');
      this.searchCompanies(input.value);
    });

    let debounceTimeout;
      input.addEventListener('input', event => {
        if (debounceTimeout) clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          this.searchCompanies(event.target.value);
        }, 500);
      });
  };
  
  searchCompanies = async (searchTerm) => {
    showLoader();
    const companies = await searchInInternalServer(searchTerm);
    console.log(companies)
    this.onSearchDoneCallback(companies);
    console.log("SearchFrom: on search done callback is called")
    hideLoader();
  };

  onSearchDone(callback) {
    this.onSearchDoneCallback = callback;
    console.log("SearchForm: on search done callback is saved");
  }
};

function showLoader() {
  document.querySelector(".loader").classList.add("show");
};

function hideLoader() {
  document.querySelector(".loader").classList.remove("show");
};

export default SearchForm;



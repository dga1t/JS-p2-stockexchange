(() => {

  const urlParams = new URLSearchParams(window.location.search);
  const companyTicker = urlParams.get('symbol');
  const myApiKey = "ed93f3e229380c530b7a0e7663f86b99";

  const fetchCompProfile = async (url) => {
    const response = await fetch(url);
    const profile = await response.json();
    return profile[0];
  };

  const fetchPriceHistory = async (url) => {
    const response = await fetch(url);
    const history = await response.json();
    return history;
  };

  const showCompProfile = async () => {
    const image = document.getElementById('company-image');
    const name = document.getElementById('company-name');
    const description = document.getElementById('company-description');
    const price = document.getElementById('price');
    const change = document.getElementById('change');
    const profileUrl = `https://financialmodelingprep.com/api/v3/profile/${companyTicker}?apikey=${myApiKey}`;
    const data = await fetchCompProfile(profileUrl);
    image.src = data.image;
    name.textContent = data.companyName;
    description.textContent = data.description;
    price.textContent = `Stock price: $${data.price}`;
    change.textContent = `${data.changes}`;
    change.setAttribute('class', (change.textContent > 0)?'green':'red');
  };

  //show the historical data
  const showPriceChart = async () => { 
    const historyUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${companyTicker}?apikey=${myApiKey}`;
    const data = await fetchPriceHistory(historyUrl);

    const bigHistoryArray = data.historical.reverse();
    const prices = bigHistoryArray.map(days => days.close);
    const dates = bigHistoryArray.map(days => days.date);

    //create a chart
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'daily closing prices',
          data: prices,
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
    });
  };

  showCompProfile();
  showPriceChart();

})();

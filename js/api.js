
const apiKey = "ed93f3e229380c530b7a0e7663f86b99";
const baseUrl = 'https://financialmodelingprep.com/api/v3';

export async function searchNasdaq(searchTerm) {
  const response = await fetch(
    `${baseUrl}/search?query=${searchTerm}&limit=10&exchange=NASDAQ&apikey=${apiKey}`, {mode: 'no-cors'}
  );
  const data = await response.json();
  return data;
}

export async function fetchCompanyProfile(symbol) {
  const response = await fetch(
    `${baseUrl}/company/profile/${symbol}?apikey=${apiKey}`
  );
  const data = await response.json();
  return data;
}

export async function searchNasdaqWithProfile(searchTerm) {
  const companies = await searchNasdaq(searchTerm);
  const fetchCompaniesProfiles = companies.map(company => {
    return fetchCompanyProfile(company.symbol);
  });
  const companiesWithProfiles = await Promise.all(fetchCompaniesProfiles);
  return companiesWithProfiles;
}

export async function searchInInternalServer(searchTerm) {
  const response = await fetch(`http://localhost:3000/search?query=${searchTerm}`);
  const data = await response.json();
  return data;
}

const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const apiKey = 'ed93f3e229380c530b7a0e7663f86b99';
const baseUrl = 'https://financialmodelingprep.com/api/v3';

async function searchNasdaq(searchTerm) {
  const response = await fetch(
    `${baseUrl}/search?query=${searchTerm}&limit=10&exchange=NASDAQ&apikey=${apiKey}`
  );
  const data = await response.json();
  return data;
}

async function fetchCompanyProfile(symbol) {
  const response = await fetch(
    `${baseUrl}/company/profile/${symbol}?apikey=${apiKey}`
  );
  const data = await response.json();
  return data;
}

async function searchNasdaqWithProfile(searchTerm) {
  const companies = await searchNasdaq(searchTerm);
  const fetchCompaniesProfiles = companies.map(company => {
    return fetchCompanyProfile(company.symbol);
  });
  const companiesWithProfiles = await Promise.all(fetchCompaniesProfiles);
  return companiesWithProfiles;
}

app.get('/search', (req, res) => {
  const searchQuery = req.query.query;
  // do fetch to stocks api, and send the data to the response
  searchNasdaqWithProfile(searchQuery).then((companiesWithProfiles) => {
    res.send(companiesWithProfiles);
  });

  const mongoUrl = `mongodb://localhost:27017/`;

  MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;

    const mydb = db.db("searchstocks");
    const myobj = ;
     
    console.log(myobj);

    mydb.collection("search").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });

});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));





const apps = require('./apps');
const express = require('express');

const app = express();

app.get('/apps', (req, res) => {
  const validFilters = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];
  let filteredApps = apps;
  if (validFilters.includes(req.query.Genres)) {
    console.log(req.query);
    const genre = req.query.Genres.toLowerCase();
    filteredApps = apps.filter(app => {
      return app.Genres.split(';')[0].toLowerCase() === genre;
    });
  }
  const validSorts = ['Rating', 'App'];
  if (validSorts.includes(req.query.sort)) {
    const sort = req.query.sort;
    filteredApps = filteredApps.sort((app1, app2) => 
      app1[sort] > app2[sort] ? 1 : -1
    );
  }

  
  res.send(filteredApps);
});

app.listen(8000);
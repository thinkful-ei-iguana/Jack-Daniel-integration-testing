const apps = require('./apps');
const express = require('express');

const app = express();

app.get('/apps', (req, res) => {
  const validFilters = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];
  let filteredApps = apps;

  if (req.query.filter) {
    if (validFilters.includes(req.query.Genres)) {
      console.log(req.query);
      const genre = req.query.Genres.toLowerCase();
      filteredApps = apps.filter(app => {
        return app.Genres.split(';')[0].toLowerCase() === genre;
      });
    } else {
      res.status(400);
      res.send('filter is invalid');
    }
  }
  const validSorts = ['rating', 'app'];
  if (req.query.sort) {
    if (validSorts.includes(req.query.sort)) {
      const sort = req.query.sort;
      filteredApps = filteredApps.sort((app1, app2) => 
        app1[sort] > app2[sort] ? 1 : -1
      );
    } else {
      res.status(400);
      res.send('sort is invalid');
    }
  }
  res.send(filteredApps);
});

module.exports = app;

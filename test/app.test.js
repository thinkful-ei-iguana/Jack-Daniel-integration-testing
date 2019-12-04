const {expect} = require('chai');
const supertest = require('supertest');
const app = require('../index');

describe('app get request', () => {
  it('should return 200 status if /apps endpoint', () => {
    return supertest(app).get('/apps').expect(200);
  });
  it('should return 404 for any other endpoint', () => {
    return supertest(app).get('/poop').expect(404);
  });

  it('should return an array of app objects', () => {
    return supertest(app).get('/apps')
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        const app = res.body[0];
        expect(app).to.include.all.keys(
          'App', 'Category', 'Rating'
        );
      });
  });

  it('should be 400 if sort is incorrect', () => {
    return supertest(app).get('/apps').query({sort: 'lol'}).expect(400);
  });

  it('should sort apps in accordance to selected parameter', () => {
    const validSorts = ['rating', 'app'];
    validSorts.forEach(sort => {
      return supertest(app).get('/apps').query({sort: sort})
        .then(res => {
          for (let i=0; i <= res.body.length-2; ++i){
            const app1 = res.body[i];
            const app2 = res.body[i+1];
            expect(app1[sort] <= app2[sort]);
          }
        });
    });
  });

  it('should filter apps in accordance to selected paramter', () =>{
    const validFilters = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];
    validFilters.forEach(filter =>{
      return supertest(app).get('/apps').query({filter: filter})
        .then(res => {
          for( let i = 0; i <= res.body.length-1; i++){
            const item = res.body[i];
            expect(validFilters.includes(item[filter]));
          }
        });
    });
  })
});
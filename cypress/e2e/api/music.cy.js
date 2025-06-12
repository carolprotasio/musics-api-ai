import 'cypress-plugin-api';

describe('Musics API', () => {
  const api = 'http://localhost:3000/api/musics';
  let musicId = '';

  before(() => {
    cy.api({
      method: 'POST',
      url: 'http://localhost:3000/api/users/login',
      body: {
        email: 'carol@email.com',
        password: '123456'
      }
    }).then((res) => {
      Cypress.env('token', res.body.token);
    });
  });
     it('deve criar uma música da fixture', () => {
    cy.fixture('musics').then((musics) => {
      const music = musics[1]; 
      cy.api({
        method: 'POST',
        url: api,
        headers: {
          Authorization: `Bearer ${Cypress.env('token')}`
        },
        body: music
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body).to.have.property('_id');
        musicId = res.body._id;
      });
    });
  });
 
  it('deve criar uma nova música manualmente', () => {
    cy.api({
      method: 'POST',
      url: api,
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`
      },
      body: {
        title: 'Skyfall',
        singer: 'Adele',
        genre: 'Pop',
        year: 2012,
        description: 'Trilha sonora 007'
      }
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('_id');
      musicId = res.body._id;
    });
  });

  it('deve atualizar a música', () => {
    cy.api({
      method: 'PUT',
      url: `${api}/${musicId}`,
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`
      },
      body: {
        title: 'Skyfall Remix',
        singer: 'Adele',
        genre: 'Pop',
        year: 2013,
        description: 'Remix da trilha'
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('deve listar músicas', () => {
    cy.api('GET', api).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
    });
  });

  it('deve deletar a música', () => {
    cy.api({
      method: 'DELETE',
      url: `${api}/${musicId}`,
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});

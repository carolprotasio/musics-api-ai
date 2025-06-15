import 'cypress-plugin-api';

describe('Musics API', () => {
  const api = 'http://localhost:3000/api/musics';
  let musicId = '';

  beforeEach(() => {
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

  context('CRUD de músicas', () => {

    /* it('deve criar uma música usando a massa de dados da fixture', () => {
      cy.fixture('musics').then((musics) => {
        const music = musics[1];
        cy.api({
          method: 'POST',
          url: api,
          headers: {
            Authorization: `Bearer ${Cypress.env('token')}`
          },
          body: music,
          failOnStatusCode: false
        }).then((res) => {
          expect(res.status).to.eq(201);
          expect(res.body).to.have.property('_id');
          musicId = res.body._id;
        });
      });
    }); */

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
        },
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body).to.have.property('_id');
        musicId = res.body._id;
      });
    });

    it('deve atualizar informações de uma música', () => {
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
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });

    it('deve listar todas as músicas do usuário autenticado', () => {
      cy.api({
        method: 'GET',
        url: api,
        headers: {
          Authorization: `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('array');
      });
    });

    it('deve deletar uma música específica', () => {
      cy.api({
        method: 'DELETE',
        url: `${api}/${musicId}`,
        headers: {
          Authorization: `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });

    it('deve falhar ao tentar deletar uma música que não existe', () => {
      cy.api({
        method: 'DELETE',
        url: `${api}/1234567890abcdef12345678`,
        headers: {
          Authorization: `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eq(404);
        expect(res.body).to.have.property('message', 'Música não encontrada.');
      });
    });
  });

  context('Validações e autenticação', () => {

    it('deve falhar ao tentar criar uma música com título ausente', () => {
      cy.api({
        method: 'POST',
        url: api,
        headers: {
          Authorization: `Bearer ${Cypress.env('token')}`
        },
        body: {
          singer: 'Adele',
          genre: 'Pop',
          year: 2012,
          description: 'Trilha sonora 007'
        },
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body).to.have.property('message', 'Todos os campos são obrigatórios.');
      });
    });

    it('deve falhar ao tentar criar uma música sem o token de autenticação', () => {
      cy.fixture('musics').then((musics) => {
        const music = musics[3];
        cy.api({
          method: 'POST',
          url: api,
          body: music,
          failOnStatusCode: false
        }).then((res) => {
          expect(res.status).to.eq(401);
          expect(res.body).to.have.property('message', 'Token não fornecido.');
        });
      });
    });


    // Teste extra: campos vazios
    it('deve falhar ao tentar criar música com todos os campos vazios', () => {
      cy.api({
        method: 'POST',
        url: api,
        headers: {
          Authorization: `Bearer ${Cypress.env('token')}`
        },
        body: {
          title: '',
          singer: '',
          genre: '',
          year: '',
          description: ''
        },
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eq(400);
      });
    });

  });
});

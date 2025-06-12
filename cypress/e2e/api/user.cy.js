import 'cypress-plugin-api';

describe('Users API', () => {
  const api = 'http://localhost:3000/api/users';
  const uniqueEmail = `carol_${Date.now()}@teste.com`;

  it('deve registrar um novo usuário', () => {
    cy.api({
      method: 'POST',
      url: `${api}/register`,
      body: {
        name: 'Carol QA',
        email: uniqueEmail,
        password: '123456'
      }
    }).then((res) => {
      expect(res.status).to.eq(201);
    });
  });

  it('deve fazer login e salvar o token', () => {
    cy.api({
      method: 'POST',
      url: `${api}/login`,
      body: {
        email: uniqueEmail,
        password: '123456'
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('token');
      Cypress.env('token', res.body.token);
    });
  });
});

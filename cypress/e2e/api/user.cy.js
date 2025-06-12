import 'cypress-plugin-api';


describe('Users API', () => {
  const api = 'http://localhost:3000/api/users';
  const uniqueEmail = `carol_${Date.now()}@teste.com`;

  //Tests for register a user
  it('deve registrar um novo usuário com sucesso', () => {
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
      expect(res.body).to.have.property('message', 'Usuário criado com sucesso.');
    })
  })
  it('deve falhar ao registrar um usuário com email já existente', () => {
    cy.api({
      method: 'POST',
      url: `${api}/register`,
      body: {
        name: 'Carol QA',
        email: 'carol@email.com',
        password: '123456'
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
      
    });
  });
  it('deve falhar ao registrar com e-mail de formatação errada ', () => {
    cy.api({
      method: 'POST',
      url: `${api}/register`,
      body: {
        name: 'Carol QA',
        email: 'carol.teste.com',
        password: '123456'
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('message', 'Formato de e-mail inválido.');
      
    });
    
  });
  it('deve falhar ao tentar cadastrar usuario com os campos em branco', () => {
    cy.api({
      method: 'POST',
      url: `${api}/register`,
      body: {
        name: '',
        email: '',
        password: ''
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('message', 'Todos os campos são obrigatórios.');
    });
      
  });
  //Tests for login a user
  it('deve fazer login e salvar o token com sucesso', () => {
    cy.api({
      method: 'POST',
      url: `${api}/login`,
      failOnStatusCode: false,
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
  it('deve falhar ao tentar fazer o login com o e-mail não cadastrado', () => {
    cy.api({
      method: 'POST',
      url: `${api}/login`,
      failOnStatusCode: false,
      body: {
        email: 'notRegister@test.com',
        password:'123456'
      }
    }).then(res => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('message', 'Usuário não encontrado.');
    })
    
  });
  it('deve falhar ao tentar fazer login com os campos vazios', () => {
    cy.api({
      method: 'POST',
      url: `${api}/login`,
      failOnStatusCode: false,
      body: {
        emai: " ",
        password: " "        
      }
    }).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body).to.have.property('message', 'Email e senha são obrigatórios.');
    })
  });
  
});

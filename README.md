<img src="https://github.com/carolprotasio/musics-api-ai/blob/main/src/assets/musicApiImg.jpg" alt="swagger" width="1000"/> 

# 🎵 music-api-ai

Este projeto é uma **API RESTful para um sistema de cadastro e gerenciamento de músicas**, desenvolvida com foco em estudos e aprendizado em automação de testes, integração com MongoDB e uso de ferramentas de apoio à documentação, como Swagger.  
A proposta foi elaborada com o auxílio de **Inteligência Artificial**, explorando boas práticas de organização de código e testes automatizados.

---

## 🛠 Tecnologias Utilizadas

- Node.js – Ambiente de execução para JavaScript no servidor
- Express.js – Framework para criação de rotas e APIs REST
- MongoDB (local) – Banco de dados NoSQL orientado a documentos
- Mongoose – ODM (Object Data Modeling) para interação com o MongoDB
- dotenv – Gerenciamento de variáveis de ambiente
- bcryptjs – Criptografia de senhas dos usuários
- jsonwebtoken (JWT) – Autenticação baseada em tokens
- validator – Validação de e-mails e strings no backend
- Swagger – Geração automática de documentação interativa da API
- Cypress – Testes end-to-end para validação de APIs
- @bahmutov/cy-api – Plugin Cypress para facilitar requisições HTTP em testes
- nodemon – Monitoramento de alterações no código durante o desenvolvimento
- Postman – Testes manuais e exploratórios dos endpoints da API

---

## 🤖 Prompt Utilizado com AI

> "Crie uma API RESTful em Node.js para um sistema de cadastro de músicas. A API deve incluir as seguintes funcionalidades:
> - Cadastro de usuário: Permita que os usuários se cadastrem, informando name / email / password - Todos os campos são obrigatórios.
> - Login de usuário: Permita que os usuários cadastrados façam o login informando email / password - Todos os campos são obrigatórios.
> - Cadastro de músicas por usuários cadastrados: Permita que os usuários cadastrem   músicas informando  singer, title, year, genre, e description - Todos os campos são obrigatórios.
> - Listagem das músicas: Implemente um endpoint para listar todos os  músicas  cadastrados, retornando todas as informações das  músicas   .
> - Consulta de   músicas por ID: Crie um endpoint que permita consultar um filme específico usando seu ID.
> - Atualização de  músicas por ID: Crie um endpoint que permita alterar informações de um filme específico usando seu ID.
> - Remoção de músicas : Implemente um endpoint para deletar um filme do sistema utilizando seu ID.
> - Banco de Dados: Utilize o MongoDB como banco de dados.

> Requisitos técnicos:
> - Utilize Express.js para gerenciar as rotas da API.
> - Use Mongoose para a modelagem dos dados e integração com o MongoDB.
> - Inclua tratamento de erros e validações adequadas para todos os endpoints.
> - Adicione comentários no código para explicar as principais partes da implementação."

---

## ⚙️ O que foi feito no Backend
- 📁 Estrutura modularizada:
  - **Routes**: Responsáveis por definir os caminhos da API (endpoints) e delegar a lógica para os controllers.
  - **Controllers**: Executam a lógica principal de cada funcionalidade (como registrar usuário, criar música etc).
  - **Models**: Estrutura os dados com schemas do Mongoose e define os campos obrigatórios.
  - **Middlewares**: Componentes reutilizáveis que controlam o acesso às rotas (como autenticação JWT).
- 👤 Funcionalidades de autenticação:
  - Registro de usuário com validação de e-mail
  - Login seguro com geração de token JWT
- 🎵 CRUD completo de músicas:
  - Associado ao usuário autenticado
  - Operações de criação, leitura, atualização e exclusão
- 🔐 Proteção das rotas com middleware de autenticação
- 📄 Documentação interativa da API com Swagger


---

## 📄Swagger:
A documentação da API foi gerada com **Swagger**, uma ferramenta que cria uma interface visual interativa onde é possível testar os endpoints, visualizar parâmetros de entrada e respostas esperadas.  
Acesse em: `http://localhost:3000/api-docs`
<img src="https://github.com/carolprotasio/musics-api-ai/blob/main/src/assets/swagger.png" alt="swagger" width="700"/>  

## 🧪 Testando a API com Postman
Utilizei o **Postman** durante a fase inicial do desenvolvimento para testar manualmente os endpoints da API. 
Isso permitiu validar o comportamento das rotas, testar os retornos HTTP e garantir a consistência dos dados antes de automatizar os testes com o Cypress.

<img src="https://github.com/carolprotasio/musics-api-ai/blob/main/src/assets/postman.png" alt="swagger" width="700"/>  


## 🧪 Testando a API com Cypress

O projeto utiliza Cypress para automatizar testes de API, cobrindo os fluxos de autenticação e CRUD de músicas. Os testes são escritos diretamente em JavaScript e simulam requisições reais à API.

```bash
# Abrir a interface do Cypress
npm run cypress:open

# Executar todos os testes no terminal
npm run test
```
## 🔍 Cenários e Casos de Teste
👤 User - Register

✅ deve registrar um novo usuário com sucesso

✅ deve falhar ao registrar um usuário com email já existente

✅ deve falhar ao registrar com e-mail de formatação errada

✅ deve falhar ao tentar cadastrar usuario com os campos em branco

👤 User - Login

✅ deve fazer login e salvar o token com sucesso

✅ deve falhar ao tentar fazer o login com o e-mail não cadastrado

✅ deve falhar ao tentar fazer login com os campos vazios

✅ deve falhar ao tentar fazer o login com a senha incorreta

🎵 Musics

✅ Deve criar uma nova música (com token)

✅ Não deve criar música sem token de autenticação

✅ Deve listar todas as músicas do usuário autenticado

✅ Deve atualizar informações de uma música

✅ Deve deletar uma música específica

## 🚀 Como Instalar e Rodar o Projeto
Pré-requisitos:
Node.js

MongoDB rodando localmente  
> Caso ainda não tenha o MongoDB instalado, você pode baixar o Community Server pelo site oficial: https://www.mongodb.com/try/download/community  
> Após a instalação, certifique-se de iniciar o serviço do MongoDB e manter a URI padrão: `mongodb://localhost:27017/musicdb`


Instalação
```bash
# Clone o repositório
git clone https://github.com/carolprotasio/music-api-ai.git
cd music-api-ai

# Instale as dependências
npm install

# Crie um arquivo .env na raiz do projeto com o conteúdo:
MONGO_URI=mongodb://localhost:27017/musicdb
JWT_SECRET=sua_chave_secreta

# Rode o servidor
npm run dev
```
> ### A API estará disponível em: http://localhost:3000
> ### A documentação Swagger estará em: http://localhost:3000/api-docs

✅ Conclusão
Este projeto consolidou meus conhecimentos em desenvolvimento e testes de APIs RESTful, com foco em boas práticas de autenticação, modelagem de dados e automação de testes.  
Foi desenvolvido como parte do meu portfólio de QA, com o apoio de Inteligência Artificial e ferramentas modernas de qualidade de software.


🤍 Feito com dedicação por [**Carol Protasio**](https://www.linkedin.com/in/carol-protasio/)

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/api',
    experimentalRunAllSpecs: true,
    defaultCommandTimeout: 8000, // ⬅ aumenta para 8 segundos
    requestTimeout: 10000,       // ⬅ tempo de timeout de requisições
    responseTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

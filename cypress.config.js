const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

      // E2E specific settings will go here --> Buraya specPattern veya baseUrl gibi e2e ayarları eklenebilir.
    baseUrl: "https://apilayer.net/api",
  },

  // Environment variables: same level as e2e settings.
  env: {

    MAILBOXLAYER_API_KEY: "46e806705e800013f33942cbded262c2"
  },

});

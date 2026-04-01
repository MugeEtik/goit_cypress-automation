const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

// --- SENIOR TOUCH: dotenv ÇAĞRISI ---
require('dotenv').config();

module.exports = defineConfig({
  projectId: 'shfju6',                              // Mevcut Project ID'si --- Root Level

  e2e: {                                            // E2E Level starts
    baseUrl: "https://www.edu.goit.global/account/login",    // main base url    
    
    // Hem BDD (.feature) hem de klasik E2E (.cy.js) testlerini görmesi için:
    specPattern: ["**/*.feature", "cypress/e2e/**/*.cy.js"],

    // Site yavaşsa, bekleme süresini artırabiliriz:
    defaultCommandTimeout: 10000, 
    
    // Ekran çözünürlüğünü standart bir hale getirelim:
    viewportWidth: 1280,
    viewportHeight: 720,

    async setupNodeEvents(on, config) {
      // Cucumber eklentisini sisteme tanıtıyoruz
      await addCucumberPreprocessorPlugin(on, config);

      // esbuild motorunu (bundler) devreye alıyoruz
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );

      // Konfigürasyonu geri döndürmek kritik ("API Contract")
      return config;
    },
  },

// Environment variables: same level as e2e settings. ARTIK BURASI TERTEMİZ: Sırlar Dışarıda.
  env: {                                        //  --- Root Level
    API_URL_HTTPBIN: "https://httpbin.org",
    API_URL_MAILBOX: process.env.API_URL_MAILBOX,
    MAILBOXLAYER_API_KEY: process.env.MAILBOXLAYER_API_KEY
  },

});


Cypress.Commands.add('baseUrl', () => {
        return Cypress.config('baseUrl'); // Ensure you set this in your Cypress configuration file
});

Cypress.Commands.add('getApiKey', () => {
        return Cypress.env('MAILBOXLAYER_API_KEY'); // Ensure you set this environment variable in your Cypress configuration 
});
           
//  where to add the base url andapi-key in cypress configuration file on code?
    /* 
        ->  Add the API key in your Cypress configuration file (cypress.config.js).  
    */

    

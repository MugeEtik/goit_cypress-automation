import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../pages/BDDLogin-Pages.js";
// Critical step: Create an instance of the LoginPage class to access its methods and properties
const loginPage = new LoginPage(); // Create an instance of the LoginPage class to access its methods and properties

Given("I am on the {string} page", (pageName) => {
 /* cy.visit("https://www.edu.goit.global/account/login");
});
*/
  loginPage.navigateURL(pageName); // Using the method from the LoginPage class to navigate to the specified page
});

When("I enter valid credentials {string} and {string} and click the login button", (email, password) => {
 /* cy.get("#user_email").type("          "); // Replace with valid email
    cy.get("#user_password").type("          "); // Replace with valid password
    cy.get(".next-1jphuq5").click(); // Click the login button
});
*/
  loginPage.login(email, password); // Using the login method from the LoginPage class with valid credentials
});

Then("I should be redirected to the homepage", () => {
  // Add assertions to verify successful login, e.g., checking for a specific element on the homepage
 /* cy.url().should("include", "/homepage"); 
});  
*/
  loginPage.verifyHomePage(); // Using the method from the LoginPage class to verify successful login by checking the URL and other potential indicators of being on the homepage/dashboard
});

When("I enter invalid credentials {string} and {string}", (email, password) => {
 /* cy.get("#user_email").type("deneme@homecom"); // Replace with invalid email     
  cy.get("#user_password").type("ajaja156"); // Replace with invalid password
});
*/
  loginPage.login(email, password); // Using the login method from the LoginPage class with invalid credentials
});

Then("I should see an error message {string}", (expectedMessage) => {
  // Add assertions to verify the presence of an error message, e.g., checking for a specific error element
 /* cy.get(".next-19idv66").should("be.visible"); // Example assertion for error message visibility
});
*/

// Virgülle ayrılmış mesajları parçalara bölüyoruz
  const messagesArray = expectedMessage.split(" , ");

  messagesArray.forEach((msg) => {
    // Her bir mesajın DOM'da olup olmadığını tek tek kontrol ediyoruz
    loginPage.verifyErrorMessage(msg.trim());   // Using the method from the LoginPage class to verify the error message text (Update the expected message as needed)
  });
});

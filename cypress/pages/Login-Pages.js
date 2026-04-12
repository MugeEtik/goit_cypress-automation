export class LoginPage {

// 1. LOCATORS (Using Getter methods for better readability and maintenance - high-level abstraction)

  get URL() { return "https://www.edu.goit.global/account/login"; }
  get titleField() {return cy.get(".next-10stgr7 > .next-c1vj7d"); }
  get emailField() {return cy.get("#user_email"); }
  get passwordField() {return cy.get("#user_password"); }
  get loginButton() {return cy.get(".next-1jphuq5"); }
  get forgotPasswordLink() {return cy.get(".next-1f1fv1i > .next-1qrvie4"); }

    /*New Locator for error messages (Update the class if it differs in your LMS)*/
  get errorMessage() { return cy.get(".next-19idv66"); }

// 2. ACTIONS (Methods to perform flows)

  navigateURL() {
    // Navigates to the GoIT LMS login page
    cy.visit(this.URL); }

  login(email, password) {
    // Standard login flow
    this.emailField.clear().type(email); // Clear before typing for reliability
    this.passwordField.clear().type(password);
    this.loginButton.click();
  }

// 3. ASSERTIONS (Methods to perform checks/assertions-The Verification Layer)

  verifyTitle() {
    // Verifies title visibility and exact text content
    this.titleField.should("be.visible").and("have.text", "Login"); }

  verifyInputs() {
    // Verifies that credentials fields are visible
    this.emailField.should("be.visible");
    this.passwordField.should("be.visible"); }

  verifyLoginButton() {
    // Verifies login button state and labeling
    this.loginButton.should("be.visible").and("have.text", "Log in"); }

  verifyForgotPasswordLink() {
    // Verifies the link for password recovery
    this.forgotPasswordLink.should("be.visible").and("have.text", "I can't remember the password"); }

//OR; 

  verifyPageElements() {
    // Verifies all critical UI components are visible and correct
    this.titleField.should("be.visible").and("have.text", "Login");
    this.emailField.should("be.visible");
    this.passwordField.should("be.visible");
    this.loginButton.should("be.visible").and("have.text", "Log in");
    this.forgotPasswordLink.should("be.visible").and("have.text", "I can't remember the password");
  }

  verifyErrorMessage(expectedMessage) {
    this.errorMessage.should("be.visible").and("have.text", expectedMessage); }

  }

// Legacy approach with hardcoded locators is replaced by modern Getter methods for better maintainability.
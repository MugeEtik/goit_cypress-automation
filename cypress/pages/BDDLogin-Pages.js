export class LoginPage {

// 1. LOCATORS (Using Getter methods for better readability and maintenance - high-level abstraction)

  pageUrls = {
    "login": "https://www.edu.goit.global/account/login",
    "homepage": "https://www.edu.goit.global/homepage", // Update with the actual URL of the homepage/dashboard after login
  };
  get titleField() {return cy.get(".next-10stgr7 > .next-c1vj7d"); }
  get emailField() {return cy.get("#user_email"); }
  get passwordField() {return cy.get("#user_password"); }
  get loginButton() {return cy.get(".next-1jphuq5"); }
  get forgotPasswordLink() {return cy.get(".next-1f1fv1i > .next-1qrvie4"); }

// 2. ACTIONS (Methods to perform flows)

  navigateURL(pageName) {
    // Navigates to the specified page
    const targetUrl = this.pageUrls[pageName.toLowerCase()]; // Get the URL from the pageUrls object based on the provided page name
    
    if (targetUrl) {
      cy.visit(targetUrl); // Navigate to the target URL
    } 
    else {  
      throw new Error(`Page "${pageName}" not found in pageUrls. Please check the page name and update the pageUrls object.`);
    }
  }

  login(email, password) {
    // Standard login flow
    this.emailField.clear(); // Clear before typing for reliability
    if (email) this.emailField.type(email); // Sadece email varsa type yap
    this.passwordField.clear(); // Clear before typing for reliability
    if (password) this.passwordField.type(password); // Sadece password varsa type yap
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
    cy.contains(expectedMessage).should("be.visible"); 
  }

  verifyHomePage() {
    // Verifies successful login by checking for a specific element on the dashboard (Update selector as needed)
    cy.url().should("include", "/homepage"); // Update the URL fragment as per your LMS dashboard
    // Additional checks can be added here, e.g., checking for a welcome message or user profile icon 
  }
}

export class HomePage {
// 1. LOCATORS (Getter methods for centralized element management)
  get URL() { return "https://www.edu.goit.global/homepage";}

    // Locator for the main heading on the dashboard
  get helloHeader() { return cy.get('.next-1ib1no1'); }

   // Locator for the footer to verify scroll action
  get pageBottom() { return cy.get('#go-to-the-course-homepage-widget > .next-1jphuq5'); }
  
   // The burger menu button on the top right
  get menuButton() {return cy.get('#open-navigation-menu-mobile');}

   // The specific 'Log out' option inside the menu
  get logoutButton() { return cy.contains('Log out');}

// 2. ACTIONS & ASSERTIONS
  verifyHomePage() {
    // Assertion 1: Verify URL contains homepage
    cy.url().should("include", "homepage");
    // Assertion 2: Verify dashboard header is visible
    this.helloHeader.should("be.visible").and("contain.text", "Hello");
  }

  scrollToBottom() {
    // Performs a scroll action to the bottom of the page
    cy.scrollTo("bottom");
    // Verification after scroll
    this.pageBottom.should("be.visible").and("contain.text", "Go to the course");
  }

  logout() {
    // Triggers the logout sequence
    this.menuButton.click();
    this.logoutButton.click();
  }
}
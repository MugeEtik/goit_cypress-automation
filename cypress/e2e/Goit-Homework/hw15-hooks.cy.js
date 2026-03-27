import { LoginPage } from "../../pages/Login";
import { HomePage } from "../../pages/HomePage";

describe("HOOKS)", () => {

// Before : Runs once before all tests in the block
before(() => {
  // Setup code that needs to run once before all tests, e.g., database seeding, global configurations
  cy.log("Running setup before all tests");
});

// Before Each : Runs before each test in the block
beforeEach(() => {
  // Code to run before each test, e.g., navigating to a specific page, resetting state
  cy.log("Running setup before each test");
});             

// After : Runs once after all tests in the block
after(() => {
  // Cleanup code that needs to run once after all tests, e.g., closing database connections, final reporting
  cy.log("Running final cleanup after all tests");
});    

// After Each : Runs after each test in the block
afterEach(() => {
  // Code to run after each test, e.g., clearing cookies, resetting test data
  cy.log("Running cleanup after each test");
});         



});
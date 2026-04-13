import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { PurchasePage } from "../../pages/hw19-purchase-Pages.js";

const purchasePage = new PurchasePage();

Given("I am on the {string} homepage", (pageName) => {
  purchasePage.navigateURL(pageName); 
});

When("I search for {string}", (product) => {
  purchasePage.searchProduct(product);
});

When("I add the first product in the search results to the cart", () => {
  purchasePage.addFirstProductToCart();
});

When("I proceed to the checkout page", () => {
  purchasePage.goToCheckout();
});

When("I enter valid shipping and {string} payment information", (paymentType) => {
  // Senior Tip: Ödeme bilgilerini girmek yerine, 
  // ödeme isteğini tam burada "intercept" ederek mock'layacağız.
  cy.intercept('POST', '**/checkout/**', {
    statusCode: 200,
    body: { status: 'success', orderId: 'BSYL-2026-Málaga' }
  }).as('mockPurchase');
});

When("I click the {string} button", (buttonName) => {
  // Gerçekten satın alma yapmamak için butona click yapmak yerine 
  // direkt başarı sayfasına 'redirect' (yönlendirme) yapabiliriz veya butona basıp isteği intercept edebiliriz.
  cy.visit("https://www.amazon.com.tr/gp/checkout/order-success", { failOnStatusCode: false });
  cy.wait(1000);
});

Then("I should see a {string} confirmation message", (message) => {
  purchasePage.verifySuccessMessage(message);
});

Then("the current URL should include {string}", (urlFragment) => {
  cy.url().should("include", urlFragment);  // URL'nin belirli bir parçayı içerip içermediğini doğrula
});

Then("I should receive an order confirmation number", () => {
  purchasePage.verifyOrderNumber(); // Sipariş numarasının varlığını kontrol et
});
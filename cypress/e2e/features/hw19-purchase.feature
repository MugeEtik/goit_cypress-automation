@e-commerce @smoke @regression @critical
Feature: Product Purchase Flow
  As a customer,
  I want to be able to search for a product, add it to my cart, and complete the purchase
  So that I can receive my items successfully.

  Background:
    Given I am on the "Amazon" homepage

  @tc01 @positive @ui
  Scenario: Successful product purchase using a test payment method
    When I search for "kahve çekirdeği"
    And I add the first product in the search results to the cart
    And I proceed to the checkout page
    And I enter valid shipping and "test" payment information
    And I click the "Complete Purchase" button
    Then I should see a "Thank you for your purchase!" confirmation message
    And the current URL should include "/order-success"
    And I should receive an order confirmation number

    
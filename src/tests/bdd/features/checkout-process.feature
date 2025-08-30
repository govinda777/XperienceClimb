# language: en
Feature: Checkout Process
  As a customer
  I want to complete my purchase
  So that I can secure my climbing experience booking

  Background:
    Given I am authenticated
    And I have items in my cart

  Scenario: Complete checkout with PIX payment
    Given I am on the checkout page
    When I select PIX as payment method
    And I fill in my contact information
    And I confirm my order
    Then I should see the PIX payment details
    And I should receive a confirmation email

  Scenario: Complete checkout with crypto payment
    Given I am on the checkout page
    And I have a connected crypto wallet
    When I select crypto payment
    And I confirm the transaction
    Then the payment should be processed
    And I should see a success confirmation

  Scenario: Apply discount coupon
    Given I am on the checkout page
    And I have a valid coupon "CLIMB20"
    When I enter the coupon code
    And I apply the coupon
    Then the total price should be reduced by 20%
    And I should see the discount applied

  Scenario: Checkout validation errors
    Given I am on the checkout page
    When I try to complete checkout without filling required fields
    Then I should see validation error messages
    And the checkout should not proceed

  Scenario: Order confirmation details
    Given I have completed a successful checkout
    When I view my order confirmation
    Then I should see my order details
    And I should see the booking reference number
    And I should see the activity date and time
    And I should see participant information

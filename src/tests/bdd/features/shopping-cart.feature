# language: en
Feature: Shopping Cart Management
  As a customer
  I want to manage items in my shopping cart
  So that I can book multiple packages or adjust my selection

  Background:
    Given I am on the XperienceClimb homepage
    And there are available packages

  Scenario: Add package to cart
    Given I am viewing a package "Basic Climbing Experience"
    When I click "Add to Cart"
    And I fill in participant details
    Then the package should be added to my cart
    And the cart counter should show 1 item

  Scenario: View cart contents
    Given I have items in my cart
    When I click on the cart icon
    Then I should see a list of items in my cart
    And I should see the total price

  Scenario: Update item quantity in cart
    Given I have "Basic Climbing Experience" in my cart with quantity 1
    When I increase the quantity to 2
    Then the cart should show 2 items
    And the total price should be updated accordingly

  Scenario: Remove item from cart
    Given I have "Basic Climbing Experience" in my cart
    When I click remove on that item
    Then the item should be removed from my cart
    And the cart counter should decrease

  Scenario: Cart persists across sessions
    Given I have items in my cart
    When I refresh the page
    Then my cart should still contain the same items

  Scenario: Clear entire cart
    Given I have multiple items in my cart
    When I click "Clear Cart"
    Then my cart should be empty
    And the cart counter should show 0

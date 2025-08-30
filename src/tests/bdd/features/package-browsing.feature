# language: en
Feature: Package Browsing
  As a potential customer
  I want to browse available climbing packages
  So that I can choose the best option for my experience level

  Background:
    Given I am on the XperienceClimb homepage

  Scenario: Display available packages
    When the page loads
    Then I should see a list of climbing packages
    And each package should display its name, price, and description

  Scenario: Filter packages by experience level
    Given there are packages for different experience levels
    When I filter by "beginner" level
    Then I should only see packages suitable for beginners

  Scenario: View package details
    Given there are available packages
    When I click on a package
    Then I should see detailed information about the package
    And I should see the package availability
    And I should see safety requirements

  Scenario: Check package availability
    Given I am viewing a specific package
    When I select a date for the activity
    Then I should see if the package is available on that date
    And I should see how many spots are left

  Scenario: Package pricing is displayed correctly
    Given there are packages with different prices
    When I view the packages
    Then each package should show its price in Brazilian Reais
    And the price should include all fees and taxes

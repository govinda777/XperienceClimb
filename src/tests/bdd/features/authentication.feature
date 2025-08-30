# language: en
Feature: User Authentication
  As a visitor to XperienceClimb
  I want to be able to authenticate
  So that I can book climbing packages

  Background:
    Given I am on the XperienceClimb homepage

  Scenario: User can see login button when not authenticated
    Given I am not authenticated
    When I look at the navigation
    Then I should see a login button

  Scenario: User can login successfully
    Given I am not authenticated
    When I click the login button
    And I complete the authentication process
    Then I should be logged in
    And I should see my user profile information

  Scenario: Authenticated user can logout
    Given I am authenticated as "user@example.com"
    When I click the logout button
    Then I should be logged out
    And I should see the login button again

  Scenario: User preferences are persisted after login
    Given I am authenticated as "user@example.com"
    When I update my experience level to "advanced"
    And I logout and login again
    Then my experience level should still be "advanced"

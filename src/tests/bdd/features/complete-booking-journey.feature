# language: en
Feature: Complete Booking Journey
  As a climbing enthusiast
  I want to complete the entire booking process
  So that I can secure my climbing adventure from start to finish

  Background:
    Given I am on the XperienceClimb homepage
    And there are available climbing packages

  Scenario: End-to-end booking with PIX payment
    Given I am not authenticated
    When I browse available packages
    And I select the "Escalada Iniciante" package
    And I add it to my cart
    And I proceed to checkout
    Then I should be prompted to login
    When I complete the authentication process
    And I fill in participant details:
      | name           | age | experience  | health_declaration |
      | João Silva     | 28  | beginner    | true              |
    And I select the available climbing date
    And I choose PIX as payment method
    And I confirm my booking
    Then I should see PIX payment instructions
    And I should receive a booking confirmation email
    And the order should be saved with status "pending_payment"

  Scenario: Group booking with multiple participants
    Given I am authenticated as "group-leader@example.com"
    When I select the "Escalada em Grupo" package
    And I set quantity to 3
    And I add it to my cart
    And I proceed to checkout
    And I fill in participant details for all members:
      | name           | age | experience    | health_declaration |
      | Maria Santos   | 25  | intermediate  | true              |
      | Pedro Costa    | 30  | beginner      | true              |
      | Ana Oliveira   | 27  | advanced      | true              |
    And I select the available climbing date
    And I add special requests "Vegetarian lunch for Maria"
    And I choose MercadoPago as payment method
    And I confirm my booking
    Then I should be redirected to MercadoPago checkout
    And the total should reflect 3 participants
    And all participant details should be saved

  Scenario: Booking with discount coupon
    Given I am authenticated as "regular-customer@example.com"
    And I have a valid coupon "CLIMB20" with 20% discount
    When I select the "Escalada Avançada" package
    And I add it to my cart
    And I proceed to checkout
    And I fill in participant details:
      | name           | age | experience  | health_declaration |
      | Carlos Mendes  | 35  | advanced    | true              |
    And I apply coupon "CLIMB20"
    Then the discount should be applied correctly
    And the final price should be 20% less than original
    When I select the available climbing date
    And I choose crypto payment with Bitcoin
    And I confirm my booking
    Then I should see Bitcoin payment instructions
    And the coupon should be marked as used

  Scenario: Booking cancellation and refund
    Given I have an existing booking "BOOK-12345"
    And the booking is confirmed and paid
    And the climbing date is more than 48 hours away
    When I request to cancel my booking
    And I provide cancellation reason "Family emergency"
    Then I should see cancellation options
    When I confirm the cancellation
    Then the booking status should change to "cancelled"
    And I should receive a cancellation confirmation
    And a refund should be initiated

  Scenario: Weather-dependent booking rescheduling
    Given I have a confirmed booking for a date 5 days from now
    And the weather forecast shows unsafe conditions
    When the system sends a weather alert
    Then I should receive a rescheduling notification
    When I choose to reschedule to a date 12 days from now
    And I confirm the new date
    Then my booking should be updated with the new date
    And I should receive updated booking confirmation

  Scenario: Last-minute booking availability
    Given today is the current date
    And I want to book for tomorrow
    When I check package availability
    Then I should see real-time availability
    And I should see any last-minute restrictions
    When I proceed with same-day booking
    Then I should see expedited confirmation process
    And I should receive immediate WhatsApp confirmation

  Scenario: Booking modification after confirmation
    Given I have a confirmed booking "BOOK-67890"
    And the climbing date is more than 7 days away
    When I request to modify my booking
    And I want to change from "Escalada Iniciante" to "Escalada Intermediária"
    Then I should see the price difference
    When I confirm the modification and pay the difference
    Then my booking should be updated
    And I should receive updated confirmation details

  Scenario: Group leader managing team bookings
    Given I am authenticated as a group leader
    And I have admin rights for my climbing team
    When I create a team booking for 8 people
    And I assign different packages to different skill levels:
      | participant    | package              | experience    |
      | Leader (me)    | Escalada Avançada    | advanced     |
      | Member 1-3     | Escalada Intermediária| intermediate |
      | Member 4-8     | Escalada Iniciante   | beginner     |
    And I set a group climbing date
    And I choose corporate payment method
    Then all bookings should be linked as a group
    And I should receive a consolidated invoice
    And each participant should receive individual confirmations

  Scenario: International customer booking
    Given I am an international customer from "United States"
    And my preferred language is "English"
    When I browse packages
    Then I should see prices in USD equivalent
    And all content should be in English
    When I proceed with booking
    And I fill in international participant details:
      | name          | age | passport_number | nationality |
      | John Smith    | 32  | US123456789    | American    |
    And I provide international contact information
    And I choose international payment method
    Then I should see additional requirements for international visitors
    And I should receive booking confirmation in English
    And the system should handle timezone differences correctly

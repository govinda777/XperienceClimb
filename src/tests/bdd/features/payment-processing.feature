# language: en
Feature: Payment Processing
  As a customer
  I want to pay for my climbing experience using various payment methods
  So that I can complete my booking securely and conveniently

  Background:
    Given I am authenticated
    And I have a climbing package in my cart
    And I have filled in all required participant details

  Scenario Outline: Successful payment with different methods
    Given I am on the payment page
    When I select "<payment_method>" as my payment method
    And I complete the payment process
    Then the payment should be processed successfully
    And I should receive a payment confirmation
    And my booking status should be "confirmed"
    And I should receive booking confirmation details

    Examples:
      | payment_method |
      | PIX           |
      | MercadoPago   |
      | Bitcoin       |
      | USDT          |
      | GitHub        |

  Scenario: PIX payment flow
    Given I am on the payment page
    When I select PIX as payment method
    Then I should see PIX payment instructions
    And I should see a QR code for payment
    And I should see the PIX key for manual transfer
    And I should see payment expiration time (30 minutes)
    When I complete the PIX payment
    Then the system should detect the payment automatically
    And my booking should be confirmed within 5 minutes

  Scenario: Credit card payment via MercadoPago
    Given I am on the payment page
    When I select MercadoPago as payment method
    Then I should be redirected to MercadoPago checkout
    When I enter valid credit card details:
      | card_number      | expiry | cvv | holder_name  |
      | 4111111111111111 | 12/25  | 123 | João Silva   |
    And I confirm the payment
    Then the payment should be processed immediately
    And I should be redirected back to confirmation page
    And I should see successful payment confirmation

  Scenario: Cryptocurrency payment with Bitcoin
    Given I am on the payment page
    And I have a Bitcoin wallet connected
    When I select Bitcoin as payment method
    Then I should see the Bitcoin payment address
    And I should see the exact amount to transfer
    And I should see current BTC exchange rate
    When I send Bitcoin to the provided address
    Then the system should monitor the blockchain
    And I should see payment confirmation after 1 confirmation
    And my booking should be confirmed

  Scenario: USDT payment processing
    Given I am on the payment page
    And I have USDT in my wallet
    When I select USDT as payment method
    Then I should see USDT payment instructions
    And I should see the smart contract address
    And I should see the exact USDT amount
    When I transfer USDT to the contract
    Then the payment should be confirmed faster than Bitcoin
    And I should receive immediate confirmation

  Scenario: GitHub Sponsors payment
    Given I am on the payment page
    And I have a GitHub account
    When I select GitHub Sponsors as payment method
    Then I should be redirected to GitHub Sponsors page
    When I authorize the sponsorship payment
    And I confirm the sponsorship amount
    Then the payment should be processed through GitHub
    And I should receive confirmation from both GitHub and XperienceClimb

  Scenario: WhatsApp payment coordination
    Given I am on the payment page
    When I select WhatsApp payment method
    Then I should see a pre-filled WhatsApp message
    And the message should contain my booking details
    And the message should include payment instructions
    When I send the WhatsApp message
    Then I should receive a response with payment options
    And a customer service agent should assist with payment

  Scenario: Payment failure and retry
    Given I am on the payment page
    When I select credit card payment
    And I enter invalid card details
    Then I should see a payment error message
    And I should be able to retry with different payment method
    When I select PIX as alternative
    Then I should see PIX payment options
    And my booking should remain in "pending_payment" status

  Scenario: Payment timeout handling
    Given I am on the payment page
    And I select PIX payment
    When the PIX payment expires after 30 minutes
    Then I should see a timeout notification
    And I should be offered to generate a new PIX code
    When I request a new PIX code
    Then I should receive fresh payment instructions
    And the expiration timer should reset

  Scenario: Partial payment and installments
    Given I have a high-value booking over R$ 500
    When I select MercadoPago payment
    Then I should see installment options
    When I choose to pay in 3 installments
    Then I should see the installment breakdown
    And I should see the total amount with interest
    When I confirm the installment payment
    Then the first installment should be charged immediately
    And I should receive a payment schedule

  Scenario: Currency conversion for international payments
    Given I am an international customer
    And my preferred currency is USD
    When I view payment options
    Then I should see prices converted to USD
    And I should see the exchange rate used
    When I select Bitcoin payment
    Then the BTC amount should be calculated from USD price
    And I should see both USD and BRL amounts

  Scenario: Payment security and fraud detection
    Given I am making a payment
    When the system detects unusual payment patterns
    Then additional verification should be required
    And I should receive a security verification message
    When I complete the security verification
    Then the payment should proceed normally
    And the transaction should be logged for security audit

  Scenario: Refund processing
    Given I have a confirmed and paid booking
    And I request a refund within the cancellation period
    When the refund is approved
    Then the refund should be processed to the original payment method
    And I should receive refund confirmation
    And the refund should appear in my account within 5-10 business days

  Scenario: Payment receipt and invoicing
    Given I have completed a successful payment
    Then I should receive a digital receipt immediately
    And the receipt should include all payment details
    And I should be able to download a PDF invoice
    When I request a corporate invoice
    Then I should be able to add my company details
    And I should receive a proper tax invoice

  Scenario: Subscription-based payments for regular customers
    Given I am a frequent customer
    When I opt for a climbing membership
    Then I should see subscription payment options
    When I set up monthly auto-payment
    Then I should receive member discounts on all bookings
    And payments should be processed automatically each month
    And I should receive monthly payment confirmations

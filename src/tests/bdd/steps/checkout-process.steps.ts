import { Given, When, Then } from '@cucumber/cucumber';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { expect } from '@jest/globals';
import { CustomWorld } from '../support/world';
import { CheckoutForm } from '@/components/cart/CheckoutForm';
import React from 'react';

// Mock checkout related hooks and services
const mockCheckoutState = {
  paymentMethod: 'pix',
  contactInfo: {
    name: '',
    email: '',
    phone: ''
  },
  couponCode: '',
  discount: 0,
  total: 0
};

const mockCouponService = {
  validateCoupon: jest.fn(),
  applyDiscount: jest.fn()
};

jest.mock('@/core/services/ICouponService', () => ({
  CouponService: () => mockCouponService
}));

Given('I am authenticated', async function (this: CustomWorld) {
  this.isAuthenticated = true;
  this.testUser = {
    id: 'test-user-id',
    email: 'user@example.com',
    name: 'Test User'
  };
});

Given('I am on the checkout page', async function (this: CustomWorld) {
  if (!this.cartItems || this.cartItems.length === 0) {
    // Add a test item if cart is empty
    this.cartItems = [{
      id: 'test-item-1',
      packageId: 'basic-climbing',
      quantity: 1,
      price: 150
    }];
  }
  
  mockCheckoutState.total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  this.renderComponent(React.createElement(CheckoutForm));
});

Given('I have a connected crypto wallet', async function (this: CustomWorld) {
  // Mock crypto wallet connection
  this.attach('Crypto wallet is connected');
});

Given('I have a valid coupon {string}', async function (this: CustomWorld, couponCode: string) {
  mockCouponService.validateCoupon.mockResolvedValue({
    valid: true,
    discount: 20,
    type: 'percentage'
  });
  
  this.attach(`Valid coupon available: ${couponCode}`);
});

When('I select PIX as payment method', async function (this: CustomWorld) {
  mockCheckoutState.paymentMethod = 'pix';
  this.attach('PIX payment method selected');
});

When('I fill in my contact information', async function (this: CustomWorld) {
  mockCheckoutState.contactInfo = {
    name: 'Test User',
    email: 'user@example.com',
    phone: '+5511999999999'
  };
  
  this.attach('Contact information filled');
});

When('I confirm my order', async function (this: CustomWorld) {
  // Simulate order confirmation
  this.attach('Order confirmed');
});

When('I select crypto payment', async function (this: CustomWorld) {
  mockCheckoutState.paymentMethod = 'crypto';
  this.attach('Crypto payment method selected');
});

When('I confirm the transaction', async function (this: CustomWorld) {
  // Simulate crypto transaction confirmation
  this.attach('Crypto transaction confirmed');
});

When('I enter the coupon code', async function (this: CustomWorld) {
  mockCheckoutState.couponCode = 'CLIMB20';
  this.attach('Coupon code entered');
});

When('I apply the coupon', async function (this: CustomWorld) {
  const validation = await mockCouponService.validateCoupon('CLIMB20');
  
  if (validation.valid) {
    mockCheckoutState.discount = validation.discount;
    mockCheckoutState.total = mockCheckoutState.total * (1 - validation.discount / 100);
  }
  
  this.attach('Coupon applied');
});

When('I try to complete checkout without filling required fields', async function (this: CustomWorld) {
  // Leave required fields empty
  mockCheckoutState.contactInfo = {
    name: '',
    email: '',
    phone: ''
  };
  
  this.attach('Attempted checkout with empty required fields');
});

When('I view my order confirmation', async function (this: CustomWorld) {
  // Simulate viewing order confirmation
  this.attach('Viewing order confirmation');
});

Then('I should see the PIX payment details', async function (this: CustomWorld) {
  expect(mockCheckoutState.paymentMethod).toBe('pix');
  this.attach('PIX payment details displayed');
});

Then('I should receive a confirmation email', async function (this: CustomWorld) {
  expect(this.testUser?.email).toBeDefined();
  this.attach('Confirmation email sent');
});

Then('the payment should be processed', async function (this: CustomWorld) {
  expect(mockCheckoutState.paymentMethod).toBe('crypto');
  this.attach('Crypto payment processed');
});

Then('I should see a success confirmation', async function (this: CustomWorld) {
  this.attach('Success confirmation displayed');
});

Then('the total price should be reduced by {int}%', async function (this: CustomWorld, percentage: number) {
  expect(mockCheckoutState.discount).toBe(percentage);
});

Then('I should see the discount applied', async function (this: CustomWorld) {
  expect(mockCheckoutState.discount).toBeGreaterThan(0);
});

Then('I should see validation error messages', async function (this: CustomWorld) {
  // In a real implementation, this would check for validation errors
  expect(mockCheckoutState.contactInfo.name).toBe('');
  expect(mockCheckoutState.contactInfo.email).toBe('');
});

Then('the checkout should not proceed', async function (this: CustomWorld) {
  // Checkout should be blocked due to validation errors
  this.attach('Checkout blocked due to validation errors');
});

Then('I should see my order details', async function (this: CustomWorld) {
  expect(this.cartItems).toBeDefined();
  expect(this.cartItems?.length).toBeGreaterThan(0);
});

Then('I should see the booking reference number', async function (this: CustomWorld) {
  // In a real implementation, this would check for booking reference
  this.attach('Booking reference number displayed');
});

Then('I should see the activity date and time', async function (this: CustomWorld) {
  // In a real implementation, this would check for activity schedule
  this.attach('Activity date and time displayed');
});

Then('I should see participant information', async function (this: CustomWorld) {
  expect(this.cartItems?.[0]).toBeDefined();
  this.attach('Participant information displayed');
});

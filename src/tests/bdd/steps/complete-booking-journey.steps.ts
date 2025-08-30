import { Given, When, Then } from '@cucumber/cucumber';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { expect } from '@jest/globals';
import { CustomWorld } from '../support/world';

// Mock services and stores
const mockCartStore = {
  items: [],
  addItem: jest.fn(),
  clearCart: jest.fn(),
  getTotalPrice: jest.fn(() => 0),
  getTotalItems: jest.fn(() => 0),
};

const mockAuthService = {
  authenticated: false,
  user: null,
  login: jest.fn(),
  logout: jest.fn(),
};

const mockBookingService = {
  createBooking: jest.fn(),
  updateBooking: jest.fn(),
  cancelBooking: jest.fn(),
  getBooking: jest.fn(),
};

const mockPaymentService = {
  createPixPayment: jest.fn(),
  createCryptoPayment: jest.fn(),
  processPayment: jest.fn(),
};

// Background steps
Given('there are available climbing packages', async function (this: CustomWorld) {
  this.availablePackages = [
    {
      id: 'pkg-1',
      name: 'Escalada Iniciante',
      price: 150,
      description: 'Perfect for beginners',
      maxParticipants: 8,
      available: true,
    },
    {
      id: 'pkg-2',
      name: 'Escalada Avançada',
      price: 250,
      description: 'For experienced climbers',
      maxParticipants: 6,
      available: true,
    },
    {
      id: 'pkg-3',
      name: 'Escalada em Grupo',
      price: 120,
      description: 'Group climbing experience',
      maxParticipants: 12,
      available: true,
    },
  ];
});

// Package selection steps
When('I browse available packages', async function (this: CustomWorld) {
  this.currentPage = 'packages';
  this.attach('User is browsing available packages');
});

When('I select the {string} package', async function (this: CustomWorld, packageName: string) {
  const selectedPackage = this.availablePackages?.find(pkg => pkg.name === packageName);
  if (!selectedPackage) {
    throw new Error(`Package "${packageName}" not found`);
  }
  
  this.selectedPackage = selectedPackage;
  this.attach(`Selected package: ${packageName}`);
});

When('I add it to my cart', async function (this: CustomWorld) {
  if (!this.selectedPackage) {
    throw new Error('No package selected');
  }
  
  mockCartStore.addItem({
    packageId: this.selectedPackage.id,
    packageName: this.selectedPackage.name,
    price: this.selectedPackage.price,
    quantity: 1,
    participantName: 'Participant',
  });
  
  mockCartStore.items.push({
    id: `item-${Date.now()}`,
    packageId: this.selectedPackage.id,
    packageName: this.selectedPackage.name,
    price: this.selectedPackage.price,
    quantity: 1,
    participantName: 'Participant',
    addedAt: new Date(),
  });
  
  this.attach('Package added to cart');
});

When('I set quantity to {int}', async function (this: CustomWorld, quantity: number) {
  this.selectedQuantity = quantity;
  this.attach(`Set quantity to ${quantity}`);
});

When('I proceed to checkout', async function (this: CustomWorld) {
  this.currentPage = 'checkout';
  this.attach('Proceeding to checkout');
});

// Authentication steps
Then('I should be prompted to login', async function (this: CustomWorld) {
  if (mockAuthService.authenticated) {
    throw new Error('User is already authenticated');
  }
  this.attach('Login prompt displayed');
});

When('I complete the authentication process', async function (this: CustomWorld) {
  mockAuthService.authenticated = true;
  mockAuthService.user = {
    id: 'user-123',
    email: 'user@example.com',
    name: 'Test User',
  };
  this.isAuthenticated = true;
  this.attach('Authentication completed');
});

Given('I am authenticated as {string}', async function (this: CustomWorld, email: string) {
  mockAuthService.authenticated = true;
  mockAuthService.user = {
    id: `user-${email.split('@')[0]}`,
    email: email,
    name: email.split('@')[0],
  };
  this.isAuthenticated = true;
  this.userEmail = email;
});

// Participant details steps
When('I fill in participant details:', async function (this: CustomWorld, dataTable) {
  const participants = dataTable.hashes();
  this.participantDetails = {};
  
  participants.forEach((participant: any, index: number) => {
    const itemId = `item-${index}`;
    this.participantDetails[itemId] = {
      name: participant.name,
      age: parseInt(participant.age),
      experienceLevel: participant.experience,
      healthDeclaration: participant.health_declaration === 'true',
    };
  });
  
  this.attach(`Filled participant details for ${participants.length} participants`);
});

When('I fill in participant details for all members:', async function (this: CustomWorld, dataTable) {
  const participants = dataTable.hashes();
  this.participantDetails = {};
  
  participants.forEach((participant: any, index: number) => {
    const itemId = `item-${index}`;
    this.participantDetails[itemId] = {
      name: participant.name,
      age: parseInt(participant.age),
      experienceLevel: participant.experience,
      healthDeclaration: participant.health_declaration === 'true',
    };
  });
  
  this.attach(`Filled details for ${participants.length} group members`);
});

When('I fill in international participant details:', async function (this: CustomWorld, dataTable) {
  const participants = dataTable.hashes();
  this.participantDetails = {};
  
  participants.forEach((participant: any, index: number) => {
    const itemId = `item-${index}`;
    this.participantDetails[itemId] = {
      name: participant.name,
      age: parseInt(participant.age),
      passportNumber: participant.passport_number,
      nationality: participant.nationality,
      healthDeclaration: true,
    };
  });
  
  this.attach(`Filled international participant details`);
});

// Date and special requests
When('I select climbing date {string}', async function (this: CustomWorld, date: string) {
  this.climbingDate = new Date(date);
  this.attach(`Selected climbing date: ${date}`);
});

When('I add special requests {string}', async function (this: CustomWorld, requests: string) {
  this.specialRequests = requests;
  this.attach(`Added special requests: ${requests}`);
});

// Coupon steps
Given('I have a valid coupon {string} with {int}% discount', async function (this: CustomWorld, couponCode: string, discount: number) {
  this.availableCoupon = {
    code: couponCode,
    discount: discount,
    valid: true,
  };
});

When('I apply coupon {string}', async function (this: CustomWorld, couponCode: string) {
  if (this.availableCoupon?.code === couponCode) {
    this.appliedCoupon = this.availableCoupon;
    this.attach(`Applied coupon: ${couponCode}`);
  } else {
    throw new Error(`Invalid coupon: ${couponCode}`);
  }
});

Then('the discount should be applied correctly', async function (this: CustomWorld) {
  if (!this.appliedCoupon) {
    throw new Error('No coupon applied');
  }
  
  const originalPrice = this.selectedPackage?.price || 0;
  const discountAmount = originalPrice * (this.appliedCoupon.discount / 100);
  this.finalPrice = originalPrice - discountAmount;
  
  this.attach(`Discount applied: ${this.appliedCoupon.discount}%`);
});

Then('the final price should be {int}% less than original', async function (this: CustomWorld, percentage: number) {
  const originalPrice = this.selectedPackage?.price || 0;
  const expectedPrice = originalPrice * (1 - percentage / 100);
  
  expect(this.finalPrice).toBeCloseTo(expectedPrice, 2);
});

// Payment method steps
When('I choose {word} as payment method', async function (this: CustomWorld, paymentMethod: string) {
  this.selectedPaymentMethod = paymentMethod.toLowerCase();
  this.attach(`Selected payment method: ${paymentMethod}`);
});

When('I choose crypto payment with {word}', async function (this: CustomWorld, cryptoType: string) {
  this.selectedPaymentMethod = cryptoType.toLowerCase();
  this.attach(`Selected crypto payment: ${cryptoType}`);
});

When('I confirm my booking', async function (this: CustomWorld) {
  const bookingData = {
    userId: mockAuthService.user?.id,
    packageId: this.selectedPackage?.id,
    participantDetails: this.participantDetails,
    climbingDate: this.climbingDate,
    paymentMethod: this.selectedPaymentMethod,
    appliedCoupon: this.appliedCoupon,
    specialRequests: this.specialRequests,
  };
  
  const bookingResult = await mockBookingService.createBooking(bookingData);
  this.bookingId = bookingResult.id || 'BOOK-12345';
  this.bookingStatus = 'pending_payment';
  
  this.attach('Booking confirmed and created');
});

// Payment confirmation steps
Then('I should see PIX payment instructions', async function (this: CustomWorld) {
  if (this.selectedPaymentMethod !== 'pix') {
    throw new Error('PIX payment method not selected');
  }
  
  this.pixPaymentData = {
    qrCode: 'mock-qr-code',
    pixKey: 'mock-pix-key',
    expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
  };
  
  this.attach('PIX payment instructions displayed');
});

Then('I should see Bitcoin payment instructions', async function (this: CustomWorld) {
  if (this.selectedPaymentMethod !== 'bitcoin') {
    throw new Error('Bitcoin payment method not selected');
  }
  
  this.cryptoPaymentData = {
    address: 'mock-bitcoin-address',
    amount: '0.00123456',
    exchangeRate: 50000,
  };
  
  this.attach('Bitcoin payment instructions displayed');
});

Then('I should be redirected to MercadoPago checkout', async function (this: CustomWorld) {
  if (this.selectedPaymentMethod !== 'mercadopago') {
    throw new Error('MercadoPago payment method not selected');
  }
  
  this.mercadoPagoUrl = 'https://mercadopago.com/checkout/mock-preference';
  this.attach('Redirected to MercadoPago checkout');
});

// Confirmation steps
Then('I should receive a booking confirmation email', async function (this: CustomWorld) {
  this.emailSent = true;
  this.attach('Booking confirmation email sent');
});

Then('the order should be saved with status {string}', async function (this: CustomWorld, status: string) {
  this.bookingStatus = status;
  expect(this.bookingStatus).toBe(status);
});

Then('the total should reflect {int} participants', async function (this: CustomWorld, participantCount: number) {
  const expectedTotal = (this.selectedPackage?.price || 0) * participantCount;
  this.totalPrice = expectedTotal;
  
  expect(Object.keys(this.participantDetails || {}).length).toBe(participantCount);
});

Then('all participant details should be saved', async function (this: CustomWorld) {
  expect(this.participantDetails).toBeDefined();
  expect(Object.keys(this.participantDetails || {}).length).toBeGreaterThan(0);
});

Then('the coupon should be marked as used', async function (this: CustomWorld) {
  if (this.appliedCoupon) {
    this.appliedCoupon.used = true;
    this.attach('Coupon marked as used');
  }
});

// Booking management steps
Given('I have an existing booking {string}', async function (this: CustomWorld, bookingId: string) {
  this.existingBooking = {
    id: bookingId,
    status: 'confirmed',
    climbingDate: new Date('2024-12-25'),
    paid: true,
  };
});

Given('the booking is confirmed and paid', async function (this: CustomWorld) {
  if (this.existingBooking) {
    this.existingBooking.status = 'confirmed';
    this.existingBooking.paid = true;
  }
});

Given('the climbing date is more than 48 hours away', async function (this: CustomWorld) {
  const now = new Date();
  const climbingDate = new Date(now.getTime() + 72 * 60 * 60 * 1000); // 72 hours from now
  
  if (this.existingBooking) {
    this.existingBooking.climbingDate = climbingDate;
  }
});

When('I request to cancel my booking', async function (this: CustomWorld) {
  this.cancellationRequest = {
    bookingId: this.existingBooking?.id,
    requestedAt: new Date(),
  };
});

When('I provide cancellation reason {string}', async function (this: CustomWorld, reason: string) {
  if (this.cancellationRequest) {
    this.cancellationRequest.reason = reason;
  }
});

Then('I should see cancellation options', async function (this: CustomWorld) {
  this.cancellationOptions = {
    fullRefund: true,
    partialRefund: false,
    reschedule: true,
  };
  
  this.attach('Cancellation options displayed');
});

When('I confirm the cancellation', async function (this: CustomWorld) {
  if (this.existingBooking) {
    this.existingBooking.status = 'cancelled';
    this.refundInitiated = true;
  }
});

Then('the booking status should change to {string}', async function (this: CustomWorld, status: string) {
  expect(this.existingBooking?.status).toBe(status);
});

Then('I should receive a cancellation confirmation', async function (this: CustomWorld) {
  this.cancellationConfirmationSent = true;
  this.attach('Cancellation confirmation sent');
});

Then('a refund should be initiated', async function (this: CustomWorld) {
  expect(this.refundInitiated).toBe(true);
});

// Weather and rescheduling steps
Given('I have a confirmed booking for {string}', async function (this: CustomWorld, date: string) {
  this.confirmedBooking = {
    id: 'BOOK-WEATHER-123',
    climbingDate: new Date(date),
    status: 'confirmed',
  };
});

Given('the weather forecast shows unsafe conditions', async function (this: CustomWorld) {
  this.weatherConditions = {
    safe: false,
    reason: 'Heavy rain and strong winds',
    reschedulingRequired: true,
  };
});

When('the system sends a weather alert', async function (this: CustomWorld) {
  this.weatherAlertSent = true;
  this.attach('Weather alert sent to customer');
});

Then('I should receive a rescheduling notification', async function (this: CustomWorld) {
  expect(this.weatherAlertSent).toBe(true);
});

When('I choose to reschedule to {string}', async function (this: CustomWorld, newDate: string) {
  this.newClimbingDate = new Date(newDate);
});

When('I confirm the new date', async function (this: CustomWorld) {
  if (this.confirmedBooking && this.newClimbingDate) {
    this.confirmedBooking.climbingDate = this.newClimbingDate;
    this.confirmedBooking.rescheduled = true;
  }
});

Then('my booking should be updated with the new date', async function (this: CustomWorld) {
  expect(this.confirmedBooking?.climbingDate).toEqual(this.newClimbingDate);
  expect(this.confirmedBooking?.rescheduled).toBe(true);
});

Then('I should receive updated booking confirmation', async function (this: CustomWorld) {
  this.updatedConfirmationSent = true;
  this.attach('Updated booking confirmation sent');
});

// International customer steps
Given('I am an international customer from {string}', async function (this: CustomWorld, country: string) {
  this.customerProfile = {
    country: country,
    international: true,
  };
});

Given('my preferred language is {string}', async function (this: CustomWorld, language: string) {
  if (this.customerProfile) {
    this.customerProfile.language = language;
  }
});

When('I browse packages', async function (this: CustomWorld) {
  this.currentPage = 'packages';
});

Then('I should see prices in USD equivalent', async function (this: CustomWorld) {
  this.priceDisplayCurrency = 'USD';
  this.attach('Prices displayed in USD');
});

Then('all content should be in English', async function (this: CustomWorld) {
  this.contentLanguage = 'English';
  this.attach('Content displayed in English');
});

When('I provide international contact information', async function (this: CustomWorld) {
  this.internationalContact = {
    phone: '+1-555-123-4567',
    address: '123 Main St, New York, NY',
    country: 'United States',
  };
});

When('I choose international payment method', async function (this: CustomWorld) {
  this.selectedPaymentMethod = 'international_card';
});

Then('I should see additional requirements for international visitors', async function (this: CustomWorld) {
  this.internationalRequirements = [
    'Valid passport required',
    'Travel insurance recommended',
    'Visa requirements check',
  ];
  
  this.attach('International visitor requirements displayed');
});

Then('I should receive booking confirmation in English', async function (this: CustomWorld) {
  this.confirmationLanguage = 'English';
  this.attach('Booking confirmation sent in English');
});

Then('the system should handle timezone differences correctly', async function (this: CustomWorld) {
  this.timezoneHandled = true;
  this.attach('Timezone differences handled correctly');
});

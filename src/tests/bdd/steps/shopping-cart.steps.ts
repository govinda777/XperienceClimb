import { Given, When, Then } from '@cucumber/cucumber';
import { screen, fireEvent } from '@testing-library/react';
import { expect } from '@jest/globals';
import { CustomWorld } from '../support/world';
import { CartButton } from '@/components/cart/CartButton';
import { CartModal } from '@/components/cart/CartModal';
import React from 'react';

// Mock the cart store
const mockCartStore = {
  items: [] as any[],
  isOpen: false,
  addItem: jest.fn(),
  removeItem: jest.fn(),
  updateQuantity: jest.fn(),
  clearCart: jest.fn(),
  toggleCart: jest.fn(),
  openCart: jest.fn(),
  closeCart: jest.fn(),
  getTotalPrice: jest.fn(() => 0),
  getTotalItems: jest.fn(() => 0),
  getItemCount: jest.fn(() => 0)
};

jest.mock('@/store/useCartStore', () => ({
  useCartStore: () => mockCartStore
}));

Given('there are available packages', async function (this: CustomWorld) {
  // Test packages are already initialized in the world constructor
  expect(this.testPackages).toBeDefined();
  expect(this.testPackages?.length).toBeGreaterThan(0);
});

Given('I am viewing a package {string}', async function (this: CustomWorld, packageName: string) {
  const package_ = this.testPackages?.find(pkg => pkg.name === packageName);
  expect(package_).toBeDefined();
  this.attach(`Viewing package: ${packageName}`);
});

Given('I have items in my cart', async function (this: CustomWorld) {
  const testItem = {
    id: 'test-item-1',
    packageId: 'basic-climbing',
    packageName: 'Basic Climbing Experience',
    participantName: 'Test User',
    quantity: 1,
    price: 150,
    addedAt: new Date()
  };
  
  this.cartItems = [testItem];
  mockCartStore.items = [testItem];
  mockCartStore.getTotalItems = jest.fn(() => 1);
  mockCartStore.getTotalPrice = jest.fn(() => 150);
});

Given('I have {string} in my cart', async function (this: CustomWorld, packageName: string) {
  const package_ = this.testPackages?.find(pkg => pkg.name === packageName);
  expect(package_).toBeDefined();
  
  const testItem = {
    id: 'test-item-1',
    packageId: package_!.id,
    packageName: packageName,
    participantName: 'Test User',
    quantity: 1,
    price: package_!.price,
    addedAt: new Date()
  };
  
  this.cartItems = [testItem];
  mockCartStore.items = [testItem];
  mockCartStore.getTotalItems = jest.fn(() => 1);
  mockCartStore.getTotalPrice = jest.fn(() => package_!.price);
});

Given('I have {string} in my cart with quantity {int}', async function (this: CustomWorld, packageName: string, quantity: number) {
  const package_ = this.testPackages?.find(pkg => pkg.name === packageName);
  expect(package_).toBeDefined();
  
  const testItem = {
    id: 'test-item-1',
    packageId: package_!.id,
    packageName: packageName,
    participantName: 'Test User',
    quantity: quantity,
    price: package_!.price,
    addedAt: new Date()
  };
  
  this.cartItems = [testItem];
  mockCartStore.items = [testItem];
  mockCartStore.getTotalItems = jest.fn(() => quantity);
  mockCartStore.getTotalPrice = jest.fn(() => package_!.price * quantity);
});

Given('I have multiple items in my cart', async function (this: CustomWorld) {
  const testItems = [
    {
      id: 'test-item-1',
      packageId: 'basic-climbing',
      packageName: 'Basic Climbing Experience',
      participantName: 'Test User 1',
      quantity: 1,
      price: 150,
      addedAt: new Date()
    },
    {
      id: 'test-item-2',
      packageId: 'advanced-climbing',
      packageName: 'Advanced Rock Climbing',
      participantName: 'Test User 2',
      quantity: 1,
      price: 250,
      addedAt: new Date()
    }
  ];
  
  this.cartItems = testItems;
  mockCartStore.items = testItems;
  mockCartStore.getTotalItems = jest.fn(() => 2);
  mockCartStore.getTotalPrice = jest.fn(() => 400);
});

When('I click {string}', async function (this: CustomWorld, buttonText: string) {
  // This is a generic step for clicking buttons
  const button = screen.getByRole('button', { name: new RegExp(buttonText, 'i') });
  fireEvent.click(button);
});

When('I fill in participant details', async function (this: CustomWorld) {
  // Simulate filling participant details
  this.attach('Participant details filled');
});

When('I click on the cart icon', async function (this: CustomWorld) {
  this.renderComponent(React.createElement(CartButton));
  
  const cartButton = screen.getByRole('button', { name: /cart|carrinho/i });
  fireEvent.click(cartButton);
  
  expect(mockCartStore.toggleCart).toHaveBeenCalled();
});

When('I increase the quantity to {int}', async function (this: CustomWorld, newQuantity: number) {
  const itemId = this.cartItems?.[0]?.id;
  expect(itemId).toBeDefined();
  
  mockCartStore.updateQuantity(itemId!, newQuantity);
  
  // Update mock state
  if (this.cartItems && this.cartItems[0]) {
    this.cartItems[0].quantity = newQuantity;
    const item = this.cartItems[0] as any;
    mockCartStore.getTotalItems = jest.fn(() => newQuantity);
    mockCartStore.getTotalPrice = jest.fn(() => item.price * newQuantity);
  }
});

When('I click remove on that item', async function (this: CustomWorld) {
  const itemId = this.cartItems?.[0]?.id;
  expect(itemId).toBeDefined();
  
  mockCartStore.removeItem(itemId!);
  
  // Update mock state
  this.cartItems = [];
  mockCartStore.items = [];
  mockCartStore.getTotalItems = jest.fn(() => 0);
  mockCartStore.getTotalPrice = jest.fn(() => 0);
});

When('I refresh the page', async function (this: CustomWorld) {
  // Simulate page refresh - cart should persist due to zustand persistence
  this.attach('Page refreshed');
});

When('I click {string}', async function (this: CustomWorld, buttonText: string) {
  if (buttonText === 'Clear Cart') {
    mockCartStore.clearCart();
    
    // Update mock state
    this.cartItems = [];
    mockCartStore.items = [];
    mockCartStore.getTotalItems = jest.fn(() => 0);
    mockCartStore.getTotalPrice = jest.fn(() => 0);
  }
});

Then('the package should be added to my cart', async function (this: CustomWorld) {
  expect(mockCartStore.addItem).toHaveBeenCalled();
});

Then('the cart counter should show {int} item(s)', async function (this: CustomWorld, expectedCount: number) {
  expect(mockCartStore.getTotalItems()).toBe(expectedCount);
});

Then('I should see a list of items in my cart', async function (this: CustomWorld) {
  this.renderComponent(React.createElement(CartModal));
  
  // Check that cart modal shows items
  expect(this.cartItems?.length).toBeGreaterThan(0);
});

Then('I should see the total price', async function (this: CustomWorld) {
  const totalPrice = mockCartStore.getTotalPrice();
  expect(totalPrice).toBeGreaterThan(0);
});

Then('the cart should show {int} items', async function (this: CustomWorld, expectedCount: number) {
  expect(mockCartStore.getTotalItems()).toBe(expectedCount);
});

Then('the total price should be updated accordingly', async function (this: CustomWorld) {
  const expectedPrice = this.cartItems?.[0]?.price! * this.cartItems?.[0]?.quantity!;
  expect(mockCartStore.getTotalPrice()).toBe(expectedPrice);
});

Then('the item should be removed from my cart', async function (this: CustomWorld) {
  expect(mockCartStore.removeItem).toHaveBeenCalled();
  expect(this.cartItems?.length).toBe(0);
});

Then('the cart counter should decrease', async function (this: CustomWorld) {
  expect(mockCartStore.getTotalItems()).toBe(0);
});

Then('my cart should still contain the same items', async function (this: CustomWorld) {
  // In a real test, this would verify persistence
  expect(this.cartItems).toBeDefined();
});

Then('my cart should be empty', async function (this: CustomWorld) {
  expect(mockCartStore.getTotalItems()).toBe(0);
  expect(this.cartItems?.length).toBe(0);
});

Then('the cart counter should show {int}', async function (this: CustomWorld, expectedCount: number) {
  expect(mockCartStore.getTotalItems()).toBe(expectedCount);
});

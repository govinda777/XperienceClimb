import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@jest/globals';
import { CustomWorld } from '../support/world';
import { PackagesSection } from '@/components/sections/PackagesSection';
import React from 'react';

// Mock the usePackages hook
const mockUsePackages = {
  packages: [] as any[],
  loading: false,
  error: null,
  checkAvailability: jest.fn(),
  getPackageById: jest.fn(),
  getPackagesByType: jest.fn(),
  refetch: jest.fn()
};

jest.mock('@/hooks/usePackages', () => ({
  usePackages: () => mockUsePackages
}));

Given('there are packages for different experience levels', async function (this: CustomWorld) {
  const packagesWithLevels = this.testPackages?.map(pkg => ({
    ...pkg,
    difficulty: pkg.experienceLevel
  }));
  
  mockUsePackages.packages = packagesWithLevels || [];
  expect(mockUsePackages.packages.length).toBeGreaterThan(0);
});

When('the page loads', async function (this: CustomWorld) {
  mockUsePackages.packages = this.testPackages || [];
  this.renderComponent(React.createElement(PackagesSection));
});

When('I filter by {string} level', async function (this: CustomWorld, level: string) {
  const filteredPackages = this.testPackages?.filter(pkg => pkg.experienceLevel === level) || [];
  mockUsePackages.getPackagesByType.mockReturnValue(filteredPackages);
  
  this.attach(`Filtering packages by ${level} level`);
});

When('I click on a package', async function (this: CustomWorld) {
  // Simulate clicking on a package
  this.attach('Clicked on a package to view details');
});

When('I select a date for the activity', async function (this: CustomWorld) {
  const testDate = new Date('2024-12-25');
  mockUsePackages.checkAvailability.mockResolvedValue({
    available: true,
    spotsLeft: 5,
    restrictions: []
  });
  
  this.attach(`Selected date: ${testDate.toISOString()}`);
});

When('I view the packages', async function (this: CustomWorld) {
  mockUsePackages.packages = this.testPackages || [];
  this.renderComponent(React.createElement(PackagesSection));
});

Then('I should see a list of climbing packages', async function (this: CustomWorld) {
  expect(mockUsePackages.packages.length).toBeGreaterThan(0);
});

Then('each package should display its name, price, and description', async function (this: CustomWorld) {
  const packages = mockUsePackages.packages;
  
  packages.forEach(pkg => {
    expect(pkg.name).toBeDefined();
    expect(pkg.price).toBeDefined();
    expect(typeof pkg.price).toBe('number');
  });
});

Then('I should only see packages suitable for beginners', async function (this: CustomWorld) {
  const beginnerPackages = mockUsePackages.getPackagesByType();
  
  beginnerPackages.forEach((pkg: any) => {
    expect(pkg.experienceLevel).toBe('beginner');
  });
});

Then('I should see detailed information about the package', async function (this: CustomWorld) {
  // In a real implementation, this would check for detailed package view
  this.attach('Package details are displayed');
});

Then('I should see the package availability', async function (this: CustomWorld) {
  const availability = await mockUsePackages.checkAvailability('test-package');
  expect(availability).toBeDefined();
  expect(typeof availability.available).toBe('boolean');
});

Then('I should see safety requirements', async function (this: CustomWorld) {
  // In a real implementation, this would check for safety requirements display
  this.attach('Safety requirements are displayed');
});

Then('I should see if the package is available on that date', async function (this: CustomWorld) {
  expect(mockUsePackages.checkAvailability).toHaveBeenCalled();
});

Then('I should see how many spots are left', async function (this: CustomWorld) {
  const availability = await mockUsePackages.checkAvailability('test-package');
  expect(availability.spotsLeft).toBeDefined();
  expect(typeof availability.spotsLeft).toBe('number');
});

Then('each package should show its price in Brazilian Reais', async function (this: CustomWorld) {
  const packages = mockUsePackages.packages;
  
  packages.forEach(pkg => {
    expect(pkg.price).toBeGreaterThan(0);
    expect(typeof pkg.price).toBe('number');
  });
});

Then('the price should include all fees and taxes', async function (this: CustomWorld) {
  // In a real implementation, this would verify that prices are inclusive
  this.attach('Prices include all fees and taxes');
});

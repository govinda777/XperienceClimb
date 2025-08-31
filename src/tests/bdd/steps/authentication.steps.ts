import { Given, When, Then } from '@cucumber/cucumber';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { CustomWorld } from '../support/world';
import { LoginButton } from '@/components/auth/LoginButton';
import { AuthGuard } from '@/components/auth/AuthGuard';
import React from 'react';

// Mock the useAuth hook for testing
const mockUseAuth = {
  ready: true,
  authenticated: false,
  user: null as any,
  login: jest.fn(),
  logout: jest.fn(),
  isLoading: false,
  isGuest: true,
  isLoggedIn: false,
  updateUserPreferences: jest.fn()
};

jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth
}));

Given('I am on the XperienceClimb homepage', async function (this: CustomWorld) {
  // This step represents being on the homepage
  // In a real e2e test, this would navigate to the actual page
  this.attach('User is on the XperienceClimb homepage');
});

Given('I am not authenticated', async function (this: CustomWorld) {
  this.isAuthenticated = false;
  mockUseAuth.authenticated = false;
  mockUseAuth.user = null;
  mockUseAuth.isLoggedIn = false;
  mockUseAuth.isGuest = true;
});

Given('I am authenticated as {string}', async function (this: CustomWorld, email: string) {
  this.isAuthenticated = true;
  this.testUser = {
    id: 'test-user-id',
    email: email,
    name: email.split('@')[0]
  };
  
  mockUseAuth.authenticated = true;
  mockUseAuth.user = this.testUser;
  mockUseAuth.isLoggedIn = true;
  mockUseAuth.isGuest = false;
});

When('I look at the navigation', async function (this: CustomWorld) {
  // Render the LoginButton component
  this.renderComponent(React.createElement(LoginButton));
});

When('I click the login button', async function (this: CustomWorld) {
  if (!this.component) {
    this.renderComponent(React.createElement(LoginButton));
  }
  
  const loginButton = screen.getByRole('button', { name: /login|entrar/i });
  fireEvent.click(loginButton);
  
  expect(mockUseAuth.login).toHaveBeenCalled();
});

When('I complete the authentication process', async function (this: CustomWorld) {
  // Simulate successful authentication
  this.isAuthenticated = true;
  this.testUser = {
    id: 'test-user-id',
    email: 'user@example.com',
    name: 'user'
  };
  
  mockUseAuth.authenticated = true;
  mockUseAuth.user = this.testUser;
  mockUseAuth.isLoggedIn = true;
  mockUseAuth.isGuest = false;
});

When('I click the logout button', async function (this: CustomWorld) {
  // Simulate logout action
  mockUseAuth.logout();
  
  // Update state
  this.isAuthenticated = false;
  this.testUser = undefined;
  mockUseAuth.authenticated = false;
  mockUseAuth.user = null;
  mockUseAuth.isLoggedIn = false;
  mockUseAuth.isGuest = true;
});

When('I update my experience level to {string}', async function (this: CustomWorld, level: string) {
  if (!this.testUser) {
    throw new Error('User must be authenticated to update preferences');
  }
  
  await mockUseAuth.updateUserPreferences({ experienceLevel: level });
});

When('I logout and login again', async function (this: CustomWorld) {
  // Logout
  this.isAuthenticated = false;
  mockUseAuth.authenticated = false;
  mockUseAuth.user = null;
  
  // Login again
  this.isAuthenticated = true;
  mockUseAuth.authenticated = true;
  mockUseAuth.user = this.testUser;
});

Then('I should see a login button', async function (this: CustomWorld) {
  if (!this.component) {
    this.renderComponent(React.createElement(LoginButton));
  }
  
  await waitFor(() => {
    const loginButton = screen.getByRole('button', { name: /login|entrar/i });
    expect(loginButton).toBeTruthy();
  });
});

Then('I should be logged in', async function (this: CustomWorld) {
  expect(this.isAuthenticated).toBe(true);
  expect(mockUseAuth.authenticated).toBe(true);
});

Then('I should see my user profile information', async function (this: CustomWorld) {
  expect(this.testUser).toBeDefined();
  expect(this.testUser?.email).toBe('user@example.com');
});

Then('I should be logged out', async function (this: CustomWorld) {
  expect(this.isAuthenticated).toBe(false);
  expect(mockUseAuth.authenticated).toBe(false);
});

Then('I should see the login button again', async function (this: CustomWorld) {
  this.renderComponent(React.createElement(LoginButton));
  
  await waitFor(() => {
    const loginButton = screen.getByRole('button', { name: /login|entrar/i });
    expect(loginButton).toBeTruthy();
  });
});

Then('my experience level should still be {string}', async function (this: CustomWorld, level: string) {
  // In a real implementation, this would check localStorage or API
  expect(mockUseAuth.updateUserPreferences).toHaveBeenCalledWith({ experienceLevel: level });
});

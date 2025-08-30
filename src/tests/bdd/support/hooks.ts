import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from './world';

BeforeAll(async function () {
  // Global setup
  console.log('🧗‍♂️ Starting XperienceClimb BDD Tests');
});

Before(async function (this: CustomWorld) {
  // Reset world state before each scenario
  this.isAuthenticated = false;
  this.cartItems = [];
  this.testUser = undefined;
});

After(async function (this: CustomWorld) {
  // Cleanup after each scenario
  this.cleanup();
});

AfterAll(async function () {
  // Global cleanup
  console.log('✅ XperienceClimb BDD Tests completed');
});

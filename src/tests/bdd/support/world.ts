import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';

export interface CustomWorld extends World {
  // React Testing Library
  component?: RenderResult;
  
  // Test data
  testUser?: {
    id: string;
    email: string;
    name: string;
  };
  
  testPackages?: Array<{
    id: string;
    name: string;
    price: number;
    experienceLevel: string;
  }>;
  
  // Cart state
  cartItems?: Array<{
    id: string;
    packageId: string;
    quantity: number;
    price: number;
  }>;
  
  // Authentication state
  isAuthenticated?: boolean;
  
  // Helper methods
  renderComponent(component: ReactElement): RenderResult;
  cleanup(): void;
}

export class XperienceClimbWorld extends World implements CustomWorld {
  testUser?: {
    id: string;
    email: string;
    name: string;
  };
  
  testPackages?: Array<{
    id: string;
    name: string;
    price: number;
    experienceLevel: string;
  }>;
  
  cartItems?: Array<{
    id: string;
    packageId: string;
    quantity: number;
    price: number;
  }>;
  
  isAuthenticated?: boolean;
  component?: RenderResult;

  constructor(options: IWorldOptions) {
    super(options);
    
    // Initialize test data
    this.testPackages = [
      {
        id: 'basic-climbing',
        name: 'Basic Climbing Experience',
        price: 150,
        experienceLevel: 'beginner'
      },
      {
        id: 'advanced-climbing',
        name: 'Advanced Rock Climbing',
        price: 250,
        experienceLevel: 'advanced'
      },
      {
        id: 'family-climbing',
        name: 'Family Climbing Adventure',
        price: 200,
        experienceLevel: 'beginner'
      }
    ];
    
    this.cartItems = [];
    this.isAuthenticated = false;
  }

  renderComponent(component: ReactElement): RenderResult {
    this.component = render(component);
    return this.component;
  }

  cleanup(): void {
    if (this.component) {
      this.component.unmount();
    }
  }
}

setWorldConstructor(XperienceClimbWorld);

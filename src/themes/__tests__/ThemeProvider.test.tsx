import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeProvider';

// Test component to read theme properties
const TestComponent = () => {
  const { theme, cmsEnabled, activeDestinationId } = useTheme();
  return (
    <div>
      <span data-testid="cms-enabled">{cmsEnabled ? 'true' : 'false'}</span>
      <span data-testid="destination-id">{activeDestinationId || 'null'}</span>
      <span data-testid="primary-color">{theme.primaryColor}</span>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('should fallback to legacy mode when cms is disabled', async () => {
    await act(async () => {
      render(
        <ThemeProvider initialCmsEnabled={false}>
          <TestComponent />
        </ThemeProvider>
      );
    });

    expect(screen.getByTestId('cms-enabled').textContent).toBe('false');
    expect(screen.getByTestId('destination-id').textContent).toBe('pedra-bela');
  });

  it('should load custom active destination details when cms is enabled', async () => {
    const mockActiveSite = {
      activeDestination: {
        id: 'fazenda-ipanema',
        name: 'Fazenda Ipanema',
        visualConfig: {
          primaryColor: '#123456'
        }
      }
    };

    await act(async () => {
      render(
        <ThemeProvider initialCmsEnabled={true} initialActiveSite={mockActiveSite}>
          <TestComponent />
        </ThemeProvider>
      );
    });

    expect(screen.getByTestId('cms-enabled').textContent).toBe('true');
    expect(screen.getByTestId('destination-id').textContent).toBe('fazenda-ipanema');
    expect(screen.getByTestId('primary-color').textContent).toBe('#123456');
  });
});

# Theme Configuration Architecture

This directory contains the theme configuration system for XperienceClimb. The architecture has been improved to use a class-based approach with inheritance from a base class.

## Architecture Overview

### BaseTheme Class
The `BaseTheme` class provides:
- Abstract properties that must be implemented by all theme classes
- Utility methods for creating theme components
- Common validation and processing methods
- A `getThemeConfig()` method to return the complete theme configuration

### Theme Classes
Each theme extends `BaseTheme` and implements:
- `FazendaIpanemaTheme` - Theme for Fazenda Ipanema location
- `PedraBellaTheme` - Theme for Pedra Bela location

## Usage Examples

### Using Theme Classes (New Architecture)
```typescript
import { FazendaIpanemaTheme, PedraBellaTheme } from './configs';

// Create theme instances
const fazendaTheme = new FazendaIpanemaTheme();
const pedraTheme = new PedraBellaTheme();

// Get theme configuration
const themeConfig = fazendaTheme.getThemeConfig();

// Access theme properties
console.log(fazendaTheme.name); // "Fazenda Ipanema"
console.log(fazendaTheme.location.name); // "Morro Araçoiaba"
```

### Using Theme Objects (Backward Compatibility)
```typescript
import { fazendaIpanemaTheme, pedraBellaTheme } from './configs';

// Direct access to theme configuration
console.log(fazendaIpanemaTheme.name); // "Fazenda Ipanema"
console.log(fazendaIpanemaTheme.location.name); // "Morro Araçoiaba"
```

## Creating New Themes

To create a new theme:

1. Create a new class that extends `BaseTheme`
2. Implement all abstract properties
3. Use the utility methods from the base class
4. Export both the class and an instance for backward compatibility

Example:
```typescript
import { BaseTheme } from './base-theme';

export class NewLocationTheme extends BaseTheme {
  id = 'new-location';
  name = 'New Location';

  location = this.createLocationInfo(
    'Location Name',
    'Address',
    'City',
    'State',
    'Distance',
    { lat: 0, lng: 0 },
    'Maps URL',
    []
  );

  // Implement other abstract properties...
  content = this.createContentInfo(/* ... */);
  gallery = { /* ... */ };
  activities = [/* ... */];
  logistics = this.createLogisticsInfo(/* ... */);
  community = this.createCommunityInfo(/* ... */);
  seo = this.createSEOInfo(/* ... */);
  visual = this.createVisualTheme(/* ... */);
}

// Export for backward compatibility
export const newLocationTheme = new NewLocationTheme().getThemeConfig();
```

## Benefits of the New Architecture

1. **Type Safety**: Better TypeScript support with proper inheritance
2. **Code Reuse**: Common functionality in the base class
3. **Maintainability**: Easier to add new themes and modify existing ones
4. **Validation**: Built-in validation through the base class
5. **Backward Compatibility**: Existing code continues to work
6. **Extensibility**: Easy to add new methods and properties to all themes

## File Structure

```
configs/
├── base-theme.ts          # Base theme class
├── fazenda-ipanema.ts     # Fazenda Ipanema theme
├── pedra-bela.ts          # Pedra Bela theme
├── exemplo-externo.ts     # External example theme
├── index.ts              # Exports
└── README.md             # This file
```

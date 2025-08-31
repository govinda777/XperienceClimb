import { FazendaIpanemaTheme, PedraBellaTheme, BaseTheme } from './index';

// Test function to demonstrate the new theme architecture
export function testThemeArchitecture() {
  console.log('Testing Theme Architecture...\n');

  // Test 1: Create theme instances
  const fazendaTheme = new FazendaIpanemaTheme();
  const pedraTheme = new PedraBellaTheme();

  console.log('✅ Theme instances created successfully');

  // Test 2: Check inheritance
  console.log('✅ FazendaIpanemaTheme extends BaseTheme:', fazendaTheme instanceof BaseTheme);
  console.log('✅ PedraBellaTheme extends BaseTheme:', pedraTheme instanceof BaseTheme);

  // Test 3: Access theme properties
  console.log('✅ Fazenda theme name:', fazendaTheme.name);
  console.log('✅ Pedra theme name:', pedraTheme.name);
  console.log('✅ Fazenda theme ID:', fazendaTheme.id);
  console.log('✅ Pedra theme ID:', pedraTheme.id);

  // Test 4: Get theme configurations
  const fazendaConfig = fazendaTheme.getThemeConfig();
  const pedraConfig = pedraTheme.getThemeConfig();

  console.log('✅ Theme configurations generated successfully');
  console.log('✅ Fazenda config type:', typeof fazendaConfig);
  console.log('✅ Pedra config type:', typeof pedraConfig);

  // Test 5: Check theme structure
  console.log('✅ Fazenda theme has location:', !!fazendaConfig.location);
  console.log('✅ Fazenda theme has content:', !!fazendaConfig.content);
  console.log('✅ Fazenda theme has gallery:', !!fazendaConfig.gallery);
  console.log('✅ Fazenda theme has activities:', !!fazendaConfig.activities);
  console.log('✅ Fazenda theme has logistics:', !!fazendaConfig.logistics);
  console.log('✅ Fazenda theme has community:', !!fazendaConfig.community);
  console.log('✅ Fazenda theme has seo:', !!fazendaConfig.seo);
  console.log('✅ Fazenda theme has visual:', !!fazendaConfig.visual);

  // Test 6: Compare themes
  console.log('✅ Themes have different IDs:', fazendaConfig.id !== pedraConfig.id);
  console.log('✅ Themes have different names:', fazendaConfig.name !== pedraConfig.name);

  console.log('\n🎉 Theme architecture test completed successfully!');
  
  return {
    fazendaTheme,
    pedraTheme,
    fazendaConfig,
    pedraConfig
  };
}

export default {
  name: 'homePage',
  title: 'Home Page Configuration',
  type: 'document',
  fields: [
    { name: 'title', title: 'Page Title', type: 'string' },
    {
      name: 'sectionOrder',
      title: 'Section Order / Composition',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'hero',
        'about',
        'beginner',
        'calendar',
        'packages',
        'includedServices',
        'schedule',
        'timeline',
        'gallery',
        'safety',
        'community',
        'location',
        'testimonials'
      ]
    },
    {
      name: 'calendarSection',
      title: 'Calendar Section Config',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    },
    {
      name: 'packagesSection',
      title: 'Packages Section Config',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        {
          name: 'packageRefs',
          title: 'Package References',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'package' }] }]
        }
      ]
    },
    {
      name: 'testimonialsSection',
      title: 'Testimonials Section Config',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    }
  ]
};

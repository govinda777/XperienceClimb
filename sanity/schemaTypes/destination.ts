export default {
  name: 'destination',
  title: 'Climbing Destination',
  type: 'document',
  fields: [
    { name: 'name', title: 'Destination Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug / Unique ID', type: 'slug', options: { source: 'name' }, validation: (Rule: any) => Rule.required() },
    { name: 'isPublished', title: 'Is Published?', type: 'boolean', initialValue: true },
    {
      name: 'eventStatus',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planned', value: 'planned' },
          { title: 'Active', value: 'active' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'planned',
    },

    // Visual identity, configured directly on the destination
    {
      name: 'visualConfig',
      title: 'Visual Identity (Color Palette)',
      type: 'object',
      fields: [
        { name: 'primaryColor', title: 'Primary Color (Hex)', type: 'string', initialValue: '#0ea5e9' },
        { name: 'primaryColorHover', title: 'Primary Hover Color (Hex)', type: 'string', initialValue: '#0284c7' },
        { name: 'primaryColorActive', title: 'Primary Active Color (Hex)', type: 'string', initialValue: '#0369a1' },
        { name: 'accentColor', title: 'Accent Color (Hex)', type: 'string', initialValue: '#38bdf8' },
        { name: 'backgroundColor', title: 'Page Background Color (Hex)', type: 'string', initialValue: '#f8fafc' },
        { name: 'surfaceColor', title: 'Surface / Card Color (Hex)', type: 'string', initialValue: '#ffffff' },
        { name: 'textColor', title: 'Primary Text Color (Hex)', type: 'string', initialValue: '#0f172a' },
        { name: 'textSecondaryColor', title: 'Secondary Text Color (Hex)', type: 'string', initialValue: '#475569' },
        { name: 'borderColor', title: 'Border Color (Hex)', type: 'string', initialValue: '#e2e8f0' },
        { name: 'gradientFrom', title: 'Gradient Start (Hex)', type: 'string', initialValue: '#0ea5e9' },
        { name: 'gradientTo', title: 'Gradient End (Hex)', type: 'string', initialValue: '#0369a1' },
        { name: 'heroOverlay', title: 'Hero Overlay (RGBA/Hex)', type: 'string', initialValue: 'rgba(15, 23, 42, 0.6)' },
        { name: 'cardBackground', title: 'Card Background (Hex)', type: 'string', initialValue: '#ffffff' }
      ]
    },

    // Location and directions
    {
      name: 'locationDetails',
      title: 'Location Details',
      type: 'object',
      fields: [
        { name: 'displayName', title: 'Sector Name', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'state', title: 'State', type: 'string', initialValue: 'São Paulo' },
        { name: 'distance', title: 'Distance from São Paulo', type: 'string' },
        { name: 'coordinates', title: 'Coordinates', type: 'geopoint' },
        { name: 'mapsUrl', title: 'Google Maps URL', type: 'url' },
        {
          name: 'directions',
          title: 'Directions',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Step', type: 'string' },
                { name: 'description', title: 'Directions', type: 'text', rows: 2 }
              ]
            }
          ]
        }
      ]
    },

    // Editorial content (Hero, About, Beginners)
    {
      name: 'content',
      title: 'Editorial Content',
      type: 'object',
      fields: [
        {
          name: 'hero',
          title: 'Hero Section',
          type: 'object',
          fields: [
            { name: 'title', title: 'Main Title', type: 'string' },
            { name: 'subtitle', title: 'Subtitle', type: 'string' },
            { name: 'description', title: 'Supporting Copy', type: 'text', rows: 3 },
            { name: 'backgroundImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true } },
            { name: 'ctaLabel', title: 'CTA Label', type: 'string' },
            { name: 'ctaHref', title: 'CTA Href', type: 'string' }
          ]
        },
        {
          name: 'about',
          title: 'About Destination',
          type: 'object',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string' },
            { name: 'description', title: 'History / Geology', type: 'text', rows: 4 },
            {
              name: 'highlights',
              title: 'Highlights',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'icon', title: 'Emoji Icon', type: 'string' },
                    { name: 'title', title: 'Title', type: 'string' },
                    { name: 'description', title: 'Description', type: 'string' }
                  ]
                }
              ]
            },
            {
              name: 'infoBox',
              title: 'Information Box / Facts',
              type: 'object',
              fields: [
                { name: 'title', title: 'Box Title', type: 'string' },
                { name: 'content', title: 'Content', type: 'text', rows: 4 }
              ]
            },
            { name: 'image', title: 'Featured Image', type: 'image', options: { hotspot: true } }
          ]
        }
      ]
    },

    // Beginners and safety
    {
      name: 'beginnerSection',
      title: 'Beginner Guidance',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        {
          name: 'highlights',
          title: 'Success Tips',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', title: 'Icon', type: 'string' },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 2 }
              ]
            }
          ]
        },
        { name: 'finalMessage', title: 'Closing Message', type: 'string' }
      ]
    },
    {
      name: 'safetySection',
      title: 'Safety and Equipment',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Introduction', type: 'text', rows: 2 },
        {
          name: 'safetyItems',
          title: 'Destination Safety Protocols',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', title: 'Icon', type: 'string' },
                { name: 'title', title: 'Protocol', type: 'string' },
                { name: 'description', title: 'General Rule', type: 'string' },
                { name: 'details', title: 'Details', type: 'array', of: [{ type: 'string' }] }
              ]
            }
          ]
        },
        {
          name: 'equipmentList',
          title: 'Required Equipment',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Equipment Name', type: 'string' },
                { name: 'required', title: 'Required?', type: 'boolean', initialValue: true },
                { name: 'provided', title: 'Provided by Xperience?', type: 'boolean', initialValue: true }
              ]
            }
          ]
        }
      ]
    },

    // Destination gallery
    {
      name: 'gallery',
      title: 'Destination Gallery',
      type: 'object',
      fields: [
        {
          name: 'images',
          title: 'Landscape and Climbing Photos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'image', title: 'Image File', type: 'image', options: { hotspot: true } },
                { name: 'alt', title: 'Alternative Text', type: 'string' },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'category', title: 'Category Filter (e.g. climb, nature)', type: 'string' }
              ]
            }
          ]
        },
        {
          name: 'categories',
          title: 'Tab Filters',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'key', title: 'Key (e.g. climb)', type: 'string' },
                { name: 'value', title: 'Display Label (e.g. Climbing)', type: 'string' }
              ]
            }
          ]
        }
      ]
    },

    // Local community and contacts
    {
      name: 'community',
      title: 'Destination Community Settings',
      type: 'object',
      fields: [
        {
          name: 'instructors',
          title: 'Responsible Instructors',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'instructor' }] }]
        },
        {
          name: 'partners',
          title: 'Local Partners / Support Points',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'partner' }] }]
        }
      ]
    },

    // Timeline and logistics
    {
      name: 'timeline',
      title: 'Daily Schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'time', title: 'Time', type: 'string' },
            { name: 'activity', title: 'Activity', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'logistics',
      title: 'Destination Logistics',
      type: 'object',
      fields: [
        { name: 'meetingPoint', title: 'Exact Meeting Point', type: 'string' },
        { name: 'importantNotes', title: 'Important Notes', type: 'array', of: [{ type: 'string' }] },
        { name: 'tips', title: 'Useful Tips for the Day', type: 'string', of: [{ type: 'string' }] },
        { name: 'groupSize', title: 'Group Size', type: 'string' },
        { name: 'included', title: 'Included in logistics', type: 'array', of: [{ type: 'string' }] },
        { name: 'notIncluded', title: 'Not Included in logistics', type: 'array', of: [{ type: 'string' }] },
        { name: 'requirements', title: 'Requirements', type: 'array', of: [{ type: 'string' }] }
      ]
    },
    {
      name: 'activities',
      title: 'Destination Activities',
      type: 'array',
      of: [{ type: 'string' }]
    },

    // SEO
    {
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      fields: [
        { name: 'title', title: 'Page Title (SEO)', type: 'string' },
        { name: 'description', title: 'Meta Description', type: 'text', rows: 2 },
        { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] },
        { name: 'ogImage', title: 'Social Sharing Image', type: 'image', options: { hotspot: true } },
        { name: 'noIndex', title: 'No Index', type: 'boolean', initialValue: false }
      ]
    }
  ]
};

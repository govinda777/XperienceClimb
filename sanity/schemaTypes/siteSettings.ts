export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'activeDestination',
      title: 'Active Destination for Next Event',
      description: 'The site renders this destination content and color palette by default.',
      type: 'reference',
      to: [{ type: 'destination' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'nextEventStartsAt',
      title: 'Next Event Start Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'contactInfo',
      title: 'Global Contact Information',
      type: 'object',
      fields: [
        { name: 'phone', title: 'WhatsApp / Phone', type: 'string' },
        { name: 'email', title: 'Business Email', type: 'string' },
        { name: 'instagram', title: 'Instagram (e.g. @xperiencehubs)', type: 'string' }
      ]
    },
    {
      name: 'footerSettings',
      title: 'Footer Settings',
      type: 'object',
      fields: [
        { name: 'certificationsText', title: 'Certification Label', type: 'string', initialValue: 'Xperience Certified' },
        { name: 'legalText', title: 'Legal / Copyright Text', type: 'string' }
      ]
    },
    {
      name: 'brand',
      title: 'Brand Configurations',
      type: 'object',
      fields: [
        { name: 'name', title: 'Brand Name', type: 'string' },
        { name: 'logo', title: 'Main Logo', type: 'image' },
        { name: 'logoAlt', title: 'Alternative Logo', type: 'image' },
        { name: 'favicon', title: 'Favicon', type: 'image' }
      ]
    },
    {
      name: 'navigation',
      title: 'Navigation Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'url', title: 'URL or Anchor', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'uiLabels',
      title: 'UI Text Reusable Labels',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key', title: 'Key', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'consent',
      title: 'Cookie Consent Settings',
      type: 'object',
      fields: [
        { name: 'text', title: 'Consent Message', type: 'text' },
        { name: 'policyUrl', title: 'Privacy Policy URL', type: 'string' }
      ]
    }
  ]
};

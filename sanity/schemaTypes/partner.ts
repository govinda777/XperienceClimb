export default {
  name: 'partner',
  title: 'Partner / Support Point',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'logo', title: 'Logo Image', type: 'image', options: { hotspot: true } },
    { name: 'websiteUrl', title: 'Website URL', type: 'url' },
    {
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      options: {
        list: [
          { title: 'Public', value: 'public' },
          { title: 'Contact Only', value: 'contactOnly' },
          { title: 'Hidden', value: 'hidden' },
        ],
        layout: 'radio',
      },
      initialValue: 'public',
    },
  ],
};

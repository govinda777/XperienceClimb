export default {
  name: 'visitedLocation',
  title: 'Visited / Historical Location',
  type: 'document',
  fields: [
    { name: 'name', title: 'Location Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule: any) => Rule.required() },
    { name: 'region', title: 'Region / State', type: 'string' },
    { name: 'image', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Historical / General Description', type: 'text', rows: 4 },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['planned', 'completed', 'active', 'archived'] },
      initialValue: 'completed'
    },
    { name: 'destination', title: 'Linked Destination', type: 'reference', to: [{ type: 'destination' }] }
  ]
};

export default {
  name: 'service',
  title: 'Included Service',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'iconKey', title: 'Icon Key (Emoji or Lucide name)', type: 'string' },
    { name: 'condition', title: 'Condition / Note', type: 'string' },
    { name: 'order', title: 'Display Order', type: 'number' }
  ]
};

export default {
  name: 'safetyProcedure',
  title: 'Safety Procedure / Protocol',
  type: 'document',
  fields: [
    { name: 'title', title: 'Protocol Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'description', title: 'General Rule / Intro', type: 'text', rows: 3 },
    { name: 'details', title: 'Details / Steps', type: 'array', of: [{ type: 'string' }] },
    { name: 'iconKey', title: 'Icon Key', type: 'string' },
    { name: 'order', title: 'Display Order', type: 'number' }
  ]
};

export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'name', title: 'Public Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'text', title: 'Testimonial Text', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
    { name: 'date', title: 'Date / Period', type: 'string' },
    { name: 'experience', title: 'Climbing Experience Level', type: 'string' },
    { name: 'rating', title: 'Rating (1-5)', type: 'number', validation: (Rule: any) => Rule.min(1).max(5) },
    { name: 'consent', title: 'Consent to Publish', type: 'boolean', initialValue: true },
    { name: 'order', title: 'Display Order', type: 'number' }
  ]
};

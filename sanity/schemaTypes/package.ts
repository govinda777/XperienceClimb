export default {
  name: 'package',
  title: 'Package',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
    {
      name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'kind', title: 'Type', type: 'string', initialValue: 'singleTrip',
      options: { list: [
        { title: 'Single Trip', value: 'singleTrip' },
        { title: 'Annual Membership', value: 'annual' },
      ], layout: 'radio' },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
    { name: 'description', title: 'Detailed Description', type: 'array', of: [{ type: 'block' }] },
    { name: 'badge', title: 'Badge', type: 'string' },
    { name: 'isFeatured', title: 'Feature Offer', type: 'boolean', initialValue: false },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    {
      name: 'includedItems', title: 'Included Items', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'iconKey', title: 'Icon Key', type: 'string' },
        { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'description', title: 'Description', type: 'string' },
      ] }],
    },
    {
      name: 'cta', title: 'Call to Action', type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'whatsAppMessage', title: 'WhatsApp Message Template', type: 'text', rows: 3 },
      ],
    },
    { name: 'termsUrl', title: 'Terms URL', type: 'url' },
    { name: 'cancellationPolicy', title: 'Cancellation Policy', type: 'text', rows: 3 },
    { name: 'eligibility', title: 'Eligibility Requirements', type: 'array', of: [{ type: 'string' }] },
    { name: 'isQuotation', title: 'Price on Request', type: 'boolean', initialValue: false },
    {
      name: 'priceInCents', title: 'Price in Cents', type: 'number',
      hidden: ({ parent }: any) => parent?.isQuotation,
      validation: (Rule: any) => Rule.integer().positive().custom((value: number, context: any) =>
        context.parent?.isQuotation || typeof value === 'number' ? true : 'Enter a price.'),
    },
    { name: 'currency', title: 'Currency', type: 'string', initialValue: 'BRL', readOnly: true },
    {
      name: 'commerceProductId', title: 'Checkout Product ID', type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'singleTripDestination', title: 'Single-Trip Destination', type: 'reference',
      to: [{ type: 'destination' }], hidden: ({ parent }: any) => parent?.kind !== 'singleTrip',
    },
    {
      name: 'annualSchedule', title: 'Annual Schedule', type: 'array',
      hidden: ({ parent }: any) => parent?.kind !== 'annual',
      of: [{ type: 'object', fields: [
        { name: 'startsAt', title: 'Starts At', type: 'datetime', validation: (Rule: any) => Rule.required() },
        { name: 'endsAt', title: 'Ends At', type: 'datetime' },
        { name: 'label', title: 'Display Label', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
        { name: 'status', title: 'Status', type: 'string', options: { list: ['planned', 'confirmed', 'completed', 'cancelled'] }, initialValue: 'planned' },
        { name: 'image', title: 'Image Override', type: 'image', options: { hotspot: true } },
        { name: 'destination', title: 'Destination', type: 'reference', to: [{ type: 'destination' }], validation: (Rule: any) => Rule.required() },
      ] }],
    },
  ],
  validation: (Rule: any) => [
    Rule.custom((doc: any) => {
      if (doc?.kind === 'annual' && !doc?.annualSchedule?.length) return 'An annual package requires at least one trip.';
      if (doc?.kind === 'singleTrip' && !doc?.singleTripDestination) return 'A single-trip package requires a destination.';
      return true;
    }),
  ],
};

/**
 * Professional journey. Only verified facts appear here.
 * A role is shown only when `confirmed: true`. Dates stay empty until you supply them.
 */
export const roles = [
  {
    id: 'positive-quadrant',
    dates: '',
    title: 'Full Stack Developer',
    org: 'Positive Quadrant Technologies',
    summary:
      'Software and automation work for jewellery manufacturing and business workflows: production dashboards, Windows automation and desktop tools.',
    confirmed: false,
    note: 'Harsh to confirm title, dates and scope before this is shown.',
  },
];

// Measured results from the projects, each traceable to that project's own benchmark or README.
export const milestones = [
  {
    title: 'Image search tested on real photos',
    text: 'Mean recall@20 of 0.96 against exact search on 38,759 catalogue photos.',
    project: 'image-search',
  },
  {
    title: 'Dashboard builder checked against a manual file',
    text: 'All 5,214 business rows matched the manually filtered sheet.',
    project: 'jemmy-builder',
  },
  {
    title: 'Gemisoft report export',
    text: 'Exports nine reports in one session and checks every saved file’s row count.',
    project: 'gemisoft-export',
  },
  {
    title: 'Order entry safety rule',
    text: 'A purchase order is marked Completed only after Gemisoft confirms the saved order number.',
    project: 'order-raising',
  },
];

// Add entries here when you want them shown. Nothing has been assumed.
export const education = [];

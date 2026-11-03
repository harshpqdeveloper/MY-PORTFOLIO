/**
 * Project 09: other business websites.
 *
 * `confirmed: false` entries show only in `npm run dev`. They never reach a production build.
 * Set `contribution` to what you actually did, add `technologies`, then set `confirmed: true`.
 * `evidence` is a note for you. It is not displayed.
 */
export const externalWebsites = [
  {
    id: 'positive-quadrant-site',
    name: 'Positive Quadrant',
    url: 'https://www.positivequadrant.in/',
    industry: 'IT services & consulting',
    contribution: '',
    technologies: [],
    status: 'Live website',
    screenshot: 'positivequadrant-home',
    confirmed: false,
    evidence:
      'Team section lists Harsh Vishwakarma as Full Stack Developer. That shows he works there, not who built this site.',
  },
  {
    id: 'techupgrad-site',
    name: 'TechUpgrad',
    url: 'https://techupgrad.in/',
    industry: 'IT training & education',
    contribution: '',
    technologies: [],
    status: 'Live website',
    screenshot: 'techupgrad-home',
    confirmed: false,
    evidence: 'Footer says "Designed and Developed by Positive Quadrant Technologies LLP". No individual is named.',
  },
  {
    id: 'wise-engineering-site',
    name: 'Wise Engineering Consultants',
    url: 'https://www.wiseengineeringconsultantspvt.ltd/',
    industry: 'Structural audit & project management',
    contribution: '',
    technologies: [],
    status: 'Live website',
    screenshot: 'wise-home',
    confirmed: false,
    evidence: 'No developer credit found on the home page.',
  },
  {
    id: 'barber-shop-site',
    name: 'Barber Shop Website',
    url: '',
    industry: 'Grooming',
    contribution: '',
    technologies: [],
    status: '',
    screenshot: null,
    confirmed: false,
    evidence:
      'A barber site exists on GitHub as O_BARBA, which is already Project 08. Delete this entry if it is the same project.',
  },
  {
    id: 'furniture-shop-site',
    name: 'Furniture Shop Website',
    url: '',
    industry: 'Furniture retail',
    contribution: '',
    technologies: [],
    status: '',
    screenshot: null,
    confirmed: false,
    evidence: 'Not found in the GitHub repository list.',
  },
  {
    id: 'real-estate-site',
    name: 'Real Estate Website',
    url: '',
    industry: 'Real estate',
    contribution: '',
    technologies: [],
    status: '',
    screenshot: null,
    confirmed: false,
    evidence: 'Not found in the GitHub repository list.',
  },
];

export const visibleWebsites = externalWebsites.filter((site) => site.confirmed || import.meta.env.DEV);

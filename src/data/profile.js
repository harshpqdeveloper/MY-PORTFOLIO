/**
 * Central profile. Everything personal on the site comes from here.
 *
 * Empty values are never shown to visitors. In `npm run dev` they appear as dashed
 * "add this" chips, so you can find what still needs filling in.
 */
export const profile = {
  name: 'Harsh',
  titleLines: ['Software Developer', '& Automation Engineer'],

  brandStatement:
    'I build intelligent software, automate complex business workflows and create digital experiences that solve real-world problems.',
  heroIntro:
    'From intelligent business dashboards to custom desktop automation and modern web applications — I turn ideas into working digital solutions.',

  // The red line in the hero cycles through these. Each one is a real project on this site.
  heroAccents: ['Business dashboards', 'Windows automation', 'Desktop applications', 'Image search', 'Modern websites'],

  location: 'Mumbai, India',
  // Shown as the availability indicator. Set `open: false` if you are not taking new work.
  availability: { open: true, label: 'Available for projects' },

  // Drop a file named portrait.webp / .png / .jpg into src/assets/profile/ and it appears in the hero and About.
  // Until then, an abstract figure is shown, not a photo.
  portraitAlt: 'Portrait of Harsh',

  contact: {
    email: '',
    linkedin: '',
    github: 'https://github.com/harshpqdeveloper',
    githubHandle: 'harshpqdeveloper',
    instagram: '',
    instagramHandle: '',
    // Set VITE_CONTACT_ENDPOINT in .env (see .env.example). The form reports success only on a 2xx reply.
    formEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',
  },
};

export const about = {
  paragraphs: [
    "I'm Harsh, a developer who enjoys solving real-world problems through software and automation.",
    'My work includes developing manufacturing dashboards, Windows automation applications, Excel-based workflows, intelligent image-search tools and modern websites.',
    'I focus on building practical tools that reduce repetitive work, improve visibility and make business processes more efficient.',
  ],
  independence:
    'I independently designed and developed most of my projects. Where I worked on an external website, the project page says what my part was.',
  areas: [
    'Software development',
    'Windows desktop applications',
    'Business process automation',
    'Jewellery manufacturing workflows',
    'Data processing & Excel automation',
    'Production dashboards',
    'Web development',
    'AI-assisted software development',
  ],
  interests: [
    'Making legacy desktop software scriptable',
    'Local, private AI that runs on an ordinary CPU',
    'Turning raw ERP exports into decisions',
    'Interfaces that feel considered',
  ],
  // Each principle is something the projects on this site actually do.
  philosophy: [
    {
      title: 'Stop rather than guess',
      text: 'When a screen or value is not what the automation expects, it stops and says why. A wrong entry in an ERP costs more than a pause.',
    },
    {
      title: 'Never touch the source',
      text: 'Input files are read, not changed. Originals stay exactly as the business left them.',
    },
    {
      title: 'Measure before claiming',
      text: 'Accuracy and speed are benchmarked, limits are written down, and unfinished work is labelled unfinished.',
    },
  ],
};

export const navigation = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'process', label: 'Process' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Toolkit. Every entry was found in a repository, a requirements file, a packaged build or a config
 * in this portfolio's source material. `foundIn` names where, so nothing is listed just because it is popular.
 */
export const skillGroups = [
  {
    title: 'Programming',
    note: 'Languages behind the projects',
    skills: [
      { name: 'Python', foundIn: 'Jewellery PO Extractor, Image Finder, Order Raising, Metal Tolerance' },
      { name: 'JavaScript', foundIn: 'MSJPL Dashboard, Demo Dashboard, OBARBA' },
      { name: 'TypeScript', foundIn: 'Next.js demo site (GitHub)' },
      { name: 'HTML & CSS', foundIn: 'OBARBA, Next.js demo site' },
      { name: 'AutoHotkey v1', foundIn: 'Gemisoft Dashboard Automation, Gemisoft Quotation Automation' },
      { name: 'Dart / Flutter', foundIn: 'Dash App (WebView wrapper)' },
    ],
  },
  {
    title: 'Windows Automation',
    note: 'Driving desktop software without guessing',
    skills: [
      { name: 'Pywinauto', foundIn: 'Metal Tolerance, Diamond Requirement, Diamond Purchase' },
      { name: 'PyWin32', foundIn: 'Order Raising, Gemisoft Ship Date Automation' },
      { name: 'UI Automation (comtypes)', foundIn: 'Gemisoft Report Export, Ship Date Automation' },
      { name: 'Windows Credential Manager', foundIn: 'Gemisoft Report Export' },
      { name: 'Keyboard & mouse automation', foundIn: 'Gemisoft Dashboard Automation, Quotation Automation' },
      { name: 'Scheduled tasks', foundIn: 'Gemisoft Dashboard Automation' },
    ],
  },
  {
    title: 'Data & Productivity',
    note: 'Where business data actually lives',
    skills: [
      { name: 'Microsoft Excel', foundIn: 'JIT templates, Jemmy Dashboard Builder' },
      { name: 'Excel COM (pywin32)', foundIn: 'Jemmy Dashboard Builder' },
      { name: 'OpenPyXL', foundIn: 'PDF to Excel, Jewellery PO Extractor, Order Raising' },
      { name: 'xlrd', foundIn: 'Diamond Purchase, Quotation Automation' },
      { name: 'pandas', foundIn: 'Jewellery PO Extractor' },
      { name: 'pdfplumber', foundIn: 'PDF to Excel, Jewellery PO Extractor' },
      { name: 'PyMuPDF', foundIn: 'Jewellery PO Extractor, Order Raising' },
      { name: 'Data validation & named ranges', foundIn: 'JIT templates' },
    ],
  },
  {
    title: 'AI & Search',
    note: 'Local models, measured results',
    skills: [
      { name: 'CLIP (ViT-B/32)', foundIn: 'Image Finder' },
      { name: 'sentence-transformers', foundIn: 'Image Finder' },
      { name: 'PyTorch (CPU)', foundIn: 'Image Finder' },
      { name: 'FAISS', foundIn: 'Image Finder' },
      { name: 'Tesseract OCR (optional)', foundIn: 'Jewellery PO Extractor, Order Raising' },
    ],
  },
  {
    title: 'Desktop Interfaces',
    note: 'Applications people open every day',
    skills: [
      { name: 'PySide6 / Qt', foundIn: 'App Hub, Image Finder, Order Raising' },
      { name: 'CustomTkinter', foundIn: 'PDF to Excel, Jewellery PO Extractor, Metal Tolerance' },
      { name: 'PyInstaller', foundIn: 'Most desktop builds' },
      { name: 'SQLite', foundIn: 'Image Finder, Order Raising' },
    ],
  },
  {
    title: 'Web Development',
    note: 'Verified from my repositories',
    skills: [
      { name: 'React', foundIn: 'MSJPL Dashboard, Demo Dashboard, OBARBA' },
      { name: 'Vite', foundIn: 'MSJPL Dashboard, Demo Dashboard, OBARBA' },
      { name: 'React Router', foundIn: 'OBARBA' },
      { name: 'Next.js', foundIn: 'Next.js demo site (GitHub)' },
      { name: 'Recharts', foundIn: 'MSJPL Dashboard, Demo Dashboard' },
      { name: 'Tailwind CSS', foundIn: 'Next.js demo site (GitHub)' },
      { name: 'GSAP & Framer Motion', foundIn: 'Next.js demo site (GitHub)' },
      { name: 'Supabase', foundIn: 'MSJPL Dashboard' },
      { name: 'Vercel', foundIn: 'MSJPL Dashboard, Demo Dashboard, OBARBA' },
      { name: 'Responsive design', foundIn: 'OBARBA' },
    ],
  },
  {
    title: 'Tools',
    note: 'How the work gets done',
    skills: [
      { name: 'GitHub', foundIn: 'Public repositories' },
      { name: 'VS Code', foundIn: 'Installed on my development PC' },
      { name: 'Claude Code', foundIn: 'Project folders include .claude settings' },
      { name: 'AI-assisted development', foundIn: 'Used across projects' },
      { name: 'pytest', foundIn: 'Image Finder, Order Raising, Jewellery PO Extractor' },
    ],
  },
];

export const marqueeTools = ['Python', 'React', 'Pywinauto', 'PySide6', 'AutoHotkey', 'FAISS', 'Supabase', 'OpenPyXL', 'Next.js', 'PyInstaller'];

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faRocket,
  faBook,
  faBookOpen,
  faBolt, 
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";

export interface NavItem {
  title: string;
  href: string;
  icon?: IconDefinition;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  links: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "GETTING STARTED",
    links: [
      { title: "Tutorials", href: "/tutorials", icon: faRocket },
      { title: "How-To Guides", href: "/guides", icon: faBook },
    ],
  },
  {
     title: 'REFERENCE',
        links: [
            {
                title: 'Core Features',
                href: '#', 
                icon: faBookOpen,
                children: [
                    { title: 'Advanced Panel', href: '/docs/reference-advanced' },
                    { title: 'Curve Editor', href: '/docs/reference-bezier' },
                    { title: 'Sliders Panel', href: '/docs/reference-sliders' },
                    { title: 'Keybinds', href: '/docs/reference-keybinds' },
                ],
            },
        ],
  },
  
  {
    title: 'ADVANCED TOPICS',
    links: [
      {
        title: 'Techniques',
        href: '#',
        icon: faBolt,
        children: [
          { title: 'Advanced Scripting', href: '/docs/advanced-scripting' },
          { title: 'Performance Tuning', href: '/docs/performance-tuning' },
        ]
      },
      {
        title: 'Networking',
        href: '#',
        icon: faBookOpen, 
        children: [
          { title: 'Networking Basics', href: '/docs/networking-basics' },
          { title: 'Replication Strategies', href: '/docs/replication-strategies' },
        ]
      }
    ]
  }
];

export const headerLinks = [
  {
    title: "GitHub",
    href: "https://github.com",
    icon: faGithub,
  },
  {
    title: "Join our Discord",
    href: "https://discord.com",
    icon: faDiscord,
  },
];
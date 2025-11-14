import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faRocket,
  faBook,
  faBookOpen,
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
                    // Corrected links to point to the new dynamic routes
                    { title: 'Advanced Panel', href: '/docs/reference-advanced' },
                    { title: 'Curve Editor', href: '/docs/reference-bezier' },
                    { title: 'Sliders Panel', href: '/docs/reference-sliders' },
                    { title: 'Keybinds', href: '/docs/reference-keybinds' },
                ],
            },
        ],
  },
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
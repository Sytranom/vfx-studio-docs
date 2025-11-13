import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faRocket,
  faBook,
  faBookOpen,
  faStar,
  faBezierCurve,
  faSliders,
  faKeyboard,
  faGithub,
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

export interface NavItem {
  title: string;
  href: string;
  icon?: IconDefinition; // Changed from required to optional
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
                    // Update the href to point to the new dynamic route
                    { title: 'Advanced Panel', href: '/docs/reference-advanced' },
                    { title: 'Curve Editor', href: '/reference-bezier' },
                    { title: 'Sliders Panel', href: '/reference-sliders' },
                    { title: 'Keybinds', href: '/reference-keybinds' },
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

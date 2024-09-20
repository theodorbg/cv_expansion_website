import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconBriefcase,
  IconHammer,
  IconTerminal2,
  IconChess,
  IconMail
} from "@tabler/icons-react";

const iconClassname = "h-full w-full text-neutral-500 dark:text-neutral-300";
const links = [
    {
      title: "Home",
      icon: (
        <IconHome className={iconClassname} />
      ),
      href: "#home",
    },

    {
      title: "Work Experience",
      icon: (
        <IconBriefcase className={iconClassname} />
      ),
      href: "#experience",
    },
    {
      title: "Projects",
      icon: (
        <IconHammer className={iconClassname} />
      ),
      href: "#projects",
    },
    {
      title: "Skills",
      icon: (
        <IconTerminal2 className={iconClassname} />
      ),
      href: "#skills",
    },

    {
      title: "Hobies",
      icon: (
        <IconChess className={iconClassname} />
      ),
      href: "#hobies",
    },
    {
      title: "Contact me",
      icon: (
        <IconMail className={iconClassname} />
      ),
      href: "#contact",
    },

    
  ];


export default function Navbar() {
    return (
        <div className="flex items-center justify-center z-50" style={{ position: 'fixed', bottom: '40px' , left: '50%', transform: 'translateX(-50%)' }}>
        <FloatingDock
          items={links}
        />
      </div>
    )
}
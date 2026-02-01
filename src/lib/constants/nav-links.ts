import {
  Building2,
  Circle,
  Contact,
  Heart,
  House,
  Info,
  LogIn,
  PackageSearch,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const navbarLinks = [
  {
    id: 1,
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    id: 2,
    label: "About Us",
    href: "/about-us",
    icon: Info,
  },
  {
    id: 3,
    label: "Services",
    href: "/services",
    icon: PackageSearch,
  },
  {
    id: 4,
    label: "Our Agents",
    href: "/our-agents",
    icon: Building2,
  },
  {
    id: 5,
    label: "Favorites",
    href: "/favorites",
    icon: Heart,
  },
  {
    id: 6,
    label: "Login",
    href: "/login",
    icon: LogIn,
  },
  {
    id: 7,
    label: "Register",
    href: "/register",
    icon: LogIn,
  },
  {
    id: 8,
    label: "Verify Agent",
    href: "",
    icon: ShieldCheck,
  },
  {
    id: 9,
    label: "Contact Us",
    href: "/contact-us",
    icon: Contact,
  },
  {
    id: 10,
    label: "Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    id: 11,
    label: "Hansy Circle",
    href: "/hansy-circle",
    icon: Circle,
  },
];

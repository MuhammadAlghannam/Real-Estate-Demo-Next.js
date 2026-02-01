import { LockKeyhole, Trash2, UserRound } from "lucide-react";

export const profileSidebarLinks = [
  {
    id: 1,
    label: "profile-details",
    href: "/profile",
    icon: UserRound,
  },
  {
    id: 2,
    label: "password",
    href: "/profile/password",
    icon: LockKeyhole,
  },
  // {
  //   id: 3,
  //   label: "my-properties",
  //   href: "/profile/my-properties",
  //   icon: House,
  // },
  {
    id: 4,
    label: "delete-account",
    href: "",
    type: "action",
    icon: Trash2,
  },
];

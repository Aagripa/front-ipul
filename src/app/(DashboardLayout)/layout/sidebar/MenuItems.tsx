import {
  IconChecklist,
  IconCopy,
  IconLayoutDashboard,
  IconUsersGroup,
  IconTypography,
  IconAlbum,
  IconAddressBook
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    id: uniqueId(),
    title: "User Data",
    icon: IconAddressBook,
    href: "/member-page",
  },

  {
    navlabel: true,
    subheader: "Plan",
  },

  {
    id: uniqueId(),
    title: "Teams",
    icon: IconUsersGroup,
    href: "/team-page",
  },
  {
    id: uniqueId(),
    title: "Projects",
    icon: IconAlbum,
    href: "/project-page",
  },
];

export default Menuitems;

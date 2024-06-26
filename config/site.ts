export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Chrome Extension",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Products",
      href: "/",
      color: "foreground",
    },
    {
      label: "Chrome Extension",
      href: "/keys",
      color: "foreground",
    },
    {
      label: "Logout",
      href: "/logout",
      color: "danger",
    },
  ],
  navMenuItems: [
    {
      label: "Products",
      href: "/",
      color: "foreground",
    },
    {
      label: "API Keys",
      href: "/keys",
      color: "foreground",
    },
    {
      label: "Logout",
      href: "/logout",
      color: "danger",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui-docs-v2.vercel.app",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

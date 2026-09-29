export const profile = {
  name: "Clopes",
  brand: "Clopes Code",
  avatar: "/images/clopes-avatar.webp",
  siteUrl: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://clopes1997.github.io/clopes.dev"
  ).replace(/\/$/, ""),
  githubUsername: "Clopes1997",
  github: "https://github.com/Clopes1997/",
  email: "clopescode97@gmail.com" as string | null,
};

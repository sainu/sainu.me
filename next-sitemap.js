module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: true,
  generateRobotsTxt: true,
  sourceDir: ".next",
  outDir: "public",
}

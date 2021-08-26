/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    SITE_URL: process.env.SITE_URL,
  },
}

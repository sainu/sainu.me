/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    SITE_URL: process.env.SITE_URL,
    SITE_NAME: process.env.SITE_NAME,

    OGP_IMAGE_URL: process.env.OGP_IMAGE_URL,
  },
}

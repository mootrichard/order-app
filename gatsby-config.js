require("dotenv").config({
  path: `.env`,
})

module.exports = {
  proxy: {
    prefix: "/square",
    url: "http://localhost:3000",
  },
  siteMetadata: {
    title: `Square Swag Shop`,
    description: `Square Swag to Look Cool`,
    author: `@mootrichard`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#F7F8F9`,
        theme_color: `#F7F8F9`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-square-catalog`,
      options: {
        accessToken: process.env.SQUARE_ACCESS_TOKEN
      }
    },
    {
      resolve: `gatsby-plugin-well-known`,
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}

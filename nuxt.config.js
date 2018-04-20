const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  head: {
    title: "Special Tech Events",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Votes on rumors for your favorites special events"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  css: ["bulma-timeline/dist/bulma-timeline.min.css"],
  loading: { color: "#3B8070" },
  serverMiddleware: ["./api/auth"],
  modules: ["nuxt-bulma-slim", "@nuxtjs/axios", "@nuxtjs/auth"],
  auth: {
    strategies: {
      auth0: {
        domain: "borre.eu.auth0.com",
        client_id: "MmlIbeymuksf4XdWCiGcf4jOKds4AgPa"
      }
    }
  },
  build: {
    vendor: ["graphql-fetch"],
    analyze: false,
    extractCSS: false,
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }

      if (!isDev) {
        config.plugins.push(
          new CompressionPlugin({
            exclude: [
              /vue-ssr-client-manifest.json/,
              /index.(?:ssr|spa).html/,
              /server-bundle.json/
            ]
          })
        );
      }
    }
  }
};

const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  head: {
    title: "specialtechevents-nuxt",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: { color: "#3B8070" },
  modules: [
    "nuxt-bulma-slim",
    "@nuxtjs/apollo",
    "@nuxtjs/axios",
    "@nuxtjs/auth"
  ],
  apollo: {
    clientConfigs: {
      default: "~/apollo/client-configs/default.js"
    }
  },
  auth: {
    strategies: {
      auth0: {
        domain: "borre.eu.auth0.com",
        client_id: "MmlIbeymuksf4XdWCiGcf4jOKds4AgPa"
      }
    }
  },
  build: {
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

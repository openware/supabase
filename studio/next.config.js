const { withSentryConfig } = require('@sentry/nextjs')
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const nextConfig = {
  basePath: '/admin',
  async redirects() {
    return [
      {
        source: '/admin/project/:ref/auth',
        destination: '/admin/project/:ref/auth/users',
        permanent: true,
      },
      {
        source: '/admin/project/:ref/database',
        destination: '/admin/project/:ref/database/tables',
        permanent: true,
      },
      {
        source: '/admin/project/:ref/storage',
        destination: '/admin/project/:ref/storage/buckets',
        permanent: true,
      },
      {
        source: '/admin/project/:ref/settings',
        destination: '/admin/project/:ref/settings/general',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*?)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/img/:slug*',
        headers: [{ key: 'cache-control', value: 'max-age=2592000' }],
      },
      {
        source: '/admin/fonts/:slug*',
        headers: [{ key: 'cache-control', value: 'max-age=2592000' }],
      },
    ]
  },
  images: {
    domains: ['github.com'],
  },
}

// Export all config
const moduleExports = withPlugins([[withBundleAnalyzer({})]], nextConfig)

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = nextConfig

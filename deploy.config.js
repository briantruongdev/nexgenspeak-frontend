/**
 * Deployment Configuration
 * Centralized configuration for frontend deployment
 */

module.exports = {
  // AWS Configuration
  aws: {
    s3Bucket: 'nexgenspeak.com',
    cloudfrontDistributionId: 'E1MXX4MJGVTO48',
    profile: 'canh',
    region: 'ap-southeast-1'
  },

  // Build Configuration
  build: {
    directory: 'dist',
    sourceDirectory: 'src'
  },

  // Deployment Options
  deployment: {
    // Files to exclude from deployment
    exclude: ['*.map', '.DS_Store', 'Thumbs.db'],

    // Cache control settings for different file types
    cacheControl: {
      '*.html': 'no-cache, no-store, must-revalidate',
      '*.js': 'public, max-age=31536000',
      '*.css': 'public, max-age=31536000',
      '*.png': 'public, max-age=31536000',
      '*.jpg': 'public, max-age=31536000',
      '*.jpeg': 'public, max-age=31536000',
      '*.gif': 'public, max-age=31536000',
      '*.svg': 'public, max-age=31536000',
      '*.ico': 'public, max-age=31536000',
      '*.woff': 'public, max-age=31536000',
      '*.woff2': 'public, max-age=31536000',
      '*.ttf': 'public, max-age=31536000',
      '*.eot': 'public, max-age=31536000'
    }
  },

  // Environment-specific settings
  environments: {
    development: {
      s3Bucket: 'nexgenspeak-dev.com',
      cloudfrontDistributionId: 'DEV_DISTRIBUTION_ID'
    },
    production: {
      s3Bucket: 'nexgenspeak.com',
      cloudfrontDistributionId: 'E1MXX4MJGVTO48'
    }
  }
}

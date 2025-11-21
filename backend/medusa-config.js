const DATABASE_URL = process.env.DATABASE_URL;
const REDIS_URL = process.env.REDIS_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const STRIPE_API_KEY = process.env.STRIPE_API_KEY;

module.exports = {
  projectConfig: {
    databaseUrl: DATABASE_URL,
    databaseType: "postgres",
    redisUrl: REDIS_URL,
    jwtSecret: JWT_SECRET,
    cookieSecret: COOKIE_SECRET,
  },
  plugins: [
    {
      resolve: `medusa-payment-stripe`,
      options: { api_key: STRIPE_API_KEY, webhook_secret: process.env.STRIPE_WEBHOOK_SECRET },
    },
    {
      resolve: `@medusajs/file-local`, // Switch to S3 later
    },
    {
      resolve: `@medusajs/file-uploadthing`,
      options: {
        uploadthing_secret: process.env.UPLOADTHING_SECRET,
        uploadthing_app_id: process.env.UPLOADTHING_APP_ID,
      },
    },
  ],
};

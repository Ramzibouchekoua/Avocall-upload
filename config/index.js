import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

// Try default .env from process cwd first, then explicit project-root fallback.
dotenv.config();
dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development').description('Environment'),
    HOST: Joi.string().required().description('Host name'),
    PORT: Joi.number().default(3000).description('Server port'),
    MONGODB_URI: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    EMAIL_TO: Joi.string().required().description('Default recipient for system emails'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  host: envVars.HOST,
  mongoose: {
    uri: envVars.MONGODB_URI,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
  email: {
    secret: envVars.MAIL_SECRET,
    to: envVars.EMAIL_TO, // Default recipient for system emails
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      secure: false, // false for port 587
      auth: {
        user: envVars.SMTP_USERNAME, // Use SMTP_USERNAME for authentication
        pass: envVars.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};

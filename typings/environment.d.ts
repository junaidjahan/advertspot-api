declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: string | number;
      MAIL_USER: string;
      MAIL_PASS: string;
      URL: string;
      DATABASE_CONNECTION_STRING: string;
      ACCESS_TOKEN_SECRET: string;
      ACCESS_TOKEN_EXPIRES_IN: string;
      REFRESH_TOKEN_SECRET: string;
      REFRESH_TOKEN_EXPIRES_IN: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

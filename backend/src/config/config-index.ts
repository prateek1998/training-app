interface Config {
  jwtSecret: string;
}

const config: Config = {
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
  // Add other configuration options as needed
};

export default config;

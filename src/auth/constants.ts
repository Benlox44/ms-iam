export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'your_secret_key',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_key',
  };
export default () => {
  const {
    NODE_ENV,
    DB_NAME,
    DB_USER,
    DB_HOST,
    DB_PASSWORD,
    PORT,
    HOST,
    SECRET,
    DEV_PORT,
    DEV_HOST,
  } = process.env

  return {
    DB_NAME,
    DB_USER,
    DB_HOST,
    DB_PASSWORD,
    SECRET,
    PORT: NODE_ENV === 'development' ? DEV_PORT : PORT,
    HOST: NODE_ENV === 'development' ? DEV_HOST : HOST,
  }
}

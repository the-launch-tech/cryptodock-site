export default () => {
  const { NODE_ENV, HOST, PORT, SERVER_PORT, DEV_HOST, DEV_SERVER_PORT, DEV_PORT } = process.env

  return {
    host: NODE_ENV === 'development' ? DEV_HOST : HOST,
    srvport: NODE_ENV === 'development' ? DEV_SERVER_PORT : SERVER_PORT,
    port: NODE_ENV === 'development' ? DEV_PORT : PORT,
  }
}

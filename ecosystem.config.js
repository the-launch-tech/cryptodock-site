module.exports = {
  apps: [
    {
      name: 'cryptodock',
      script: 'npm run prod',
      exec_mode: 'cluster',
      instances: 'max',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}

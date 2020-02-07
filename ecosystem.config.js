module.exports = {
  apps: [
    {
      name: 'cryptodock',
      script: 'npm run prod',
      cwd: '/cryptodock/dist',
      exec_mode: 'cluster',
      instances: 'max',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}

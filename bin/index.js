#!/usr/bin/env node

require('dotenv').config()

const path = require('path')
const program = require('commander')
const chalk = require('chalk')
const helpers = require('./helpers')

const { log, error } = console

program.version('0.0.1', '-v, --vers', 'Current CryptoDock Site CLI Version')

program
  .command('migrate <action>')
  .description('Run Migration File')
  .action(fileName => {
    const Conn = require('the_launch-mysql-layer').Conn

    const Connection = new Conn({
      hostname: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true,
    })

    helpers
      .readFile(path.join('static', `${fileName}.sql`), false)
      .then(contents => contents.replace(/(\r\n|\n|\r)/gm, ' '))
      .then(contents => contents.replace(/\s+/g, ' '))
      .then(contents => contents.trim())
      .then(contents => Connection.asyncQuery(contents))
      .then(data => log(chalk.green('Migration Succesful', data)))
      .then(() => Connection.end())
      .catch(e => {
        Connection.end()
        error(chalk.red('Migration Failed', e))
      })
  })

program.parse(process.argv)

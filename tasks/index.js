const cron = require('node-cron')
const config = require('../config')

module.exports = cron.schedule(config.cron.time, () => {
  console.log(
    'Running task every minute'
  )
})  
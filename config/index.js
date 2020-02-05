const config = {
  scanner: {
    PROVERBIA: 'https://proverbia.net/',
    GOODREADS: {
      widsom: 'https://goodreads.com/quotes/tag/widsom'
    }

  },
  cron: {
    time: '* * * * *'
  },
  server: {
    port: 3000
  }
}


module.exports = config
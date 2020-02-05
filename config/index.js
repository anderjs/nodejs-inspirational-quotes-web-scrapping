const config = {
  scanner: {
    PROVERBIA: 'https://proverbia.net/',
    GOODREADS: {
      widsom: 'https://www.goodreads.com/quotes/tag/wisdom'
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
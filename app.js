const cheerio = require('cheerio')
const fs = require('fs')
const request = require('request')
const path = require('path')

const config = require('./config')

const store = {
  $: null,
  scanner: {
    tag: 'blockquote'
  },
  storage: {
    dirname: path.join(__dirname, 'content', 'index.json')
  },
  content: [],
  utils: {
    regExp: /\s\s+/g
  }
}


/**
 * @description
 * Fetching our web to scrapping.
 */
request(config.scanner.PROVERBIA, 
  /**
   * @param {Error} err
   * @param {any} res
   * @param {string} body
   */
  (err, res, body) => {
  if (!err && res.statusCode === 200) {
    store.$ = cheerio.load(body, {
      normalizeWhitespace: true,
    })
  }

 
  /**
   * Getting our content from the tag.
   * @type {string}
   */
  store.$(store.scanner.tag).each(function(index, element) {

    const { $, utils  } = store
    
    /**
     * We got here the text of each author.
     * @type {string}
     */
    const text = $(this).remove('footer').text().replace(utils.regExp, '')

    store.content.push(text)
  })

  store.content = store.content.map(
    /**
     * @param {string} element
     */
    element => {
    const getLastDot = element.lastIndexOf('.')

    return {
      text: element.substr(0, getLastDot),
      category: element.substr(getLastDot + 1, element.length)
    }
  })


  return fs.writeFileSync(store.storage.dirname, JSON.stringify(store.content, null, 2))
})
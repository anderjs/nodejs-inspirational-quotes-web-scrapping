const cheerio = require('cheerio')
const fs = require('fs')
const request = require('request')
const path = require('path')

const config = require('./config')
const tasks = require('./tasks')

const store = {
  $: null,
  scanner: {
    tag: 'blockquote',
    author: ['a', 'title']
  },
  storage: {
    dirname: path.join(__dirname, 'content', 'index.json')
  },
  content: [],
  children: [],
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

  const [ selector, attribute ] = store.scanner.author


  store.$(store.scanner.tag).children('p').each(function(index, element) {
    const { $, utils } = store

    const text = $(this).remove('footer').text().replace(utils.regExp, '')

    store.children.push(text)
  })

  store.$(store.scanner.tag).children('footer').each(function(index, element) {
    const { $, utils } = store

    /**
     * @type {string}
     */
    const quote = $(this).find('a').next().text()

    const author = $(this).find('a').attr('title')

    store.content.push({
      quotation: Boolean(quote) ? quote.substr(0, quote.lastIndexOf('.')) : '?',
      author: author.replace('Frases de ', '')
    })
  })


  store.children = store.children.map((phrase, index) => ({
    phrase,
    ...store.content[index]
  }))

  console.log(store.children)


  return fs.writeFileSync(store.storage.dirname, JSON.stringify(store.children, null, 2))
})
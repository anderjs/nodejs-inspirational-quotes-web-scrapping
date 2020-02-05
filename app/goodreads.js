const cheerio = require("cheerio");
const fs = require("fs")
const path = require("path")
const request = require("request")

const config = require("../config")

const store = {
  $: null,
  scanner: {
    tag: ".quoteText",
    resources: {
      image: '.quoteDetails'
    }
  },
  storage: {
    dirname: path.join(__dirname, "../", "content", "goodreads.json")
  },
  content: [],
  children: [],
  utils: {
    regExp: /\s\s+/g
  },
  keys: {
    match: '―'
  }
}


request(
  config.scanner.GOODREADS.widsom
  /**
   * @param {Error} err
   * @param {any} res
   * @param {string} body
   */,
  (err, res, body) => {

    if (!err && res.statusCode === 200) {
      store.$ = cheerio.load(body, {
        normalizeWhitespace: true
      })
    }

    const { $, utils } = store

    $(store.scanner.tag).each(function(index, element) {
      const data = $(this).remove('br').text().replace(utils.regExp, '')

      const [ quote, author ] = data.split(store.keys.match)

      const goodreads = {
        quote,
        author
      }

      store.content.push(
        goodreads
      )
    })

    $(store.scanner.resources.image).each(function(index, element) {
      const data = $(this).find('img').attr('src')

      store.content[index].src = data
    })


    return fs.writeFileSync(store.storage.dirname, JSON.stringify(store.content, null, 2))
  }
)

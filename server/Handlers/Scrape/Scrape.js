import puppeteer from 'puppeteer'
import letters from './letters'

export default async function (request, h) {
  const STATUS_SELECTOR = '#beta > div > h2'
  let domains = []

  const {
    domain,
    pattern,
    place,
    num
  } = request.payload

  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    let word = ''
    let words = []
    let count = 0

    for (let i = 0; i < num; i++) {
      count++
      if (count > 30) {
        await browser.close()
        return h.response(domains).code(200)
      }
      for (const p of pattern) {
        word += p === 'v'
          ? letters.vowels[Math.floor(Math.random() * letters.vowels.length)]
          : letters.consonants[Math.floor(Math.random() * letters.consonants.length)]
      }

      if (words.includes(word)) {
        word = ''
        i--
        continue
      } else {
        words.push(word)
      }

      const fullDomain = place === 'end'
        ? `${domain}${word}.com`
        : `${word}${domain}.com`

      await page.goto(`https://domainr.com/${fullDomain}`)
      await page.waitForSelector('.status')

      const status = await page.evaluate(sel => {
        let elm = document.querySelector(sel)
        if (elm) {
          if (elm.textContent.trim() === 'Available') {
            return 'Available'
          } else {
            return 'nah'
          }
        }
      }, STATUS_SELECTOR)

      if (status === 'nah') {
        word = ''
        i--
        continue
      }

      domains.push({
        name: `${fullDomain}`,
        status
      })

      word = ''
    }

    await browser.close()
    return h.response(domains).code(200)
  } catch (error) {
    await error.browser.close()
    return h.response({ errorMessage: error.message }).code(500)
  }
}

import * as cheerio from 'cheerio'

export const htmlParser = (html: string, lang: string) => {
  const newHtml = `<html><body>${html}</body></html>`
  const $ = cheerio.load(newHtml);
  const text = $('c-wiz')?.text() || $.text() || ''
  
  return text

};
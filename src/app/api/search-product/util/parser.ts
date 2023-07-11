import * as cheerio from 'cheerio'

export const htmlParser = (html: string) => {
  const newHtml = `<html><body>${html}</body></html>`
  const $ = cheerio.load(newHtml);

  const visualMatchesEl = $('div')?.filter((i, el: any) => $(el)?.text() === 'Visual matches')
  const visualMatchesBodyEl = visualMatchesEl?.next()
  return $(visualMatchesBodyEl)?.text() || ''
};
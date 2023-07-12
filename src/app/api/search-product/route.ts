import { extractPhraseKey, googleLenHandler } from './util/index'
import { htmlParser } from './util/parser'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const imgUrl = searchParams.get('imgUrl') || ''
    const lang = searchParams.get('lang') || 'ja'

    if (!imgUrl) {
      return new Response("Error", {
        status: 500,
      })
    }
    const html = await googleLenHandler(imgUrl, lang)
    const rawText = htmlParser(html as string, lang)
    if (!rawText) {
      return NextResponse.json({ error: 'Not found.' }, { status: 500 })
    }
    const phraseKey: any = await extractPhraseKey(rawText.replace(/[`|(|)|"|']/g, ''))
    return NextResponse.json({ data: phraseKey }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Extract phrase key failed." }, { status: 500 })
  }
}
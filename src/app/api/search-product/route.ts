import { extractPhraseKey, googleLenHandler } from './util/index'
import { htmlParser } from './util/parser'

export async function GET() {
  try {
    const imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkWmM5BudiltGBlHXjejHh4WdJJVlBd1WQ2g&usqp=CAU'
    const html = await googleLenHandler(imgUrl)
    const rawText = htmlParser(html as any)
    const phraseKey: any = await extractPhraseKey(rawText)
    return new Response(phraseKey, {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response("Error", {
      status: 500,
    })
  }
}
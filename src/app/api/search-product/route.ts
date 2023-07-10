import { test } from './util/index'

export async function GET() {
  const data: any = await test()
  return new Response(data, {
    status: 200,
  })
}
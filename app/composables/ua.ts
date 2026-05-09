import { UAParser } from 'ua-parser-js'

export const uaParser = (userAgent: string) => {
  const parser = new UAParser(userAgent)
  return parser
}

import Parser from "rss-parser"
import 'dotenv/config'

const ZENN_URL = 'https://zenn.dev'
const QIITA_URL = 'https://qiita.com'

const getTitleAndPath = (feed: any, replaceUrl: string): Array<any> => {
  if (!feed || !feed.items) throw new Error(`no feed: ${replaceUrl}`);

  return feed.items.map((record: any) => {
    return {
      title: record?.title || 'empty title',
      path: (record?.link || 'empty title').replace(replaceUrl, ''),
    }
  })
}

const outputTitleAndPath = (target: string, records: Array<any>) => {
  if (!records) throw new Error(`no title and path: ${target}`);

  console.log(`${target}: output start >>>>>>>>>>>>>>>>>>>>>>>>>>`)
  records.forEach((record: any) => {
    console.log(record.title + "\t" + record.path)
  })
  console.log(`${target}: output end <<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
  console.log('')
}

(async () => {
  const parser = new Parser()
  // @ts-ignore
  const feedForZenn = await parser.parseURL(`${ZENN_URL}/${process.env.ZENN_USER_NAME}/feed`)
  const resultsByZenn = getTitleAndPath(feedForZenn, ZENN_URL)
  outputTitleAndPath('zenn', resultsByZenn)

  // @ts-ignore
  const feedForQiita = await parser.parseURL(`${QIITA_URL}/${process.env.ZENN_USER_NAME}/feed`)
  const resultsByQiita = getTitleAndPath(feedForQiita, QIITA_URL)
  outputTitleAndPath('qiita', resultsByQiita)
})();


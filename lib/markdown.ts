import { unified } from 'unified'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import fs from 'fs'
import matter from 'gray-matter'

export type MarkdownParseResult<M> = {
  meta: M,
  content: string
}

export const parseFile = async <M>(filepath: string): Promise<MarkdownParseResult<M>> => {
  const fileBody = fs.readFileSync(filepath, { encoding: 'utf-8' })

  const { data, content } = parseFileBody(fileBody)

  return {
    meta: data as M,
    content: await mdToHtml(content),
  }
}

/*
 * ファイル内容を解析してmarkdownのメタデータ部分とコンテンツ部分に分ける
 */
const parseFileBody = (str: string): matter.GrayMatterFile<string> => {
  return matter(str)
}

/*
 * シンタックスツリー: https://github.com/unifiedjs/unified#syntax-trees
 *    esast — JS
 *    hast — HTML
 *    mdast — Markdown
 *    nlcst — Natural language
 *    xast — XML
 * プロセッサ: https://github.com/unifiedjs/unified#list-of-processors
 *    rehype (hast) — HTML
 *    remark (mdast) — Markdown
 *    retext (nlcst) — Natural language
 */
const mdToHtml = async(str: string): Promise<string> => {
  return (await unified()
    .use(remarkParse) // markdownをmdastに変換する
    .use(remarkRehype, { allowDangerousHtml: true }) // mdastをHASTに変換する
    .use(rehypeHighlight) // markdown内のコードブロックにシンタックスハイライト用のHTMLを追加する
    .use(rehypeStringify) // HASTをHTMLに文字列化する
    .process(str))
    .toString()
}

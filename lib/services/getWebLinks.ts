import { WebLink } from "lib/models/webLink";

export const getWebLinks = (): WebLink[] => {
  return [
    {
      title: "職務経歴",
      url: "https://github.com/sainu/resume",
    },
    {
      title: "ブログ",
      url: "https://sainu.hatenablog.jp/",
    },
  ]
}

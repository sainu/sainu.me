import { SocialLink } from "lib/models/socialLink";

export const getSocialLinks = (): SocialLink[] => {
  return [
    {
      name: "GitHub",
      url: "https://github.com/sainu",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/sainuio",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/sainou.katsutoshi",
    },
    {
      name: "Wantedly",
      url: "https://www.wantedly.com/id/sainu",
    },
    {
      name: "Qiita",
      url: "https://qiita.com/sainu",
    },
  ]
}

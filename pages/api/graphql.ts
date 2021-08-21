import { ApolloServer, gql } from 'apollo-server-micro'
import { NextApiRequest, NextApiResponse, PageConfig } from 'next'

const typeDefs = gql`
  type Query {
    profile: Profile
    webLinks: [WebLink]
    socialLinks: [SocialLink]
    skills: [Skill]
  }
  type Profile {
    familyNameKanji: String
    givenNameKanji: String
    familyNameKana: String
    givenNameKana: String
    familyNameEn: String
    givenNameEn: String
    nickname: String
    imageUrl: String
    job: String
    email: String
    bio: String
    location: String
  }
  type WebLink {
    title: String
    url: String
  }
  type SocialLink {
    name: String
    url: String
  }
  type Skill {
    name: String
    score: Int
  }
`

const resolvers = {
  Query: {
    profile() {
      return {
        familyNameKanji: "道祖",
        givenNameKanji: "克理",
        familyNameKana: "さいのう",
        givenNameKana: "かつとし",
        familyNameEn: "Saino",
        givenNameEn: "Katsutoshi",
        nickname: "sainu",
        imageUrl: "/images/profileImage.jpg",
        job: "Software Program Developer",
        email: "katsutoshi.saino@gmail.com",
        bio: "東京都出身のエンジニア。大学在学中にインターンや受託でWeb開発を経験。" +
          "その後、個人開発を経て、お金の会社に就職。" +
          "Railsでのサーバー開発から始まり、JSのFW(AngularやNuxt)を使ったフロントエンド開発、" +
          "AWSでインフラの構築を経験してきました。",
        location: "Tokyo",
      }
    },
    webLinks() {
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
    },
    socialLinks() {
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
    },
    skills() {
      return [
        {
          name: "TypeScript",
          score: 50,
        },
        {
          name: "Ruby",
          score: 60,
        },
        {
          name: "Go",
          score: 40,
        },
        {
          name: "Ruby on Rails",
          score: 67,
        },
        {
          name: "Vue.js",
          score: 58,
        },
        {
          name: "Nuxt.js",
          score: 55,
        },
        {
          name: "React.js",
          score: 48,
        },
        {
          name: "Next.js",
          score: 45,
        },
        {
          name: "MySQL",
          score: 55,
        },
        {
          name: "Redis",
          score: 55,
        },
        {
          name: "Docker",
          score: 53,
        },
        {
          name: "S3",
          score: 53,
        },
        {
          name: "EC2",
          score: 53,
        },
      ]
    },
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

const startServer = apolloServer.start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config: PageConfig = {
  api: {
    bodyParser: false
  }
}

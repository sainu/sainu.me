import { ApolloServer, gql } from 'apollo-server-micro'
import { NextApiRequest, NextApiResponse, PageConfig } from 'next'

const typeDefs = gql`
  type Query {
    profile: Profile
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
      }
    }
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

import { ApolloServer } from 'apollo-server-micro'
import { NextApiRequest, NextApiResponse, PageConfig } from 'next'
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { Resolvers } from "pages/api/graphql/generated/resolvers";
import { join } from 'path'
import { getProfile } from "lib/services/getProfile";
import { getWebLinks } from "lib/services/getWebLinks";
import { getSocialLinks } from "lib/services/getSocialLinks";
import { getSkills } from "lib/services/getSkills";

const resolvers: Resolvers = {
  Query: {
    profile: () => getProfile(),
    webLinks: () => getWebLinks(),
    socialLinks: () => getSocialLinks(),
    skills: () => getSkills(),
  }
}

const schema = loadSchemaSync(join(__dirname, '../../../../schema.graphql'), {
  loaders: [new GraphQLFileLoader]
})

export const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

const apolloServer = new ApolloServer({ schema: schemaWithResolvers })

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

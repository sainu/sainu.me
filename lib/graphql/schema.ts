import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { Resolvers } from "lib/graphql/generated/resolvers";
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

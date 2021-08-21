import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from 'path'
import { profileResolver } from "./resolvers/profileResolver";
import { skillsResolver } from "./resolvers/skillsResolver";
import { socialLinksResolver } from "./resolvers/socialLinksResolver";
import { webLinksResolver } from "./resolvers/webLinksResolver";

const resolvers = {
  Query: {
    profile: profileResolver,
    webLinks: webLinksResolver,
    socialLinks: socialLinksResolver,
    skills: skillsResolver,
  }
}

const schema = loadSchemaSync(join(__dirname, '../../../../schema.graphql'), {
  loaders: [new GraphQLFileLoader]
})

export const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

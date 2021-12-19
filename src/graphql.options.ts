import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path/posix';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions | Promise<GqlModuleOptions> {
    return {
      context: ({ req, res }) => ({ req, res }),
      typePaths: ['./src/*/*.graphql'], // path for gql schema files
      installSubscriptionHandlers: true,
      resolverValidationOptions: {
        requireResolversForResolveType: 'ignore',
      },
      definitions: { // will generate .ts types from gql schema
        path: join(process.cwd(), 'src/graphql.schema.generated.ts'),
        outputAs: 'class',
      },
      debug: true,
      introspection: true,
      playground: true,
      cors: false,
    };
  }
}

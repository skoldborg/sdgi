import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/app/api/graphql/typeDefs/**.graphql',
  generates: {
    'src/@types/codegen/types.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        {
          add: {
            content: '// @ts-nocheck',
          },
        },
      ],
    },
  },
};

export default config;

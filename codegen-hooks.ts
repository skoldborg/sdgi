import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/app/api/graphql/typeDefs/*.graphql',
  generates: {
    'src/app': {
      documents: ['src/app/[locale]/*.graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'src/@types',
      },
      plugins: [
        'typescript-operations',
        'typescript-react-apollo',
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
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;

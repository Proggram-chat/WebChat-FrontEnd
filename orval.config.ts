module.exports = {
  petstore: {
    output: {
      mode: 'tags-split',
      target: 'src/shared/api/endpoints.ts',
      override: {
        mutator: {
          path: 'src/shared/api/custom-instance.ts',
          name: 'customInstance',
        },
      },
      schemas: 'src/shared/api/model',
    },
    input: {
      target: 'http://localhost/swagger/webchat',
    },
  },
};

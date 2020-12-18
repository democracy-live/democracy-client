module.exports = {
  client: {
    service: {
      name: 'DEMOCRACY API',
      url: 'https://internal.api.democracy-app.de',
      skipSSLValidation: true,
      // localSchemaFile: './src/lib/apollo/clientSchema.graphql',
    },
    includes: ['./src/**/*.graphql'],
  },
};

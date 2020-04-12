/*
 *
 * The API's main entry file
 *
 *
 */
const { ApolloServer } = require("apollo-server");
const schema = require("./src/schema");

const server = new ApolloServer({
	schema,
	introspection: true,
	playground: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});

/*
 *
 * The GraphQL schema
 *
 *
 */
const { Country } = require("./types/Country");
const { Data } = require("./types/Data");
const { Stat } = require("./types/Stat");
const { gql } = require("apollo-server");
const { countriesData } = require("./data");
const { makeExecutableSchema } = require("graphql-tools");

const Query = gql`
	type Query {
		countries: [Country]
	}
`;

var rootResolvers = {
	Query: {
		countries() {
			return countriesData;
		},
	},
};

module.exports = makeExecutableSchema({
	typeDefs: [Query, Country, Data, Stat],
	resolvers: { ...rootResolvers },
});

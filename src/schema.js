/*
 *
 * The GraphQL schema
 *
 *
 */
const { Country } = require("./types/Country");
const { Data } = require("./types/Data");
const { Stat, StatResolvers } = require("./types/Stat");
const { gql } = require("apollo-server");
const { countriesData, statsData } = require("./data");
const { makeExecutableSchema } = require("graphql-tools");

const Query = gql`
	type Query {
		countries: [Country]
		stats: [Stat]
	}
`;

var rootResolvers = {
	Query: {
		countries() {
			return countriesData;
		},
		stats() {
			return statsData;
		},
	},
};

module.exports = makeExecutableSchema({
	typeDefs: [Query, Country, Data, Stat],
	resolvers: { ...rootResolvers, ...StatResolvers },
});

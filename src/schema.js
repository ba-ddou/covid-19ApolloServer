/*
 *
 * The GraphQL schema
 *
 *
 */
const { Territory } = require("./types/Territory");
const { Date } = require("./types/Date");
const { Stat, StatResolvers } = require("./types/Stat");
const { gql } = require("apollo-server");
const { territoriesData, datesData, statsData } = require("./data");
const { makeExecutableSchema } = require("graphql-tools");

const Query = gql`
	type Query {
		godView(date: String): [Stat]
		# info(territory: String): Stat
		# timeSeries(territory: [String]): [TerritoryStat]
	}
`;

var rootResolvers = {
	Query: {
		godView(_, args) {
			let dateId = datesData.find((element) => element.date == args.date)
				.id;
			return statsData.filter((element) => element.date == dateId);
		},
		// stats() {
		// 	return statsData;
		// },
	},
};

module.exports = makeExecutableSchema({
	typeDefs: [Query, Territory, Date, Stat],
	resolvers: { ...rootResolvers, ...StatResolvers },
});

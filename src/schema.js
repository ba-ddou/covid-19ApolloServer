/*
 *
 * The GraphQL schema
 *
 *
 */
const { Territory } = require("./types/Territory");
const { Date } = require("./types/Date");
const { Stat, StatResolvers } = require("./types/Stat");
const {
	TerritoryStat,
	TerritoryStatResolvers,
} = require("./types/TerritoryStat");
const { gql } = require("apollo-server");
const { territoriesData, datesData, statsData } = require("./data");
const { makeExecutableSchema } = require("graphql-tools");

const Query = gql`
	type Query {
		godView(date: String): [Stat]
		info(territory: String, date: String): Stat
		timeSeries(territories: [String]): [TerritoryStat]
	}
`;

var rootResolvers = {
	Query: {
		godView(_, args) {
			let dateId = datesData.find((element) => element.date == args.date)
				.id;
			return statsData.filter((element) => element.date == dateId);
		},
		info(_, args) {
			let territoryId = territoriesData.find(
				(element) => element.name == args.territory
			).id;
			let dateId = datesData.find((element) => element.date == args.date)
				.id;

			return statsData.find(
				(element) =>
					element.territory == territoryId && element.date == dateId
			);
		},
		timeSeries(_, args) {
			return args.territories.map((territory) => {
				return { name: territory };
			});
		},
	},
};

module.exports = makeExecutableSchema({
	typeDefs: [Query, Territory, Date, Stat, TerritoryStat],
	resolvers: {
		...rootResolvers,
		...StatResolvers,
		...TerritoryStatResolvers,
	},
});

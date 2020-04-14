const { gql } = require("apollo-server");
const { Stat } = require("./Stat");
const { territoriesData, statsData } = require("../data");

exports.TerritoryStat = gql`
	type TerritoryStat {
		name: String
		stats: [Stat]
	}
`;

exports.TerritoryStatResolvers = {
	TerritoryStat: {
		stats(parent) {
			let territoryId = territoriesData.find(
				(element) => element.name == parent.name
			).id;
			return statsData.filter(
				(element) => element.territory == territoryId
			);
		},
	},
};

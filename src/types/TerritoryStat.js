const { gql } = require("apollo-server");
const { Stat } = require("./Stat");
const { getTerritoriesData, getStatsData } = require("../data");

var territoriesData = false;
var statsData = false;

async function loadData() {
	territoriesData = await getTerritoriesData();
	statsData = await getStatsData();
}
loadData();

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

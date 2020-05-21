const { gql } = require("apollo-server");
const { getTerritoriesData, getDatesData } = require("../data");

var territoriesData = false;
var datesData = false;

async function loadData() {
	territoriesData = await getTerritoriesData();
	datesData = await getDatesData();
}
loadData();

exports.Stat = gql`
	type Stat {
		date: String
		territory: String
		confirmed: Int
		newConfirmed: Int
		recovered: Int
		newRecovered: Int
		dead: Int
		newDead: Int
		active: Int
		newActive: Int
	}
`;

exports.StatResolvers = {
	Stat: {
		date(parent) {
			return datesData.find((element) => parent.date == element.id).date;
		},
		territory(parent) {
			// console.log(territoriesData);
			return territoriesData.find(
				(element) => parent.territory == element.id
			).name;
			// if (territory) return territory.name;
			// else return parent.territory;
		},
	},
};

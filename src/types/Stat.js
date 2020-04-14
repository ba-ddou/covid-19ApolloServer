const { gql } = require("apollo-server");
const { territoriesData, datesData } = require("../data");

exports.Stat = gql`
	type Stat {
		date: String
		territory: String
		confirmed: Int
		recovered: Int
		active: Int
		dead: Int
	}
`;

exports.StatResolvers = {
	Stat: {
		date(parent) {
			return datesData.find((element) => parent.date == element.id).date;
		},
		territory(parent) {
			return territoriesData.find(
				(element) => parent.territory == element.id
			).name;
		},
	},
};

const { gql } = require("apollo-server");
const { countriesData } = require("../data");

exports.Stat = gql`
	type Stat {
		country: Country
		data: String
	}
`;

exports.StatResolvers = {
	Stat: {
		country(source) {
			return (res = countriesData.find(
				(element) => element.id == source.country
			));
		},
	},
};

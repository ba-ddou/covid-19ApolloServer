const { gql } = require("apollo-server");

exports.Stat = gql`
	type Stat {
		country: Country
		data: [Data]
	}
`;

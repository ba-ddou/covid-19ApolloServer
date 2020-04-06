const { gql } = require("apollo-server");

exports.Country = gql`
	type Country {
		id: Int
		name: String
		coords: [String]
	}
`;

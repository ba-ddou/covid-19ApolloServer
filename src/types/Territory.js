const { gql } = require("apollo-server");

exports.Territory = gql`
	type Territory {
		id: Int
		name: String
		type: String
	}
`;

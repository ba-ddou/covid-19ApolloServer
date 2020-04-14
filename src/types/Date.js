const { gql } = require("apollo-server");

exports.Date = gql`
	type Date {
		id: Int
		date: String
	}
`;

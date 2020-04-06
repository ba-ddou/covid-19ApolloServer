const { gql } = require("apollo-server");

exports.Data = gql`
	type Data {
		date: String
		cases: Int
	}
`;

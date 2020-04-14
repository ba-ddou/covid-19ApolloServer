const { gql } = require("apollo-server");
const { Stat } = require("./Stat");

exports.TerritoryStat = gql`
	type TerritoryStat {
		name: String
		stats: [Stat]
	}
`;

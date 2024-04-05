// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

export const typeDefs = `#graphql
type Project {
  id: String!
  name: String!
  script: String
  class: String
}

type Room {
  id: String!
  hasStoredData: String!
}

type allRoomHourlyMetrics {
  datetimeHour: String,
  activeRooms: Int,
  activeConnections: Int,
  avgConnectionsPerRoom: Int,
  exceededCpuErrors: Int,
  exceededMemoryErrors: Int,
  fatalInternalErrors: Int,
  inboundWebsocketMsgCount: Int,
  outboundWebsocketMsgCount: Int,
}

type singleRoomHourlyMetrics {
  datetimeHour: String,
  activeConnections: Int,
  exceededCpuErrors: Int,
  exceededMemoryErrors: Int,
  fatalInternalErrors: Int,
  inboundWebsocketMsgCount: Int,
  outboundWebsocketMsgCount: Int,
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each.
type Query {
  projects: [Project]
  rooms(id: String!): [Room]
  allRoomMetrics(dateChosen: String!, namespaceId: String!): [allRoomHourlyMetrics]
  singleRoomMetrics(dateChosen: String!, objectId: String!): [singleRoomHourlyMetrics]
}
`;

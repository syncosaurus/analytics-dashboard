// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
  Query: {
    projects: (_, __, { dataSources }) => {
      return dataSources.namespaceAPI.getAllProjects();
    },
    rooms: (_, { id }, { dataSources }) => {
      return dataSources.namespaceAPI.getRooms(id);
    },
    allRoomMetrics: async (_, { dateChosen, namespaceId }, { dataSources }) => {
      let data = await dataSources.analyticsAPI.getAllRoomMetricsByDate(
        dateChosen,
        namespaceId
      );

      let returnObj = {};

      data.storage.forEach(hour => {
        returnObj[hour.dimensions.datetimeHour] = {
          datetimeHour: hour.dimensions.datetimeHour,
          activeRooms: 0,
          activeConnections: 0,
          exceededCpuErrors: 0,
          exceededMemoryErrors: 0,
          fatalInternalErrors: 0,
          inboundWebsocketMsgCount: 0,
          outboundWebsocketMsgCount: 0,
        };
      });

      data.otherMetrics.forEach(hour => {
        returnObj[hour.dimensions.datetimeHour] = {
          ...returnObj[hour.dimensions.datetimeHour],
          activeConnections: hour.max.activeWebsocketConnections || 0,
          exceededCpuErrors: hour.sum.exceededCpuErrors || 0,
          exceededMemoryErrors: hour.sum.exceededMemoryErrors || 0,
          fatalInternalErrors: hour.sum.fatalInternalErrors || 0,
          inboundWebsocketMsgCount: hour.sum.inboundWebsocketMsgCount || 0,
          outboundWebsocketMsgCount: hour.sum.outboundWebsocketMsgCount || 0,
        };
      });

      data.activeRooms.forEach(hourObject => {
        if (hourObject.max.activeWebsocketConnections > 0) {
          returnObj[hourObject.dimensions.datetimeHour]['activeRooms'] += 1;
        }
      });

      return Object.values(returnObj).map(hour => {
        if (hour.activeConnections && hour.activeRooms) {
          return {
            ...hour,
            avgConnectionsPerRoom: Math.floor(
              hour.activeConnections / hour.activeRooms
            ),
          };
        } else {
          return {
            ...hour,
            avgConnectionsPerRoom: 0,
          };
        }
      });
    },
    singleRoomMetrics: async (_, { dateChosen, objectId }, { dataSources }) => {
      let data = await dataSources.analyticsAPI.getSingleRoomMetricsByDate(
        dateChosen,
        objectId
      );

      let returnObj = {};

      data.storage.forEach(hour => {
        returnObj[hour.dimensions.datetimeHour] = {
          datetimeHour: hour.dimensions.datetimeHour,
          activeConnections: 0,
          exceededCpuErrors: 0,
          exceededMemoryErrors: 0,
          fatalInternalErrors: 0,
          inboundWebsocketMsgCount: 0,
          outboundWebsocketMsgCount: 0,
        };
      });

      data.otherMetrics.forEach(hour => {
        returnObj[hour.dimensions.datetimeHour] = {
          ...returnObj[hour.dimensions.datetimeHour],
          activeConnections: hour.max.activeWebsocketConnections || 0,
          exceededCpuErrors: hour.sum.exceededCpuErrors || 0,
          exceededMemoryErrors: hour.sum.exceededMemoryErrors || 0,
          fatalInternalErrors: hour.sum.fatalInternalErrors || 0,
          inboundWebsocketMsgCount: hour.sum.inboundWebsocketMsgCount || 0,
          outboundWebsocketMsgCount: hour.sum.outboundWebsocketMsgCount || 0,
        };
      });

      return Object.values(returnObj);
    },
  },
};

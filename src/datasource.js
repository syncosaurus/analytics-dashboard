import { RESTDataSource } from '@apollo/datasource-rest';
import 'dotenv/config';
import axios from 'axios';

export class NamespaceAPI extends RESTDataSource {
  baseURL = `https://api.cloudflare.com/client/v4/accounts/`;

  async getAllProjects() {
    const data = await this.get(
      `${process.env.CLOUDFLARE_ACCOUNT_ID}/workers/durable_objects/namespaces/`,
      {
        headers: {
          AUTHORIZATION: `bearer ${process.env.BEARER_AUTH}`,
          'X-AUTH-EMAIL': process.env.X_AUTH_EMAIL,
          'X-AUTH-KEY': process.env.X_AUTH_KEY,
        },
      }
    );

    return data.result;
  }

  async getRooms(namespaceId) {
    const data = await this.get(
      `${process.env.CLOUDFLARE_ACCOUNT_ID}/workers/durable_objects/namespaces/${namespaceId}/objects`,
      {
        headers: {
          AUTHORIZATION: `bearer ${process.env.BEARER_AUTH}`,
          'X-AUTH-EMAIL': process.env.X_AUTH_EMAIL,
          'X-AUTH-KEY': process.env.X_AUTH_KEY,
        },
      }
    );
    return data.result;
  }
}

export class AnalyticsAPI extends RESTDataSource {
  baseURL = `https://api.cloudflare.com/client/v4/graphql`;

  async getAllRoomMetricsByDate(dateChosen, namespaceId) {
    const { data } = await axios.post(
      this.baseURL,
      {
        query: `
          query {
            viewer {
              accounts(filter: { accountTag: "${process.env.CLOUDFLARE_ACCOUNT_ID}" }) {
                storage: durableObjectsStorageGroups(
                  filter: { date: "${dateChosen}" }
                  limit: 10000
                ) {
                  dimensions {
                    datetimeHour
                  }
                  max {
                    storedBytes
                  }
                }

                otherMetrics: durableObjectsPeriodicGroups(
                  filter: { date: "${dateChosen}", namespaceId: "${namespaceId}" }
                  limit: 10000
                ) {
                  dimensions {
                    datetimeHour
                  }
                  sum {
                    inboundWebsocketMsgCount
                    outboundWebsocketMsgCount
                    exceededCpuErrors
                    exceededMemoryErrors
                    fatalInternalErrors
                  }
                  max {
                    activeWebsocketConnections
                  }
                }

                activeRooms: durableObjectsPeriodicGroups(
                  filter: { date: "${dateChosen}", namespaceId: "${namespaceId}" }
                  limit: 10000
                ) {
                  dimensions {
                    datetimeHour
                    objectId
                  }
                  max {
                    activeWebsocketConnections
                  }
                }
              }
            }
          }
        `,
      },
      {
        headers: {
          AUTHORIZATION: `bearer ${process.env.BEARER_AUTH}`,
          'X-AUTH-EMAIL': process.env.X_AUTH_EMAIL,
          'X-AUTH-KEY': process.env.X_AUTH_KEY,
        },
      }
    );

    return data.data.viewer.accounts[0];
  }

  async getSingleRoomMetricsByDate(dateChosen, objectId) {
    const { data } = await axios.post(
      this.baseURL,
      {
        query: `
          query {
            viewer {
              accounts(filter: { accountTag: "${process.env.CLOUDFLARE_ACCOUNT_ID}" }) {
                storage: durableObjectsStorageGroups(
                  filter: { date: "${dateChosen}" }
                  limit: 10000
                ) {
                  dimensions {
                    datetimeHour
                  }
                  max {
                    storedBytes
                  }
                }

                otherMetrics: durableObjectsPeriodicGroups(
                  filter: { date: "${dateChosen}", objectId: "${objectId}" }
                  limit: 10000
                ) {
                  dimensions {
                    datetimeHour
                  }
                  sum {
                    inboundWebsocketMsgCount
                    outboundWebsocketMsgCount
                    exceededCpuErrors
                    exceededMemoryErrors
                    fatalInternalErrors
                  }
                  max {
                    activeWebsocketConnections
                  }
                }
              }
            }
          }
        `,
      },
      {
        headers: {
          AUTHORIZATION: `bearer ${process.env.BEARER_AUTH}`,
          'X-AUTH-EMAIL': process.env.X_AUTH_EMAIL,
          'X-AUTH-KEY': process.env.X_AUTH_KEY,
        },
      }
    );

    return data.data.viewer.accounts[0];
  }
}

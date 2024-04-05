import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import cors from 'cors';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { typeDefs } from './src/typeDefs.js';
import { resolvers } from './src/resolvers.js';
import { NamespaceAPI, AnalyticsAPI } from './src/datasource.js';

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: true,
});

await server.start();

app.use(express.static(path.join(__dirname, './dist')));

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async () => {
      return {
        // We create new instances of our data sources with each request.
        dataSources: {
          namespaceAPI: new NamespaceAPI(),
          analyticsAPI: new AnalyticsAPI(),
        },
      };
    },
  }),
  express.urlencoded({ extended: true })
);

// serve the static 'index.html' file on all routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

// Modified server startup
await new Promise(resolve =>
  httpServer.listen({ port: PORT }, resolve)
);

console.log(`🚀 Analytics ready at http://localhost:${PORT}/`);

# Syncosaurus Dashboard

The Syncosaurus dashboard is a locally hosted analytics dashboard allowing developers to view metrics for their deployed Durable Objects (aka Rooms) which will help troubleshoot and debug their end applications. Additionally, it can help provide high-level usage metrics for product decisions. 

The dashboard features two different views - each with its own metrics:
- All Rooms
- Single Room

## Setup
1. Download the analytics dashboard using ...
2. Move into the newly created directory
3. Install dependencies: `npm install`
4. Ensure you are signed into your Cloudflare account: `$syncosaurus whoami`
5. Run the dashboard: `npm start`

## Using the Dashboard
To get started with the dashboard:
1. Select a project you'd like to view metrics for
2. Select all rooms or a single room by ID
3. Toggle date and metric to see data

The following metrics are provided for all rooms (aggregated across all rooms for the selected project):
- Total \# of active rooms per hour
- Max # of websocket connections per hour
- Avg # of connections per active room per hour
- Total \# of inbound websocket messages per hour
- Total \# of outbound websocket messages per hour
- Total \# of exceeded CPU errors per hour
- Total \# of exceeded memory errors per hour
- Total \# of fatal internal errors per hour

The following metrics are provided for a single room (aka durable object instance):
- Max # of websocket connections per hour
- Total \# of inbound websocket messages per hour
- Total \# of outbound websocket messages per hour
- Total \# of exceeded CPU errors per hour
- Total \# of exceeded memory errors per hour
- Total \# of fatal internal errors per hour

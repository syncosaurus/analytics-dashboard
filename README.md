# Syncosaurus Dashboard

![Alt text](./app_screenshot.png?raw=true "Syncosaurus Dashboard")

## Introduction

The Syncosaurus dashboard is a locally hosted analytics monitoring application, allowing developers to view, analyze and troubleshoot their deployed Durable Objects (aka Rooms).

The dashboard features two sets of metrics for each project:
- **All Rooms**: Aggregated metrics for ALL rooms associated with a selected project
- **Single Room**: Individual room metrics associated with a selected project

## Setup

1. Ensure you have the `Syncosaurus` npm package installed.
  - If not, install it with the following command: `npm install -g syncosaurus`.
2. Ensure you are signed into your Cloudflare account. You can check your login status with the command `syncosaurus whoami`.
  - If 'You are not logged in' is output, then run the command `syncosaurus login` to login.
3. Run the command `syncosaurus dashboard`. An URL to the dashboard application will be displayed. (ex: `http://localhost:3001`)
4. Click the URL to launch the dashboard.

## Using the Dashboard

To get started with the dashboard:
1. Select a project from the header dropdown.
2. Click 'All rooms' under 'All Room Metrics' to view data for all of your rooms
3. Click a room's namespace ID under 'Single Room Metrics' to view data for that room
4. The date selector defaults to the current date. To view metrics for a different date, use the date selector dropdown under the 'Selected Date' heading to select your desired date.
5. Your selected data should now be displayed in the dashbard's main display area. Toggle different statistics by clicking on the desired statistic.

The following statistics are provided for the aggregated 'All Rooms Metrics' option:
   - Total \# of active rooms per hour
   - Max \# of websocket connections per hour
   - Average \# of connections per active room per hour
   - Total \# of inbound websocket messages per hour
   - Total \# of outbound websocket messages per hour
   - Total \# of exceeded CPU errors per hour
   - Total \# of exceeded memory errors per hour
   - Total \# of fatal internal errors per hour

The following metrics are provided for 'Individual Room Metrics' option:
  - Max \# of websocket connections per hour
  - Total \# of inbound websocket messages per hour
  - Total \# of outbound websocket messages per hour
  - Total \# of exceeded CPU errors per hour
  - Total \# of exceeded memory errors per hour
  - Total \# of fatal internal errors per hour

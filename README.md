# The Roast Report: The Morning Rush

An interactive D3.js dashboard exploring point-of-sale data from three New York coffee shops: Astoria, Hell's Kitchen, and Lower Manhattan. The project asks:

> How do sales patterns across the three stores vary by time, location, and volume, and what do they imply for staffing, stock, and site performance?

**Period covered:** January–June 2023
**Module:** CIS4014-N Interactive Visualisation, Teesside University International Business School

## View the dashboard

- [Open the live dashboard](https://inkymello.github.io/The-Roast-Report---The-Morning-Rush/)
- To view it locally, open `index.html` in a browser or serve the project folder with a local web server. The visualisations load D3.js from a CDN, so an internet connection is required.

## Visualisations

Each team member created a chart answering one part of the project question. Open a team member's page for its purpose, functionality, insights, and embedded interactive chart.

| Question | Visualisation | Team member |
| --- | --- | --- |
| **When?** | Day-of-week × hour transaction heat map | [Singappuli Arachchige Isuru Dayanga Samarakoon](Samarakoon/) |
| **Where?** | Store map with revenue-proportional symbols and ranking | [Imasha Chathurangi Ilamperuma](Ilamperuma/) |
| **How much?** | Daily revenue vs. units-sold scatter plot with regression | [Wijaya Hewage Matheesha Priyan Harshana De Silva](De_Silva/) |

## Interacting with the charts

- Filter by **store**, **category**, and **month**; use **Clear** to remove the filters.
- Hover over chart marks to reveal details or highlight data.
- Click a heat-map hour to pin its highlight, or click a store on the map or ranking to filter to that store.
- Drag over the scatter plot to zoom; use **Reset zoom** to restore the view. Store chips toggle individual stores.

## Data and implementation

The charts cover transactions from Astoria, Hell's Kitchen, and Lower Manhattan between January and June 2023. The dataset is attributed in the dashboard to **Teesside University (2026), “Coffee Shop Sales” [Dataset]**. Chart data is included in the visualisation scripts; no separate data download or build step is required.

The project uses HTML, CSS, and [D3.js v7](https://d3js.org/). The visualisations load D3.js from jsDelivr and fonts from Google Fonts.

## Project links

- [GitHub repository](https://github.com/inkymello/ICA-Template-Project---The-Morning-Rush--The-Roast-Report-)
- [Trello board](https://trello.com/b/k5MT44Ww/group-4-cis4014-n-interactive-visualisation)

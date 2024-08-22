This project demonstrates the customization of Google Maps and integration with Sanity for data management within the Responsive Web App.

# Getting Started Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# ENV variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID={Sanity Project ID}
NEXT_PUBLIC_GOOGLE_API={Google Map API Key}
```

# Key Features

- **Google Map Customization:** The map is customized with Snazzy Map styles to enhance visual appearance and match the desired aesthetic.

- **Points of Interest (POI):** The map displays a list of points of interest (POI) within Pakistan. The data shown is fetched from Sanity and is currently focused on locations within Pakistan's coordinates. You may modify the data via sanity studio (info provided below).

- **Dynamic Data Display:** As you navigate and zoom on the map, the list of POIs updates dynamically to reflect the data relevant to the current map view.

- **Card Listing with Pagination:** The POIs are displayed in a card format. Each page supports infinite scroll, showing up to 18 cards in total. Initially, 6 cards are shown, and additional cards are loaded as you scroll. After 18 cards or all cards being rendered, pagination options are provided for easy navigation.

# How to test?

APP is deployed at [https://google-map-test-lake.vercel.app](https://google-map-test-lake.vercel.app):

- The URL, where the map and data will be displayed, will be provided via email. This URL will allow you to view the data fetched from Sanity and displayed on the map.

- Alternatively, you can search within Pakistan on the map, as the data currently resides within Pakistan's coordinates.

# How to modify sanity data?

To update or add new POIs in Sanity:

1. Access the Sanity Studio via the provided link: [Azfar Google Map Test Sanity Studio](https://google-map-sanity-studio.vercel.app).
2. Ensure you have the required Sanity credentials to log in and make changes.
3. Once logged in, you can update the existing information or add new POIs, which will then be reflected on the map.

# Author

- **Name:** Azfar Syal
- **Portfolio:** [www.azfarsyal.com](www.azfarsyal.com)

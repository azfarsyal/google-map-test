This project is intended solely for testing and demonstration purposes.

It showcases the customization of Google Maps and seamless integration with Sanity for efficient data management within a responsive web application.

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

# How to test?

APP is deployed at [https://google-map-test-lake.vercel.app](https://google-map-test-lake.vercel.app/?centerLat=31.464656329970605&centerLng=73.2539386&neLat=31.574114902764265&neLng=73.32809631484375&swLat=31.355069641403432&swLng=73.17978088515625&zoom=12)

NOTE: The root URL will open the map as per users location, which might not have any data associated in Sanity hence no data will be loaded, click the aforementioned link which will redirect to specific coordinates i.e. within Pakistan for which data is available. Alternatively you can navigate to the Pakistan Location in map to find landmarks.

Some screenshots of the responsive web app is as follows:

## 1. Desktop Screens (4):

<img src="https://vfbl5ixuvaltcym1.public.blob.vercel-storage.com/ReadmeImages/Desktop/Screenshot%202025-01-17%20at%206.16.46%E2%80%AFPM-NurnVxkdxnUKKrhVzRIWwSbBPIIbjw.png" alt="Desktop Screen 1" style="border: 3px solid lightgray; border-radius: 20px;" />

---

<img src="https://vfbl5ixuvaltcym1.public.blob.vercel-storage.com/ReadmeImages/Desktop/Screenshot%202025-01-17%20at%206.17.22%E2%80%AFPM-cDSnjZ3QKkeLXdCvOm30TQZPtqN8Xq.png" alt="Desktop Screen 2" style="border: 3px solid lightgray; border-radius: 20px;" />

---

<img src="https://vfbl5ixuvaltcym1.public.blob.vercel-storage.com/ReadmeImages/Desktop/Screenshot%202025-01-17%20at%206.17.31%E2%80%AFPM-OMWhbWvfANqZZ4EDX6rYkduFD19LGG.png" alt="Desktop Screen 3" style="border: 3px solid lightgray; border-radius: 20px;" />

---

<img src="https://vfbl5ixuvaltcym1.public.blob.vercel-storage.com/ReadmeImages/Desktop/Screenshot%202025-01-17%20at%206.17.52%E2%80%AFPM-3mXtkpM6FiMEkr0qiCGx8JzBu01ojv.png" alt="Desktop Screen 4" style="border: 3px solid lightgray; border-radius: 20px;" />


## 2. Tablet Screens (3):

<img src="https://vfbl5ixuvaltcym1.public.blob.vercel-storage.com/ReadmeImages/Tablet/Simulator%20Screenshot%20-%20iPad%20(10th%20generation)%20-%202025-01-17%20at%2018.10.05-3uvKXQHQpCpQAcrGJ045TGoPevdv6O.png" alt="Tablet Screen 1" style="border: 3px solid lightgray; border-radius: 20px;" />

---

<img src="https://vfbl5ixuvaltcym1.public.blob.vercel-storage.com/ReadmeImages/Tablet/Simulator%20Screenshot%20-%20iPad%20(10th%20generation)%20-%202025-01-17%20at%2018.11.14-IAClKtnFtrzfjKw0HPPM61sc4vxRrT.png" alt="Tablet Screen 2" style="border: 3px solid lightgray; border-radius: 20px;" />

---

<img src="https://vfbl5ixuvaltcym1.public.blob.vercel-storage.com/ReadmeImages/Tablet/Simulator%20Screenshot%20-%20iPad%20(10th%20generation)%20-%202025-01-17%20at%2018.11.45-xSZ4omog9TXZsxHP818G0nR1f9IAZo.png" alt="Tablet Screen 3" style="border: 3px solid lightgray; border-radius: 20px;" />

## 3. Mobile Screens (4):

<img src="https://vfbl5ixuvaltcym1.public.blob.vercel-storage.com/ReadmeImages/Mobile/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202025-01-17%20at%2018.14.35-4ielKZ6ZISEheCWffSsasKYv8FUdJp.png" alt="Mobile Screen 1" style="border: 3px solid lightgray; border-radius: 20px;" />

---

<img src="https://vfbl5ixuvaltcym1.public.blob.vercel-storage.com/ReadmeImages/Mobile/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202025-01-17%20at%2018.15.24-QLIx5NYilluXaNt8MlZHp15vqYd24M.png" alt="Mobile Screen 2" style="border: 3px solid lightgray; border-radius: 20px;" />

---

<img src="https://vfbl5ixuvaltcym1.public.blob.vercel-storage.com/ReadmeImages/Mobile/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202025-01-17%20at%2018.15.31-Myp9UbnUXAoRp61Q4cdTwb34o5DfhQ.png" alt="Mobile Screen 3" style="border: 3px solid lightgray; border-radius: 20px;" />

---

<img src="https://vfbl5ixuvaltcym1.public.blob.vercel-storage.com/ReadmeImages/Mobile/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202025-01-17%20at%2018.15.46-fRqnORfglA1Y7z9Ab06XPyS2QUCLm4.png" alt="Mobile Screen 4" style="border: 3px solid lightgray; border-radius: 20px;" />

# How to modify sanity data?

[ACCESS RESTRICTED] Could be provided upon request.

To update or add new POIs in Sanity:

1. Access the Sanity Studio via the provided link: [Azfar Google Map Test Sanity Studio](https://google-map-sanity-studio.vercel.app).
2. Ensure you have the required Sanity credentials to log in and make changes.
3. Once logged in, you can update the existing information or add new POIs, which will then be reflected on the map.

# Author

- **Name:** Azfar Syal
- **Portfolio:** [www.azfarsyal.com](www.azfarsyal.com)

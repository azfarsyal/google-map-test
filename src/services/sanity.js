import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

/**
 * The Sanity Project ID.
 * @constant {string} projectId - The Sanity Project ID, retrieved from the environment variable `NEXT_PUBLIC_SANITY_PROJECT_ID`.
 * @see {@link https://www.sanity.io/manage/personal/ Sanity Project Management}
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

if (!projectId)
  throw new Error('No Sanity ProjectId found in environment vars!');

/**
 * The Sanity Client instance used for querying the data.
 *
 * @constant {import('@sanity/client').SanityClient} client - An instance of the Sanity client.
 */
const client = createClient({
  projectId: projectId,
  dataset: 'production',
  useCdn: true,
});

/**
 * Retrieves all the cards of type "poiOrEvent" from Sanity.
 *
 * @returns {Promise<any[]>} A promise that resolves with an array of cards.
 */
export async function getCards() {
  const cards = await client.fetch('*[_type == "poiOrEvent"]');
  return cards;
}

/**
 * Generates a range string for pagination based on the given index.
 *
 * @param {number} index - The index for which to generate the range.
 * @throws {Error} Throws an error if the index is negative.
 * @returns {string} A string representing the range for pagination.
 */
function getRange(index) {
  if (index < 0) {
    throw new Error('Index must be non-negative.');
  }
  const start = index * 6;
  const end = start + 5;

  return `[${start}..${end}]`;
}

/**
 * Fetches data within the specified map bounds with pagination.
 *
 * @param {number} neLat - The latitude of the northeast corner of the map bounds.
 * @param {number} neLng - The longitude of the northeast corner of the map bounds.
 * @param {number} swLat - The latitude of the southwest corner of the map bounds.
 * @param {number} swLng - The longitude of the southwest corner of the map bounds.
 * @param {number} index - The pagination index.
 * @returns {Promise<{ items: SanityBoundsData[], totalCount: number }>} A promise that resolves with an object containing the fetched items and total count.
 */
export async function fetchDataWithinBounds(neLat, neLng, swLat, swLng, index) {
  const recordsToFetch = getRange(index);

  const totalCountQuery = `count(*[_type == "poiOrEvent" && 
    location.lat >= $swLat && location.lat <= $neLat && 
    location.lng >= $swLng && location.lng <= $neLng])`;

  const paginatedQuery = `*[_type == "poiOrEvent" && 
    location.lat >= $swLat && location.lat <= $neLat && 
    location.lng >= $swLng && location.lng <= $neLng]{
      title,
      town,
      location,
      _id,
      image,
      markerType
    } | order(_createdAt desc)${recordsToFetch}`;
  const params = { neLat, neLng, swLat, swLng };

  return {
    items: await client.fetch(paginatedQuery, params),
    totalCount: await client.fetch(totalCountQuery, params),
  };
}
export async function fetchAllPlacesWithinBounds(neLat, neLng, swLat, swLng) {
  const query = `*[_type == "poiOrEvent" && 
    location.lat >= $swLat && location.lat <= $neLat && 
    location.lng >= $swLng && location.lng <= $neLng]{
      title,
      town,
      location,
      _id,
      image,
      markerType
    } | order(_createdAt desc)`;

  const params = { neLat, neLng, swLat, swLng };
  return await client.fetch(query, params);
}

export const builder = imageUrlBuilder(client);

/**
 * Generates a URL for a given image source using Sanity's image URL builder.
 *
 * @param {any} source - The image source to generate the URL for.
 * @returns {string} The generated image URL.
 */
export function urlFor(source) {
  return builder.image(source);
}

/**
 * Fetches map data within the specified bounds and updates the state with the results.
 *
 * @param {number} neLat - The latitude of the northeast corner of the map bounds.
 * @param {number} neLng - The longitude of the northeast corner of the map bounds.
 * @param {number} swLat - The latitude of the southwest corner of the map bounds.
 * @param {number} swLng - The longitude of the southwest corner of the map bounds.
 * @param {Object} data - The current state data.
 * @param {Function} setData - Function to update the state data.
 * @param {Function} setIsLoading - Function to update the loading state.
 * @param {number} index - The pagination index.
 * @returns {Promise<void>} A promise that resolves when the data fetching is complete.
 */
async function fetchMapData(
  neLat,
  neLng,
  swLat,
  swLng,
  data,
  setData,
  setIsLoading,
  index,
  isMobile,
  setDisablePagination
) {
  setIsLoading(true);
  try {
    const response = await fetchDataWithinBounds(
      neLat,
      neLng,
      swLat,
      swLng,
      index
    );
    //append on mobile
    if (data?.items?.length && isMobile) {
      setData((pre) => {
        return {
          items: [...pre.items, ...response.items],
          totalCount: pre.totalCount,
        };
      });
    } else if (response.items.length) {
      setData(response);
    }
    setDisablePagination(false);
  } catch (e) {
    console.log(e);
  } finally {
    setIsLoading(false);
  }
}

/**
 * Handles changes to map bounds and fetches new data if necessary.
 *
 * @param {React.RefObject<any>} fetchTimeoutRef - A ref object to store the timeout ID for debouncing.
 * @param {React.RefObject<any>} mapRef - A ref object to access the map instance.
 * @param {Object} data - The current state data.
 * @param {Function} setData - Function to update the state data.
 * @param {Function} setIsLoading - Function to update the loading state.
 * @param {number} index - The pagination index.
 * @param {React.RefObject<any>} routerPushTimeoutRef - A ref object to store the timeout ID for debouncing router state updates.
 * @param {any} router - The router instance used for navigation.
 * @returns {Promise<void>} A promise that resolves when the data fetching is complete.
 */
export async function getLatLongOnChange(
  fetchTimeoutRef,
  mapRef,
  data,
  setData,
  setIsLoading,
  index,
  routerPushTimeoutRef,
  router,
  isMobile,
  setDisablePagination
) {
  let bounds;

  if (fetchTimeoutRef.current) {
    clearTimeout(fetchTimeoutRef.current);
    fetchTimeoutRef.current = null;
  }

  if (mapRef.current) {
    bounds = mapRef.current?.getBounds();
    processBounds(
      bounds,
      data,
      setData,
      setIsLoading,
      index,
      isMobile,
      setDisablePagination,
      mapRef
    ); // Move the existing bounds processing code to this function
  } else {
    bounds = returnQueryParams();
    processBounds(
      bounds,
      data,
      setData,
      setIsLoading,
      index,
      isMobile,
      setDisablePagination
    ); // Move the existing bounds processing code to this function
  }

  function processBounds(
    bounds,
    data,
    setData,
    setIsLoading,
    index,
    isMobile,
    setDisablePagination,
    mapRef
  ) {
    if (bounds) {
      const ne = bounds.getNorthEast(); // North-East corner
      const sw = bounds.getSouthWest(); // South-West corner
      fetchTimeoutRef.current = setTimeout(async () => {
        await fetchMapData(
          ne.lat(),
          ne.lng(),
          sw.lat(),
          sw.lng(),
          data,
          setData,
          setIsLoading,
          index,
          isMobile,
          setDisablePagination
        );
      }, 1000);

      if (routerPushTimeoutRef.current) {
        clearTimeout(routerPushTimeoutRef.current);
      }
      setQueryParams(
        routerPushTimeoutRef,
        router,
        mapRef,
        ne.lat(),
        ne.lng(),
        sw.lat(),
        sw.lng(),
        bounds?.center?.lat,
        bounds?.center?.lng,
        bounds?.zoom
      );
    }
  }
}

/**
 * Handles changes to map bounds and fetches new data if necessary.
 *
 * @param {React.RefObject<any>} fetchTimeoutRef - A ref object to store the timeout ID for debouncing.
 * @param {React.RefObject<any>} routerPushTimeoutRef - A ref object to capture the debounce search params update.
 * @param {Router} router - the Router from next/navigation
 * @param {React.RefObject<any>} mapRef - A ref object to access the map instance.
 * @param {Function} setCardData - Function to update the card data.
 * @param {Function} setIsCardLoading - Function to update the cards loading state.
 * @param {Function} setIsLoading - Function to update the map loading state.
 * @returns {Promise<void>} A promise that resolves when the data fetching is complete.
 */
export async function getMapPlacesOnLatLongChange(
  fetchTimeoutRef,
  mapRef,
  setData,
  setCardData,
  setIsLoading,
  setIsCardLoading,
  routerPushTimeoutRef,
  router,
  setDisablePagination
) {
  /**
   * clear the debounce timeout
   */
  if (fetchTimeoutRef.current) {
    clearTimeout(fetchTimeoutRef.current);
    fetchTimeoutRef.current = null;
  }

  const bounds = mapRef.current?.getBounds();

  if (bounds) {
    const ne = bounds.getNorthEast(); // North-East corner
    const sw = bounds.getSouthWest(); // South-West corner
    /**
     * if details popup is not open then queue the data fetch
     */
    fetchTimeoutRef.current = setTimeout(async () => {
      setIsCardLoading(true);
      await fetchAllPlacesWithinBounds(ne.lat(), ne.lng(), sw.lat(), sw.lng())
        .then((res) => {
          setData(res);
        })
        .finally(() => {
          setIsLoading(false);
        });
      await fetchDataWithinBounds(ne.lat(), ne.lng(), sw.lat(), sw.lng(), 0)
        .then((res) => {
          setCardData(res);
          setDisablePagination(false);
        })
        .finally(() => {
          setIsCardLoading(false);
        });
    }, 1000);

    /**
     * if the router state debounce on map bounds change already exists then requeue it.
     */
    if (routerPushTimeoutRef.current) {
      clearTimeout(routerPushTimeoutRef.current);
    }
    setQueryParams(
      routerPushTimeoutRef,
      router,
      mapRef,
      ne.lat(),
      ne.lng(),
      sw.lat(),
      sw.lng()
    );
  }
}

function returnQueryParams() {
  // Get the query string from the URL
  const queryString = window.location.search;

  // Parse the query string into a URLSearchParams object
  const urlParams = new URLSearchParams(queryString);

  // Return an object that mimics the bounds structure
  return {
    getNorthEast: () => ({
      lat: () => parseFloat(urlParams.get('neLat') ?? 31.574114902764265),
      lng: () => parseFloat(urlParams.get('neLng') ?? 73.32809631484375),
    }),
    getSouthWest: () => ({
      lat: () => parseFloat(urlParams.get('swLat') ?? 31.355069641403432),
      lng: () => parseFloat(urlParams.get('swLng') ?? 73.17978088515625),
    }),
    center: {
      lat: parseFloat(urlParams.get('centerLat') ?? 31.464656329970605),
      lng: parseFloat(urlParams.get('centerLng') ?? 73.2539386),
    },
    zoom: parseInt(urlParams.get('zoom') ?? 12),
  };
}

function setQueryParams(
  routerPushTimeoutRef,
  router,
  mapRef,
  neLat,
  neLng,
  swLat,
  swLng,
  centerLat,
  centerLng,
  zoom
) {
  routerPushTimeoutRef.current = setTimeout(() => {
    /**
     * Create search params from current origin link and take out the query params from the url.
     */
    const locationUrl = new URL(window.location.origin);
    locationUrl.searchParams.append(
      'centerLat',
      mapRef?.current?.getCenter().lat() ?? centerLat
    );
    locationUrl.searchParams.append(
      'centerLng',
      mapRef?.current?.getCenter().lng() ?? centerLng
    );
    locationUrl.searchParams.append('neLat', neLat);
    locationUrl.searchParams.append('neLng', neLng);
    locationUrl.searchParams.append('swLat', swLat);
    locationUrl.searchParams.append('swLng', swLng);

    locationUrl.searchParams.append('zoom', mapRef?.current.getZoom() ?? zoom);

    /**
     * replace the current state of the url => new search params.
     */
    router.replace(location.pathname + locationUrl.search);
  }, 500);
}

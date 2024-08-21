'use client';
import React, { useEffect, useState } from 'react';
import {
  GoogleMapApiLoader,
  GoogleMap,
  Marker,
  MarkerClusterer,
} from 'react-google-map-wrapper';
import { PlusIcon } from '@/assets/icons/Plus';
import { MinusIcon } from '@/assets/icons/Minus';
import { FullScreenIcon } from '@/assets/icons/FullScreen';
import { getMapPlacesOnLatLongChange } from '@/services/sanity';
import { MAP_STYLE, getMapMakerIconByMarkerType } from '@/utils/map';
import { CloseIcon } from '@/assets/icons/Close';
import MapDetailsTooltip from './DetailsOverlay';

const MAX_ZOOM = 20;
const MIN_ZOOM = 5;

/**
 * Map component that displays a Google Map with markers and handles marker clicks to show details.
 *
 * @param {Object} props - The properties passed to the Map component.
 * @param {Array<import('@/services/sanity').SanityBoundsData>} props.data - The array of data objects to be displayed as markers on the map.
 * @param {Function} props.setData - The function to update the data state.
 * @param {Object} props.fetchTimeoutRef - A reference to the timeout used for data fetching.
 * @param {Object} props.mapRef - A reference to the Google Map instance.
 * @param {boolean} props.isLoading - The state indicating whether the map data is currently loading.
 * @param {Function} props.setIsLoading - The function to update the loading state.
 * @param {Object|null} props.details - The state representing the currently selected item for which the popup is displayed when a marker is clicked.
 * @param {Function} props.setDetails - The function to update the details state.
 * @param {boolean} props.showMap - The state indicating whether the map should be displayed.
 * @param {Object} props.routerPushTimeoutRef - A reference to the timeout used for router push operations.
 * @param {Object} props.router - The Next.js router instance for handling navigation.
 * @param {number} props.index - The index of the current map instance if multiple maps are used.
 * @returns {JSX.Element} The rendered map component.
 */

const Map = ({
  setCardData,
  fetchTimeoutRef,
  mapRef,
  isCardLoading,
  setIsCardLoading,
  details,
  setDetails,
  showMap,
  routerPushTimeoutRef,
  router,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(null);
  /**
   * State to handle Marker size scaling on hover
   */
  const [hoveredItem, setHoveredItem] = useState(null);
  /**
   * My current location.
   */
  const [myCenter, setMyCenter] = useState(undefined);

  /**
   * State that indicates if the component has been mounted and map has been loaded or not?
   */
  const [isMapLoaded, setMapLoaded] = useState(false);

  /**
   * A function used to get current location of the user.
   */
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setMyCenter({
          lat: latitude,
          lng: longitude,
        });
      });
    }
  };

  /**
   * Effect to track changes for map loads, if the map has been loaded then check search params for the first time else fetch data on my location.
   */
  useEffect(() => {
    /**
     * if we have a link that someone else shared to me that includes the lat, lng and zoom for the center point of map.
     */
    const hasQueryParams = window.location.search.length > 0;

    /**
     * if map has been loaded and there is no search parameters, then fetch events on my location.
     */
    if (isMapLoaded && !hasQueryParams) getCurrentLocation();
    /**
     * Else fetch events on the location shared using link from search params.
     */ else {
      /**
       * create a new search param object.
       */
      const urlParams = new URLSearchParams(window.location.search);
      /**
       * get Lat and Lng for current center point
       */
      const centerLat = parseFloat(urlParams.get('centerLat'));
      const centerLng = parseFloat(urlParams.get('centerLng'));
      /**
       * get current zoom of the map
       */
      const zoom = parseFloat(urlParams.get('zoom'));
      /**
       * if map ref exists then update the center point and the zoom, so that the map is exactly the same as user shared
       */
      if (mapRef.current) {
        mapRef.current.setCenter({ lat: centerLat, lng: centerLng });
        mapRef.current.setZoom(zoom < MIN_ZOOM ? MIN_ZOOM : zoom);
      }
      /**
       * get map bounds and fetch the data from santry.
       */
      const bounds = mapRef.current?.getBounds();
      if (bounds) {
        const ne = bounds.getNorthEast(); // North-East corner
        const sw = bounds.getSouthWest(); // South-West corner

        /**
         * if the details popup is open then don't queue the api request.
         *
         * else queue the API request.
         */
        if (!details)
          fetchTimeoutRef.current = setTimeout(async () => {
            await getMapPlacesOnLatLongChange(
              fetchTimeoutRef,
              mapRef,
              setData,
              setCardData,
              setIsLoading,
              setIsCardLoading,
              routerPushTimeoutRef,
              router
            );
          }, 1000);
      }
    }
  }, [isMapLoaded]);

  /**
   * Function: shows the details of the event.
   *
   * @param {string} id - The id of the event that user clicked on to view.
   */
  const handleShowDetails = (id) => {
    const item = data?.find((ev) => ev._id === id);
    if (item) {
      /**
       * Re-center the map on this lat, lng.
       */
      if (mapRef.current) {
        mapRef.current.setCenter(item.location);
      }
      setDetails(item);
    }
  };

  return (
    <div
      className={`relative col-span-12 h-full w-full sm:col-span-4 lg:col-span-4 lg:h-[550px] xl:h-[750px] ${!showMap ? 'max-w-[436px] xlg:hidden' : ''}`}
    >
      <div
        className={`shadow-[0px 4.75px 12.67px 0px #00000029] fixed top-3 w-full overflow-hidden rounded-[32px] border border-solid border-[#E0E0E1] shadow-xl lg:h-[550px] xl:h-[750px] ${!showMap ? 'max-w-[436px] xlg:hidden xllg:max-w-[400px] xmlg:max-w-[370px] xslg:max-w-[350px]' : ''}`}
      >
        <GoogleMapApiLoader apiKey={process.env.NEXT_PUBLIC_GOOGLE_API}>
          <GoogleMap
            onLoad={(map) => {
              mapRef.current = map;
              setMapLoaded(true);
            }}
            mapOptions={{
              /**
               * CUSTOM MAP STYLES
               */
              styles: MAP_STYLE,
              disableDefaultUI: true,
              zoomControl: false,
            }}
            containerProps={{
              className:
                'outline-0 focus:outline-0 ring-0 w-full lg:h-[550px] xl:h-[750px] h-[83dvh] border border-grey-500 w-[100vw]',
            }}
            center={myCenter}
            zoom={15}
            onBoundsChanged={() => {
              getMapPlacesOnLatLongChange(
                fetchTimeoutRef,
                mapRef,
                setData,
                setCardData,
                setIsLoading,
                setIsCardLoading,
                routerPushTimeoutRef,
                router
              );
            }}
          >
            <MarkerClusterer>
              {data?.map(
                /**
                 *
                 * @param {import('@/services/sanity').SanityBoundsData} loc - The object from Sanity result of bounds
                 */
                (loc) => {
                  return (
                    <Marker
                      onClick={() => handleShowDetails(loc._id)}
                      key={JSON.stringify(loc.location)}
                      lat={loc.location.lat}
                      lng={loc.location.lng}
                      onMouseOver={() => setHoveredItem(loc._id)}
                      onMouseOut={() => setHoveredItem(null)}
                      icon={getMapMakerIconByMarkerType(
                        loc.markerType,
                        details?._id === loc._id,
                        hoveredItem === loc._id
                      )}
                    />
                  );
                }
              )}
              {myCenter && <Marker lat={myCenter.lat} lng={myCenter.lng} />}
            </MarkerClusterer>
            {isMapLoaded ? <Map.Controls mapRef={mapRef} /> : null}
            {isLoading ? <Map.Loading /> : null}
            {details && (
              <Map.DetailsOverlay
                map={mapRef.current}
                position={
                  new window.google.maps.LatLng(
                    details.location.lat,
                    details.location.lng
                  )
                }
              >
                <div className='z-[100000] flex w-[200px] items-start justify-between rounded-md bg-black p-2 text-white'>
                  <h3 className='text-base font-medium'>{details?.title}</h3>
                  <button
                    onClick={() => setDetails(null)}
                    className='z-[100000]'
                  >
                    <CloseIcon fill='white' width={25} height={25} />
                  </button>
                </div>
              </Map.DetailsOverlay>
            )}
          </GoogleMap>
        </GoogleMapApiLoader>
      </div>
    </div>
  );
};

/**
 * A component that provides custom controls for a Google Map.
 *
 * @param {Object} props - The props for the component.
 * @param {React.Ref<google.maps.Map>} props.mapRef - A React reference to the Google Maps instance.
 * @returns {JSX.Element|null} The rendered custom map controls, or null if no map is available.
 */
const MapControls = ({ mapRef }) => {
  const zoomIn = () => {
    const currentZoom = mapRef.current.getZoom();
    if (currentZoom < MAX_ZOOM) {
      mapRef.current.setZoom(currentZoom + 1);
    } else {
      alert('MAX Zoom Reached!');
    }
  };

  const handleFullScreen = () => {
    if (mapRef.current) {
      /**
       * @type {google.maps.Map}
       */
      const map = mapRef.current;
      const mapContainer = map.getDiv();
      const isBrowser =
        typeof window !== 'undefined' &&
        typeof window?.document !== 'undefined';
      if (window.document?.fullscreenElement && isBrowser) {
        window.document?.exitFullscreen();
      } else {
        mapContainer.requestFullscreen();
      }
    }
  };

  const zoomOut = () => {
    const currentZoom = mapRef.current.getZoom();
    if (currentZoom > MIN_ZOOM) {
      mapRef.current.setZoom(currentZoom - 2);
    } else {
      alert('MIN Zoom Reached!');
    }
  };

  return (
    <div
      className='absolute bottom-3 right-3 flex items-center gap-3'
      onClick={zoomIn}
    >
      <MapControls.OverlayButton onClick={zoomIn}>
        <PlusIcon fill='black' width={24} height={24} />
      </MapControls.OverlayButton>
      <MapControls.OverlayButton onClick={zoomOut}>
        <MinusIcon fill='black' width={24} height={24} />
      </MapControls.OverlayButton>

      <MapControls.OverlayButton onClick={handleFullScreen}>
        <FullScreenIcon fill='black' width={24} height={24} />
      </MapControls.OverlayButton>
    </div>
  );
};
Map.Controls = MapControls;
/**
 * A button component for zooming in or out on a map.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The type of zoom action. Can be either 'zoom-in' or 'zoom-out'.
 * @param {function(): void} props.onClick - The click handler function to trigger the zoom action.
 * @returns {JSX.Element} The rendered button element.
 */
const MapControlButton = ({ onClick, children }) => {
  return (
    <button
      className='grid h-[48px] w-[48px] cursor-pointer place-items-center rounded-[80px] border-[1.5] border-white bg-white p-3 shadow-lg'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

MapControls.OverlayButton = MapControlButton;

/**
 *
 * @returns {React.FC} The Loader component for map that indicates data fetching for map.
 */
const Loading = () => {
  return (
    <div className='absolute z-40 grid h-full w-full place-items-center bg-slate-200/20'>
      <div className='rounded-xl bg-white p-3'>
        <div className='grid place-items-center'>
          <div className='flex space-x-4'>
            <div className='pulse h-3 w-3 rounded-full bg-slate-700'></div>
            <div className='pulse h-3 w-3 rounded-full bg-slate-700'></div>
            <div className='pulse h-3 w-3 rounded-full bg-slate-700'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

Map.Loading = React.memo(Loading);

Map.DetailsOverlay = MapDetailsTooltip;
export default React.memo(Map);

/**
 * Icon mapping for markerType from sanity schema.
 */
const MARKER_ICONS = {
  eat: { name: 'place-to-eat', ext: '.svg' },
  stay: { name: 'place-to-stay', ext: '.svg' },
  do: { name: 'things-to-do', ext: '.svg' },
};

/**
 * The new map styles from https://snazzymaps.com.
 *
 * @see {@link https://snazzymaps.com/style/287702/the-x-spot-location-map The X-Spot location Style}
 */
export const MAP_STYLE = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#444444',
      },
    ],
  },
  {
    featureType: 'administrative.province',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#f2f2f2',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
      {
        color: '#cee9de',
      },
      {
        saturation: '2',
      },
      {
        weight: '0.80',
      },
    ],
  },
  {
    featureType: 'poi.attraction',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#f5d6d6',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [
      {
        hue: '#ff0000',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
      {
        hue: '#0064ff',
      },
      {
        gamma: '1.44',
      },
      {
        lightness: '-3',
      },
      {
        weight: '1.69',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'simplified',
      },
      {
        weight: '0.31',
      },
      {
        gamma: '1.43',
      },
      {
        lightness: '-5',
      },
      {
        saturation: '-22',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
      {
        hue: '#ff0000',
      },
    ],
  },
  {
    featureType: 'transit.station.airport',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified',
      },
      {
        hue: '#ff0045',
      },
    ],
  },
  {
    featureType: 'transit.station.bus',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
      {
        hue: '#00d1ff',
      },
    ],
  },
  {
    featureType: 'transit.station.bus',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'transit.station.rail',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified',
      },
      {
        hue: '#00cbff',
      },
    ],
  },
  {
    featureType: 'transit.station.rail',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#46bcec',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        weight: '1.61',
      },
      {
        color: '#cde2e5',
      },
      {
        visibility: 'on',
      },
    ],
  },
];

/**
 * Returns the Google Maps marker icon configuration based on the marker type,
 * whether the marker is active, and whether the marker is hovered.
 *
 * @param {'eat' | 'do' | 'stay'} markerType - The type of the marker, used to determine the icon.
 * @param {boolean} [isActive=false] - Indicates if the marker is currently active.
 * @param {boolean} [isHovered=false] - Indicates if the marker is currently hovered.
 * @returns {Object} The icon configuration object for the Google Maps marker.
 * @returns {string} return.url - The URL of the icon image. Returns an empty string if the marker type does not exist.
 * @returns {google.maps.Size} return.scaledSize - The scaled size of the icon as a Google Maps Size object. Defaults to 20x20 if the marker type does not exist.
 */
export const getMapMakerIconByMarkerType = (
  markerType,
  isActive = false,
  isHovered = false
) => {
  const scaledSize =
    isActive || isHovered
      ? new window.google.maps.Size(30, 30)
      : new window.google.maps.Size(20, 20);
  const icon = MARKER_ICONS[markerType];
  if (icon) {
    return {
      url: isActive
        ? `${icon.name}_active${icon.ext}`
        : `${icon.name}${icon.ext}`,
      scaledSize,
    };
  } else return { url: '', scaledSize: new window.google.maps.Size(20, 20) };
};

'use client';
import { useRef, useEffect, memo } from 'react';
import ReactDOM from 'react-dom/client';

/**
 * A custom overlay component for Google Maps that allows you to render React elements
 * at a specific position on the map with an optional Y-axis offset.
 *
 * @param {Object} props - The properties object.
 * @param {google.maps.Map} props.map - The Google Maps instance on which the overlay will be rendered.
 * @param {google.maps.LatLng} props.position - The LatLng position where the overlay will be displayed on the map.
 * @param {React.ReactNode} props.children - The React children elements to render inside the overlay.
 * @param {number} [props.yOffset=30] - Optional Y-axis offset in pixels to position the overlay above the marker.
 *
 * @returns {null} This component does not render anything in the React tree, but instead
 *                 directly manipulates the DOM to add the overlay to the map.
 */
const MapDetailsTooltip = ({ map, position, children, yOffset = 33 }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    class CustomOverlay extends window.google.maps.OverlayView {
      constructor(position, children) {
        super();
        this.position = position;
        this.children = children;
        this.div = null;
        this.root = null; // Initialize root for React 18
      }

      onAdd() {
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
        this.div.style.zIndex = '10000'; // Ensure the overlay has a high z-index
        this.div.style.pointerEvents = 'auto'; // Enable pointer events for interaction
        this.div.style.transform = 'translate(-50%, -100%)';

        // Create a root for rendering React components with createRoot
        this.root = ReactDOM.createRoot(this.div);
        this.root.render(this.children);

        const panes = this.getPanes();
        panes.overlayMouseTarget.appendChild(this.div); // Attach to the overlayMouseTarget pane
      }

      draw() {
        const overlayProjection = this.getProjection();
        const position = overlayProjection.fromLatLngToDivPixel(this.position);
        if (this.div) {
          this.div.style.left = `${position.x}px`;
          this.div.style.top = `${position.y - yOffset}px`; // Adjust for Y-axis offset
        }
      }

      onRemove() {
        if (this.root) {
          // Defer the unmount operation to avoid race condition
          setTimeout(() => {
            this.root.unmount(); // Unmount the React component using the new API
            this.root = null;
          }, 0);
        }
        if (this.div) {
          this.div.parentNode.removeChild(this.div);
          this.div = null;
        }
      }
    }

    overlayRef.current = new CustomOverlay(position, children);
    overlayRef.current.setMap(map);

    return () => {
      overlayRef.current.setMap(null);
    };
  }, [map, position, children, yOffset]);

  return null;
};

export default memo(MapDetailsTooltip);

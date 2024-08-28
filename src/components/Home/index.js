'use client';
import Map from '@/components/Map';
import { useEffect, useRef, useState } from 'react';
import { getLatLongOnChange } from '@/services/sanity';
import Pagination from '@/components/Pagination';
import ListCard from '@/components/ListingCard/ListCard';
import Modal from '@/components/Modal';
import { useRouter } from 'next/navigation';
import SeeMapButton from '../MapButtons/SeeMapButton';
import { useWindowWidth } from '@/utils/WindowWidth';
import MapSkeleton from '../MapSkeleton';
import ResultsCount from '../ListingCard/ResultsCount';

export default function Home() {
  // State for storing fetched data including items and total count
  const [cardData, setCardData] = useState({ items: [], totalCount: 0 });

  const [showLoader, setShowLoader] = useState(false);

  // State to disable pagination when necessary (e.g., on mobile devices)
  const [disablePagination, setDisablePagination] = useState(false);

  // Get the current window width to determine device type (mobile, tablet, desktop)
  const width = useWindowWidth();

  // State to handle loading state for both cards and the map
  const [isCardLoading, setIsCardLoading] = useState(true);

  // Router for manipulating search parameters in the URL
  const router = useRouter();

  // Timeout ref for debouncing data fetching to avoid excessive calls
  const fetchTimeoutRef = useRef(null);

  // Ref for storing the Google Maps instance
  const mapRef = useRef(null);

  // State to store details of the selected item to show in a popup or on marker click
  const [details, setDetails] = useState(null);

  // State for pagination, tracking the current page
  const [page, setPage] = useState(1);

  // State to track the previous page number for pagination comparison
  const [previousPage, setPreviousPage] = useState(1);

  // State to manage the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  const scrollPositionRef = useRef(0);

  // Timeout ref for debouncing router pushes to avoid excessive URL updates
  const routerPushTimeoutRef = useRef(null);

  // State to ensure the map only renders on the client side
  const [isClient, setIsClient] = useState(false);

  // Determine the device type based on the window width
  const isMobile = width < 768;
  const isTablet = width > 767 && width <= 1023;
  const isDesktop = width >= 1024;

  /**
   * Handles the click event on a card, setting the selected item as the current detail and centering the map on the item's location.
   *
   * @param {Object} item - The data object representing the selected item, including its location details.
   */
  const highlightLocationOnMap = (item) => {
    // Update the details state with the selected item
    if (isMobile) setShowModal(true);
    setTimeout(
      () => {
        setDetails(item);
      },
      isMobile ? 200 : 0
    );
  };

  /**
   * Function to close the modal by setting the `showModal` state to `false`.
   */
  const closeModal = () => {
    setShowModal(false);
  };

  /**
   * Function to open the modal by setting the `showModal` state to `true`.
   */
  const openModal = () => {
    setShowModal(true);
  };

  // Effect to handle data fetching and pagination when the page or device width changes
  useEffect(() => {
    if (page > 1 || page !== previousPage || (width && isMobile)) {
      setDisablePagination(true);
      if (cardData.items.length && isMobile) {
        setShowLoader(true);
        setIsCardLoading(true);
      }
      // Fetching new data based on map view changes or pagination changes
      setTimeout(() => {
        getLatLongOnChange(
          fetchTimeoutRef,
          mapRef,
          cardData,
          setCardData,
          setIsCardLoading,
          page - 1,
          routerPushTimeoutRef,
          router,
          isMobile,
          setDisablePagination
        );
      }, 1000);

      setPreviousPage(page);
    }
  }, [page, width]);
  // Effect to ensure the component is only rendered on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Scroll back to the saved position
    isMobile && window.scrollTo({
      top: scrollPositionRef.current,
      behavior: 'smooth',
    });
  }, [cardData]);

  return (
    <>
      {!!cardData?.totalCount && <ResultsCount totalCount={cardData.totalCount} />}
      {/* Main content area with cards and map */}
      <div className='flex justify-center p-8 pt-0 md:gap-5 md:p-4 lg:gap-6 xs:p-4'>
        <div className='md:w-[373px] lg:w-[908px] xs:w-[343px]'>
          {/* ListCard component displaying the cards */}
          <ListCard
            isMobile={isMobile}
            isLoading={isCardLoading}
            data={cardData}
            highlightLocationOnMap={highlightLocationOnMap}
            showLoader={showLoader}
            disablePagination={disablePagination}
          />
          {/* Pagination component for tablet devices */}
          {isTablet && (
            <Pagination
              totalCount={cardData?.totalCount}
              page={page}
              setPage={setPage}
              previousPage={previousPage}
              setPreviousPage={setPreviousPage}
              disablePagination={disablePagination}
            />
          )}
        </div>

        {/* Map component for desktop devices */}
        {isClient && !isMobile && (
          <Map
            setIsCardLoading={setIsCardLoading}
            setCardData={setCardData}
            fetchTimeoutRef={fetchTimeoutRef}
            mapRef={mapRef}
            isLoading={isCardLoading}
            setIsLoading={setIsCardLoading}
            details={details}
            setDetails={setDetails}
            showMap={false}
            routerPushTimeoutRef={routerPushTimeoutRef}
            router={router}
            setDisablePagination={setDisablePagination}
          />
        )}
        {!isClient && <MapSkeleton />}
      </div>

      {/* Pagination component for desktop devices */}
      {isDesktop && (
        <Pagination
          totalCount={cardData?.totalCount}
          page={page}
          setPage={setPage}
          previousPage={previousPage}
          setPreviousPage={setPreviousPage}
          disablePagination={disablePagination}
        />
      )}

      {/* Button to toggle between map and list views */}
      <SeeMapButton
        showModal={showModal}
        openModal={openModal}
        totalCount={cardData?.totalCount}
        itemCount={cardData?.items.length}
        disablePagination={disablePagination}
        loadMore={() => {
          setPage(page + 1);
          scrollPositionRef.current = window.scrollY;
        }}
      />

      {/* Modal component displaying the map when in mobile view */}
      <Modal isVisible={showModal} onClose={closeModal}>
        {isClient && (
          <Map
            setIsCardLoading={setIsCardLoading}
            setCardData={setCardData}
            fetchTimeoutRef={fetchTimeoutRef}
            mapRef={mapRef}
            isLoading={isCardLoading}
            setIsLoading={setIsCardLoading}
            details={details}
            setDetails={setDetails}
            showMap={showModal}
            routerPushTimeoutRef={routerPushTimeoutRef}
            router={router}
            setDisablePagination={setDisablePagination}
            isMobile={isMobile}
          />
        )}
      </Modal>
    </>
  );
}

'use client';
import Map from '@/components/Map';
import { useEffect, useRef, useState } from 'react';
import { getLatLongOnChange } from '@/services/sanity';
import { useInView } from 'react-intersection-observer';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import ListCard from '@/components/ListingCard/ListCard';
import Modal from '@/components/Modal';
import { useRouter } from 'next/navigation';
import SeeListButton from '@/components//MapButtons/SeeListButton';
import SeepMapButton from '../MapButtons/SeepMapButton';
import ShowMore from '../ShowMore';
import { useWindowWidth } from '../utils/WindowWidth';

export default function Home() {
  // State for storing fetched data including items and total count
  const [cardData, setCardData] = useState({ items: [], totalCount: 0 });

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

  // Ref to check if the component has just mounted for the first time
  const isFirstRef = useRef(true);

  // State for pagination, tracking the current page
  const [page, setPage] = useState(1);

  // State to track the previous page number for pagination comparison
  const [previousPage, setPreviousPage] = useState(1);

  // State to manage the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // Timeout ref for debouncing router pushes to avoid excessive URL updates
  const routerPushTimeoutRef = useRef(null);

  // State to ensure the map only renders on the client side
  const [isClient, setIsClient] = useState(false);

  // Intersection observer ref to check if the element is in view
  const [ref, inView] = useInView();

  const [showMore, setShowMore] = useState(false);

  /**
   * Function to calculate the range of records based on pagination.
   * @returns {number} - The calculated index range.
   */
  const getRangeOfRecords = () => {
    if (cardData.totalCount == 0) {
      return 0;
    }

    let baseIndex = (page - 1) * 3;
    if (baseIndex % 3 == 0 && page != previousPage) {
      return baseIndex;
    }

    let additionalIndex = 0;
    if (cardData.items.length >= 12) {
      additionalIndex = 2;
    } else if (cardData.items.length >= 6) {
      additionalIndex = 1;
    }

    return baseIndex + additionalIndex;
  };

  // Calculating the range of records for the current page
  const rangeOfRecord = getRangeOfRecords();

  /**
   * Function to smoothly scroll to the top of the page when pagination changes.
   */
  const scrollToTop = () => {
    document.getElementById('card')?.scrollIntoView({
      behavior: 'smooth', // Smooth scrolling effect
    });
  };

  /**
   * Handles the click event on a card, setting the selected item as the current detail and centering the map on the item's location.
   *
   * @param {Object} item - The data object representing the selected item, including its location details.
   */
  const handleCardClick = (item) => {
    // Update the details state with the selected item
    setDetails(item);

    // If the map reference is available, center the map on the selected item's location and zoom in
    if (mapRef.current) {
      const map = mapRef.current;
      map.setCenter({
        lat: item?.location?.lat,
        lng: item?.location?.lng,
      });
      map.setZoom(15);
    }
  };

  /**
   * Function to calculate the dynamic height of the card container based on the number of items.
   * @param {number} dataLength - The number of items in the data array.
   * @returns {number} - The calculated height of the card container.
   */
  const calculateHeight = (dataLength) => {
    if (!dataLength) return 0;
    const baseHeight = 400;

    const increments = Math.ceil(dataLength / 3);

    return (
      (increments > 0 ? baseHeight * increments : baseHeight) - 40 * increments
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

  useEffect(() => {
    if (
      (inView && !isFirstRef.current && cardData.items.length < 18) ||
      page !== previousPage
    ) {
      scrollToTop();
      // Fetching new data based on map view changes or pagination changes
      getLatLongOnChange(
        fetchTimeoutRef,
        mapRef,
        details,
        cardData,
        setCardData,
        setIsCardLoading,
        rangeOfRecord,
        routerPushTimeoutRef,
        router
      );
      setPreviousPage(page);
    }

    isFirstRef.current = false;
  }, [inView, page]);

  useEffect(() => {
    if (inView) {
      setShowMore(false);
    } else if (cardData.items.length < 18 && !inView) {
      setShowMore(true);
    }
  }, [cardData, inView]);

  // Setting the component to client-side rendering only
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (width && width < 1024) {
      setIsCardLoading(false);
      setShowModal(true);
    }
  }, [width]);

  // Calculating the dynamic height based on the data length
  const height = calculateHeight(cardData?.items.length);

  let cardItemsLength = cardData.items.length;
  const itemsPerPage = 18;

  if (page > 1) {
    cardItemsLength += (page - 1) * itemsPerPage;
  }

  const shouldShowLoading =
    !isCardLoading &&
    cardData?.totalCount > cardData?.items?.length &&
    rangeOfRecord * 6 !== cardData?.totalCount &&
    cardData.items.length < 13 &&
    cardItemsLength !== cardData.totalCount;

  const shouldShowPagination =
    cardData.items.length === 18 ||
    cardData.items.length == cardData.totalCount ||
    cardItemsLength === cardData.totalCount;

  return (
    <>
      <div className='container mx-auto grid h-full max-w-screen-2xl grid-cols-12 gap-x-4 p-8'>
        <div
          className='col-span-12 h-full overflow-auto sm:col-span-12 md:col-span-12 lg:col-span-8'
          id='card'
        >
          <ListCard
            isLoading={isCardLoading}
            data={cardData}
            onCardClick={handleCardClick}
          />
          <Loading viewRef={ref} shouldShowLoading={shouldShowLoading} />
        </div>
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
            showMap={false}
            routerPushTimeoutRef={routerPushTimeoutRef}
            router={router}
          />
        )}
        <ShowMore showMore={showMore} shouldShowLoading={shouldShowLoading} />

        <Pagination
          dataCount={cardData?.items?.length}
          totalCount={cardData?.totalCount}
          page={page}
          setPage={setPage}
          previousPage={previousPage}
          setPreviousPage={setPreviousPage}
          shouldShowPagination={shouldShowPagination}
        />
      </div>
      <SeepMapButton showModal={showModal} openModal={openModal} />
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
          />
        )}
        <SeeListButton showModal={showModal} closeModal={closeModal} />
      </Modal>
    </>
  );
}

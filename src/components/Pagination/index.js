import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@/assets/icons/ArrowHeadLeft';
import ChevronRightIcon from '@/assets/icons/ArrowHeadRight';

/**
 * Pagination component for navigating through pages.
 *
 * @component
 * @param {object} props - The props for the component.
 * @param {number} props.dataCount - The total length  of items.
 * @param {number} props.totalCount - The total number of items.
 * @param {number} props.page - The current page number.
 * @param {function} props.setPage - Function to set the current page.
 * @param {number} props.previousPage - The current previousPage number.
 * @param {function} props.setPreviousPage - Function to set the previous page.
 */
const Pagination = ({
  totalCount,
  page,
  setPage,
  previousPage,
  setPreviousPage,
  disablePagination,
  isTablet,
}) => {
  const cards = isTablet ? 3 : 6;
  // State to manage the disabled state of navigation buttons based on the current page
  // `left` is disabled if on the first page, `right` is disabled if on the last page
  const [disableButton, setDisableButton] = useState({
    left: page === 1,
    right: page === Math.ceil(totalCount / 6),
  });

  /**
   * Handles navigation between pages based on user interaction.
   *
   * @param {string} action - The type of navigation action ('arrow' or direct page number selection).
   * @param {number} val - The value used to update the page, either incrementing/decrementing or setting directly.
   */
  const handleNavigation = (action, val) => {
    const valToUse = action === 'arrow' ? page + val : val;

    // Update the disabled state of navigation buttons based on the current page after navigation
    if (valToUse === Math.ceil(totalCount / 6)) {
      setDisableButton({ ...disableButton, right: true, left: false });
    } else if (valToUse === 1) {
      setDisableButton({ ...disableButton, left: true, right: false });
    } else if (valToUse > 1) {
      setDisableButton({ ...disableButton, left: false, right: false });
    } else if (valToUse < Math.ceil(totalCount / 6)) {
      setDisableButton({ ...disableButton, right: false });
    }

    // Update the current page and the previous page based on the navigation action
    setPage(valToUse);
    setPreviousPage(action === 'arrow' ? previousPage + val - 1 : val - 1);
  };

  return (
    totalCount > cards && (
      <div className='flex justify-center gap-2 xl:mb-10 xl:mt-5 xs:pr-20'>
        <PaginationControl
          direction='left'
          onClick={() => handleNavigation('arrow', -1)}
          disableButton={disableButton.left || disablePagination}
        />
        {renderPageItems(
          totalCount,
          page,
          setPage,
          setPreviousPage,
          handleNavigation,
          disablePagination,
          cards
        )}
        <PaginationControl
          direction='right'
          onClick={() => handleNavigation('arrow', 1)}
          disableButton={disableButton.right || disablePagination}
        />
      </div>
    )
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  setPreviousPage: PropTypes.func.isRequired,
};

/**
 * Renders the page item elements with appropriate navigation.
 *
 * @param {number} totalCount - The total number of items.
 * @param {number} currentPage - The current page number.
 * @param {function} setPage - Function to set the current page.
 * @param {function} setPreviousPage - Function to set the previous page.
 * @returns {React.ReactNode} - The rendered page items.
 */
const renderPageItems = (
  totalCount,
  currentPage,
  setPage,
  setPreviousPage,
  handleNavigation,
  disablePagination,
  cards
) => {
  const pageCount = Math.ceil(totalCount / cards);
  const pages = [];

  // Always display the first page
  pages.push(
    <PageItem
      key={1}
      pageNumber={1}
      isActive={currentPage === 1}
      onClick={() => {
        setPage(1);
        setPreviousPage(currentPage - 1);
        handleNavigation('buttons', 1);
      }}
      disablePagination={disablePagination}
    />
  );

  if (currentPage <= 4 || pageCount <= 6) {
    // Show pages 2 to 5
    for (let i = 2; i <= Math.min(5, pageCount - 1); i++) {
      pages.push(
        <PageItem
          key={i}
          pageNumber={i}
          isActive={currentPage === i}
          onClick={() => {
            setPage(i);
            setPreviousPage(currentPage - 1);
            handleNavigation('buttons', i);
          }}
          disablePagination={disablePagination}
        />
      );
    }
    if (pageCount > 6) {
      pages.push(<EllipsisItem key='end-ellipsis' />);
    }
  } else if (currentPage >= pageCount - 3) {
    // Show ellipsis and pages before the last few pages
    pages.push(<EllipsisItem key='start-ellipsis' />);
    for (let i = pageCount - 4; i < pageCount; i++) {
      pages.push(
        <PageItem
          key={i}
          pageNumber={i}
          isActive={currentPage === i}
          onClick={() => {
            setPage(i);
            setPreviousPage(currentPage - 1);
            handleNavigation('buttons', i);
          }}
          disablePagination={disablePagination}
        />
      );
    }
  } else {
    // Show ellipses, current page, and its adjacent pages
    pages.push(<EllipsisItem key='start-ellipsis' />);
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < pageCount) {
        // Avoid adding ellipsis or out-of-bound pages
        pages.push(
          <PageItem
            key={i}
            pageNumber={i}
            isActive={currentPage === i}
            onClick={() => {
              setPage(i);
              setPreviousPage(currentPage - 1);
              handleNavigation('buttons', i);
            }}
            disablePagination={disablePagination}
          />
        );
      }
    }
    pages.push(<EllipsisItem key='end-ellipsis' />);
  }

  // Always display the last page if more than one page exists
  if (pageCount > 1) {
    pages.push(
      <PageItem
        key={pageCount}
        pageNumber={pageCount}
        isActive={currentPage === pageCount}
        onClick={() => {
          setPage(pageCount);
          setPreviousPage(currentPage - 1);
          handleNavigation('buttons', pageCount);
        }}
        disablePagination={disablePagination}
      />
    );
  }

  return pages;
};

const PageItem = ({ pageNumber, isActive, onClick, disablePagination }) => (
  <button
    disabled={disablePagination}
    onClick={onClick}
    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg disabled:opacity-50 ${isActive ? 'bg-[#079ea5] text-white' : 'border border-solid border-[#77787c] text-[#77787c]'}`}
  >
    {pageNumber}
  </button>
);

PageItem.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const EllipsisItem = () => (
  <p className='flex h-8 w-8 items-center justify-center rounded-lg text-[#77787c]'>
    ...
  </p>
);

const PaginationControl = ({ direction, onClick, disableButton }) => (
  <button
    onClick={onClick}
    className='cursor-pointer disabled:opacity-50'
    disabled={disableButton}
  >
    {direction === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
  </button>
);

PaginationControl.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Pagination;

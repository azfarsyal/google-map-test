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
  dataCount,
  totalCount,
  page,
  setPage,
  previousPage,
  setPreviousPage,
  shouldShowPagination,
}) => {
  // State to manage the disabled state of navigation buttons based on the current page
  // `left` is disabled if on the first page, `right` is disabled if on the last page
  const [disableButton, setDisableButton] = useState({
    left: page === 1,
    right: page === Math.ceil(totalCount / 18),
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
    if (valToUse === Math.ceil(totalCount / 18)) {
      setDisableButton({ ...disableButton, right: true, left: false });
    } else if (valToUse === 1) {
      setDisableButton({ ...disableButton, left: true, right: false });
    } else if (valToUse > 1) {
      setDisableButton({ ...disableButton, left: false, right: false });
    } else if (valToUse < Math.ceil(totalCount / 18)) {
      setDisableButton({ ...disableButton, right: false });
    }

    // Update the current page and the previous page based on the navigation action
    setPage(valToUse);
    setPreviousPage(action === 'arrow' ? previousPage + val - 1 : val - 1);
  };

  if (!shouldShowPagination) {
    return;
  }

  return (
    <div className='flex w-[100vw] justify-center gap-2'>
      {totalCount > 18 && (
        <>
          <PaginationControl
            direction='left'
            onClick={() => handleNavigation('arrow', -1)}
            disableButton={disableButton.left}
          />
          {renderPageItems(
            totalCount,
            page,
            setPage,
            setPreviousPage,
            handleNavigation
          )}
          <PaginationControl
            direction='right'
            onClick={() => handleNavigation('arrow', 1)}
            disableButton={disableButton.right}
          />
        </>
      )}
    </div>
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
  handleNavigation
) => {
  const pageCount = Math.ceil(totalCount / 18);

  return Array.from({ length: pageCount }, (_, index) => {
    if (index < 3 || index === pageCount - 1) {
      return (
        <PageItem
          key={index}
          pageNumber={index + 1}
          isActive={currentPage - 1 === index}
          onClick={() => {
            setPage(index + 1);
            setPreviousPage(index);
            handleNavigation('buttons', index + 1);
          }}
        />
      );
    } else if (index === 3) {
      return <EllipsisItem key={index} />;
    } else {
      return null;
    }
  });
};

const PageItem = ({ pageNumber, isActive, onClick }) => (
  <p
    onClick={onClick}
    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg ${isActive ? 'bg-[#079ea5] text-white' : 'border border-solid border-[#77787c] text-[#77787c]'}`}
  >
    {pageNumber}
  </p>
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

import PropTypes from 'prop-types';
import { CiMap } from 'react-icons/ci';
import { FaArrowDown } from 'react-icons/fa6';

/**
 * MapButtons component that displays a button to open a modal with the map.
 * The button is fixed to the bottom of the screen and is only visible on smaller screens (hidden on large screens).
 *
 * @param {Object} props - The properties passed to the MapButtons component.
 * @param {boolean} props.showModal - The state indicating whether the modal is currently visible.
 * @param {Function} props.openModal - The function to open the modal when the button is clicked.
 * @returns {JSX.Element} The rendered MapButtons component.
 */

const MapButtons = ({
  showModal,
  openModal,
  totalCount,
  itemCount,
  disablePagination,
  loadMore,
}) => {
  return (
    <div className='left-0 right-0 flex justify-center bg-white md:hidden'>
      {!showModal && (
        <div className='flex gap-[10px]'>
          <button
            className='mb-10 mt-5 flex items-center justify-center gap-3 rounded-lg border border-black bg-black px-[1rem] py-[0.5rem] text-white h-[3rem] text-base font-bold'
            onClick={openModal}
          >
            See Map
            <CiMap size={20} />
          </button>
          {totalCount > 6 && (
            <button
              className='mb-10 mt-5 flex items-center justify-center gap-3 rounded-lg border border-black disabled:border-gray px-[1rem] py-[0.5rem] disabled:opacity-25 h-[3rem] text-base font-bold'
              onClick={loadMore}
              disabled={disablePagination || itemCount >= totalCount}
            >
              Load more
              <FaArrowDown size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

MapButtons.propTypes = {
  showModal: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default MapButtons;

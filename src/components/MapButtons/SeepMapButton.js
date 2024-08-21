import PropTypes from 'prop-types';
/**
 * SeepMapButton component that displays a button to open a modal with the map.
 * The button is fixed to the bottom of the screen and is only visible on smaller screens (hidden on large screens).
 *
 * @param {Object} props - The properties passed to the SeepMapButton component.
 * @param {boolean} props.showModal - The state indicating whether the modal is currently visible.
 * @param {Function} props.openModal - The function to open the modal when the button is clicked.
 * @returns {JSX.Element} The rendered SeepMapButton component.
 */

const SeepMapButton = ({ showModal, openModal }) => {
  return (
    <div className='fixed bottom-20 left-0 right-0 flex justify-center lg:hidden'>
      {!showModal && (
        <button
          className='ml-5 rounded-lg border border-black bg-black px-6 py-4 text-white'
          onClick={openModal}
        >
          See Map
        </button>
      )}
    </div>
  );
};

SeepMapButton.propTypes = {
  showModal: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default SeepMapButton;

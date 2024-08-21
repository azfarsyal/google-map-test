import PropTypes from 'prop-types';

/**
 * SeeListButton component that displays a button to close a modal with the map.
 * The button is fixed to the bottom of the screen and is only visible on smaller screens (hidden on large screens).
 *
 * @param {Object} props - The properties passed to the SeeListButton component.
 * @param {boolean} props.showModal - The state indicating whether the modal is currently visible.
 * @param {Function} props.closeModal - The function to close the modal when the button is clicked.
 * @returns {JSX.Element} The rendered SeeListButton component.
 */

const SeeListButton = ({ showModal, closeModal }) => {
  return (
    showModal && (
      <div className='grid justify-items-center'>
        <button
          className='absolute bottom-6 ml-5 mt-6 rounded-lg border border-black bg-black px-6 py-3 text-white'
          onClick={closeModal}
        >
          See list
        </button>
      </div>
    )
  );
};

SeeListButton.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default SeeListButton;

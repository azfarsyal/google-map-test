import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Modal component to display content in a modal overlay.
 *
 * @param {boolean} isVisible - Determines whether the modal is visible.
 * @param {() => void} onClose - Function to call when the modal is closed.
 * @param {ReactNode} children - The content to display inside the modal.
 *
 * @returns A JSX element if isVisible is true, otherwise null.
 */
const Modal = ({ isVisible, onClose, children }) => {
  useEffect(() => {
    if (isVisible) {
      // Add a class to the html and body elements to disable scrolling
      document.documentElement.classList.add('overflow-hidden');
      document.body.classList.add('overflow-hidden');
    } else {
      // Remove the class when the modal is closed
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup function to ensure no scroll lock remains if the component unmounts
    return () => {
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden');
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50'>
      <div className='relative h-[90dvh] w-[100vw] rounded-t-lg bg-white shadow-lg lg:p-4'>
        <button className='absolute right-4 z-10 text-4xl' onClick={onClose}>
          &times;
        </button>
        <div className='h-full overflow-auto'>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;

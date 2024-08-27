import { urlFor } from '@/services/sanity';
import { CloseIcon } from '@/assets/icons/Close';
import ExportIcon from '@/assets/icons/Export';
import PropTypes from 'prop-types';

/**
 * ToolTip component that displays a tooltip with an image background, title, and icons.
 * It shows the details passed to it and includes a close button to dismiss the tooltip.
 *
 * @param {Object} props - The properties passed to the ToolTip component.
 * @param {Object} props.details - The details object containing information for the tooltip.
 * @param {string} props.details.title - The title text to display in the tooltip.
 * @param {Object} props.details.image - The image object used for the background of the tooltip.
 * @param {Function} props.setDetails - The function to clear the details when the close button is clicked.
 * @returns {JSX.Element} The rendered ToolTip component.
 */

const ToolTip = ({ details, setDetails }) => {
  return (
    <div
      className='flex h-[150px] w-[266px] items-start justify-between rounded-xl bg-black bg-cover bg-center p-2 text-white'
      style={{
        backgroundImage: `url(${urlFor(details?.image).url()})`,
      }}
    >
      <div className='flex h-full items-end justify-center'>
        <div className='flex items-center gap-2'>
          {/* Icon and title section */}
          <div className='rounded-full bg-white p-1'>
            <ExportIcon />
          </div>
          <h4 className='font-medium'>{details?.title}</h4>
        </div>
      </div>
      <button
        onClick={() => setDetails(null)}
        className='rounded-full bg-white'
      >
        <CloseIcon fill='black' width={25} height={25} />
      </button>
    </div>
  );
};

ToolTip.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.object,
  }).isRequired,
  setDetails: PropTypes.func.isRequired,
};

export default ToolTip;

import PropTypes from 'prop-types';
import ArrowDown from '@/assets/icons/ArrowDown';

/**
 * ShowMore component that displays a button to load more items if certain conditions are met.
 * The button is only visible when:
 * - `showMore` is true
 * - `isLoading` is false
 * - The total count of items is greater than the current number of items
 * - The number of items is less than 13
 * - The range of records multiplied by 6 is not equal to the total count
 *
 * @param {Object} props - The properties passed to the ShowMore component.
 * @param {boolean} props.showMore - A flag indicating whether the "Show More" button should be shown.
 * @param {Boolean} props.shouldShowLoading - Boolean to rander loading
 */
const ShowMore = ({ showMore, shouldShowLoading }) => {
  return (
    showMore &&
    shouldShowLoading && (
      <div className='col-span-12 overflow-auto sm:col-span-12 md:col-span-12 lg:col-span-8'>
        <div className='mt-5 flex w-full items-center justify-center'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-black text-white'>
            <ArrowDown />
          </div>
        </div>
      </div>
    )
  );
};
ShowMore.propTypes = {
  showMore: PropTypes.bool,
  shouldShowLoading: PropTypes.bool,
};
export default ShowMore;

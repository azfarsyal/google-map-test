import React from 'react';
import PropTypes from 'prop-types';

/**
 * A component that displays a loading indicator.
 *
 * @component
 * @param {object} props - The props of the component.
 * @param {React.RefObject} props.viewRef - Ref for attaching to the loading container.
 * @param {Boolean} props.shouldShowLoading - Boolean to rander loading
 */
const Loading = ({ viewRef, shouldShowLoading }) => {
  return (
    shouldShowLoading && (
      <div>
        <div className='mt-[70px] grid place-items-center' ref={viewRef}>
          <div className='flex space-x-4'>
            <div className='pulse h-3 w-3 rounded-full bg-slate-700'></div>
            <div className='pulse h-3 w-3 rounded-full bg-slate-700'></div>
            <div className='pulse h-3 w-3 rounded-full bg-slate-700'></div>
          </div>
        </div>
      </div>
    )
  );
};

Loading.propTypes = {
  viewRef: PropTypes.object,
  shouldShowLoading: PropTypes.bool,
};

export default Loading;

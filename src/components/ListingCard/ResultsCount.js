import React from 'react';

/**
 * Results section for the Header component.
 *
 * @component
 * @param {object} props - The props of the component.
 * @param {number} props.totalCount - The total count of items to display.
 */
function ResultsCount({ totalCount }) {
  return (
    <div className='m-auto w-full max-w-[1440px] px-2 md:px-9'>
      <div className='flex items-center font-medium text-[#77787C] md:ml-0'>
        <div className='ml-4 mr-2 text-sm md:ml-0'>{totalCount} results</div>
      </div>
    </div>
  );
}

export default ResultsCount;

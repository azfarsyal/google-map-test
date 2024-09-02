'use client';
import React from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@/assets/icons/ArrowUpRight';
import MatchIcon from '@/assets/icons/Match';

/**
 * A card component to display a Card for event listing, with compound components for title, description, and image.
 *
 * @component
 * @param {object} props - The props of the component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the card.
 */
const ListingCard = ({ children, highlightLocationOnMap }) => {
  return (
    <div
      className='sm-mob:h-[272px] max-mob-h-full relative flex h-max w-full flex-col gap-3 md:h-[240px] md:max-h-[240px] md:min-h-[240px] md:max-w-full lg:h-full lg:max-h-[300px] lg:min-h-[280px] lg:max-w-[281px] xl:h-full xl:max-h-[373px] xl:min-h-[344px]'
      onClick={highlightLocationOnMap}
    >
      {children}
    </div>
  );
};

ListingCard.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * A sub-component for rendering the title of the ListingCard Title.
 *
 * @component
 * @param {object} props - The props of the component.
 * @param {React.ReactNode} props.children - The child elements to be rendered as the title.
 */
const CardTitle = ({ children }) => {
  return (
    <h6 className='line-clamp-2 h-full max-h-[56px] font-bold'>{children}</h6>
  );
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * A sub-component for rendering the town of the ListingCard Town.
 *
 * @component
 * @param {object} props - The props of the component.
 * @param {React.ReactNode} props.children - The child elements to be rendered as the town.
 */
const CardTown = ({ children }) => {
  return <p className='text-[#77787c] font-medium'>{children}</p>;
};

CardTown.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * A sub-component for rendering the image of the ListingCard Image.
 *
 * @component
 * @param {object} props - The props of the component.
 * @param {string} props.src - The child elements to be rendered as the image.
 */
const CardImage = ({ src }) => {
  return (
    <img
      src={src}
      className='sm-mob:h-[167px] max-mob:max-h-[335px] max-mob-h-full h-full w-full max-w-[280px] rounded-2xl object-cover object-center md:h-[139px] md:max-w-full lg:h-[180px] xl:h-[229px] xs:max-w-full'
      alt={'Image'}
    />
  );
};

CardImage.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * A sub-component for rendering the Discover of the ListingCard Discover.
 *
 * @component
 */
const CardDiscover = () => {
  return (
    <div className='flex items-center gap-2'>
      <p className='font-bold text-[14px]'>Discover</p>
      <ArrowRightIcon />
    </div>
  );
};

/**
 * A sub-component for rendering the matching percentage
 *
 * @component
 */
const MatchingBadge = ({matchedPercentage}) => {
  return (
    !!matchedPercentage && 
      <div className='absolute right-2 top-2 flex h-[32px] w-[103px] items-center justify-center gap-1 rounded-full bg-[#D3E172] px-2 py-3 shadow-md font-medium	'>
        <MatchIcon />
        <p className='text-[11px] text-[#04341D]'>{matchedPercentage}% match</p>
      </div>
  );
};

// Assign sub-components to the ListingCard component
ListingCard.Title = CardTitle;
ListingCard.Town = CardTown;
ListingCard.Image = CardImage;
ListingCard.Discover = CardDiscover;
ListingCard.MatchingBadge = MatchingBadge;

export default ListingCard;

'use client';
import React from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@/assets/icons/ArrowUpRight';

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
      className={`mb-4 flex h-max w-full flex-col gap-4 md:max-w-full lg:max-w-[281px]`}
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
  return <p className='text-[#77787c]'>{children}</p>;
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
      className='h-full w-full max-w-[280px] rounded-2xl object-center md:h-[139px] md:max-w-full lg:h-[180px] xl:h-[229px] xs:h-[167px] xs:max-w-[343px]'
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
    <div className='flex gap-2'>
      <p className='font-bold'>Discover</p>
      <ArrowRightIcon />
    </div>
  );
};

// Assign sub-components to the ListingCard component
ListingCard.Title = CardTitle;
ListingCard.Town = CardTown;
ListingCard.Image = CardImage;
ListingCard.Discover = CardDiscover;

export default ListingCard;

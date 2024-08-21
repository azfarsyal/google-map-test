'use client';
import React from 'react';
import PropTypes from 'prop-types';
import ListingCard from '.';
import { urlFor } from '@/services/sanity';
import NotFound from '@/assets/icons/NotFound';

/**
 * A component to display a list of cards with a grid layout, showing loading placeholders or actual card data.
 *
 * @component
 * @param {object} props - The props of the component.
 * @param {boolean} props.isLoading - Flag to indicate if the data is being loaded.
 * @param {object} props.data - The data to display in the cards.
 * @param {Array} props.data.items - The list of items to display in the cards.
 * @param {Function} props.onCardClick -  Handles the click event on a card, setting the selected item as the current detail and centering the map on the item's location.
 */
const ListCard = ({ isLoading, data, onCardClick }) => {
  return (
    <>
      <div className='xs:grid-cols-1 xs:place-items-center grid gap-x-[10px] gap-y-8 md:grid-cols-3 xmd:grid-cols-2'>
        {isLoading && !data.items?.length
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                className='h-60 w-full rounded-3xl bg-gray-200'
                key={index}
              />
            ))
          : data?.items?.map((item) => (
              <ListingCard key={item._id} onClick={() => onCardClick(item)}>
                <ListingCard.Image src={urlFor(item.image).url()} />
                <ListingCard.Title>{item.title}</ListingCard.Title>
                <ListingCard.Town>{item.town}</ListingCard.Town>
                <ListingCard.Discover />
              </ListingCard>
            ))}
      </div>
      {!isLoading && !data.items.length && (
        <div className='flex h-full flex-col items-center justify-center gap-2'>
          <NotFound />
          <p className='font-bold'>No Location Found</p>
        </div>
      )}
    </>
  );
};

ListCard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        town: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default ListCard;

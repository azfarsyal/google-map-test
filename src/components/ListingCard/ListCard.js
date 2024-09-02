'use client';
import PropTypes from 'prop-types';
import ListingCard from '.';
import { urlFor } from '@/services/sanity';
import NotFound from '@/assets/icons/NotFound';
import Loader from '../Loader';

/**
 * A component to display a list of cards with a grid layout, showing loading placeholders or actual card data.
 *
 * @component
 * @param {object} props - The props of the component.
 * @param {boolean} props.isLoading - Flag to indicate if the data is being loaded.
 * @param {object} props.data - The data to display in the cards.
 * @param {Array} props.data.items - The list of items to display in the cards.
 * @param {Function} props.highlightLocationOnMap -  Handles the click event on a card, setting the selected item as the current detail and centering the map on the item's location.
 * @param {boolean} props.disablePagination - Flag to indicate if the pagination is being disabled.
 */
const ListCard = ({
  isMobile,
  isLoading,
  data,
  highlightLocationOnMap,
  showLoader,
  disablePagination,
  isTablet,
}) => {
  const chunkSize = 3;
  const chunks = [];

  for (let i = 0; i < data?.items?.length; i += chunkSize) {
    chunks.push(data.items.slice(i, i + chunkSize));
  }

  const items = Array.from({ length: isTablet ? 3 : isMobile ? 2 : 6 });

  const groupedItems = items.reduce((acc, item, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(item);
    return acc;
  }, []);

  if (showLoader && isLoading) {
    return <Loader />;
  }

  // Get a random integer to show the dummy matched percentage as we are not using real data to match the searched place.
  const getRandomInteger = () => {
    const min = 20
    const max = 100
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <>
      <div
        className={`flex w-full flex-col lg:gap-8 ${data?.items?.length ? 'lg:h-full' : ''} md:gap-2 md:overflow-scroll lg:overflow-auto xs:gap-2`}
      >
        {(isLoading && !data.items?.length) || disablePagination
          ? groupedItems.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className='flex md:flex-col md:gap-5 lg:flex-row lg:gap-6 xs:flex-col xs:gap-4'
              >
                {group.map((_, itemIndex) => (
                  <div
                    className='flex h-max w-full flex-col gap-3 rounded-3xl bg-gray-200 md:h-[240px] md:max-w-full lg:max-w-[281px] xs:h-[272px]'
                    key={itemIndex}
                  />
                ))}
              </div>
            ))
          : chunks.map((chunk, chunkIndex) => {
              return (
                <div
                  key={chunkIndex}
                  className='flex md:flex-col md:gap-5 lg:flex-row lg:gap-6 xs:flex-col xs:gap-4'
                >
                  {chunk.map((item, index) => {
                    return (
                      <ListingCard
                        key={item._id}
                        highlightLocationOnMap={() =>
                          highlightLocationOnMap(item)
                        }
                      >
                        {index % 3 === 0 && <ListingCard.MatchingBadge matchedPercentage={getRandomInteger()} />}
                        <ListingCard.Image src={urlFor(item.image).url()} />
                        <div className='flex flex-col gap-3 lg:gap-4 xl:gap-6'>
                          <div className='flex flex-col gap-[2px] xl:gap-2'>
                            <ListingCard.Title>{item.title}</ListingCard.Title>
                            <ListingCard.Town>{item.town}</ListingCard.Town>
                          </div>
                          <div>
                            <ListingCard.Discover />
                          </div>
                        </div>
                      </ListingCard>
                    );
                  })}
                </div>
              );
            })}
      </div>
      {!isLoading && !data.items.length && (
        <div className='flex h-full flex-col items-center justify-center gap-2'>
          <NotFound />
          <p className='font-bold'>No Location Found</p>
          <p className='text-center text-xl text-[#77787c]'>
            Navigate in map to locate
          </p>
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

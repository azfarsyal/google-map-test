'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MatchIcon from '@/assets/icons/Match';
import { IoIosSearch } from 'react-icons/io';
import { ICON_COLOR, categories } from '@/utils/category';

/**
 * A component to display a header with categories and their icons.
 *
 * @component
 * @param {object} props - The props of the component.
 * @param {number} props.totalCount - The total count of items to display.
 */
const Header = ({ totalCount }) => {
  // State to track the selected category for highlighting
  const [selectedCategory, setSelectedCategory] = useState(null);

  /**
   * Handles the category click event, setting the clicked category as the selected one.
   *
   * @param {string} title - The title of the clicked category.
   */
  const handleCategoryClick = (title) => {
    setSelectedCategory(title);
  };

  return (
    <div className='m-auto flex max-w-[1440px] flex-col items-center px-0 md:px-7 lg:p-8'>
      <Header.HeroSection />
      <Header.Categories
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
        iconColor={ICON_COLOR}
      />
    </div>
  );
};

/**
 * Hero section for the Header component.
 *
 * @component
 */
const HeroSection = () => (
  <div className='relative m-3 h-[289px] w-full rounded-[36px] md:h-[250px] lg:h-[303px] xs:h-[289px] xs:rounded-[15px]'>
    <div className="absolute inset-0 rounded-[36px] bg-[url('/lake.jpg')] bg-cover bg-center xs:rounded-[15px]"></div>
    <div className='absolute inset-0 rounded-[36px] bg-black opacity-30 xs:rounded-[15px]'></div>
    <div className='relative flex h-full flex-col items-center justify-center md:mt-6 xs:mt-3'>
      <p className='min-mob:w-[295px] min-tab:text-[59px] mb-4 text-center text-[32px] font-bold text-white md:text-5xl lg:text-[69px] xs:text-4xl'>
        Personalize your experience
      </p>
      <div className='flex gap-4 rounded-full border border-[#BDBDBD]/40 bg-[#A3A3A3]/30 py-5 font-normal text-white backdrop-blur-md md:px-11 md:py-3 xs:gap-[0.80rem]'>
        <button disabled className='w-24 border-r-2 border-[#FFFFFF]/20 px-5'>
          When
        </button>
        <button disabled className='w-24 border-r-2 border-[#FFFFFF]/20 px-5'>
          Who
        </button>
        <button disabled className='w-24 rounded-full py-3'>
          More +
        </button>
      </div>
      <div className='mt-5 flex items-center space-x-2'>
        <MatchIcon color="white" width='24' height='24' />
        <div className='text-base font-normal capitalize leading-5 text-white'>
          SORT YOUR MATCHES
        </div>
      </div>
    </div>
  </div>
);

/**
 * Categories section for the Header component.
 *
 * @component
 * @param {object} props - The props of the component.
 * @param {Array} props.categories - The array of category objects with title and icon properties.
 * @param {string} props.selectedCategory - The title of the currently selected category.
 * @param {Function} props.handleCategoryClick - The function to call when a category is clicked.
 * @param {string} props.iconColor - The color of the icons.
 */
const Categories = ({
  categories,
  selectedCategory,
  handleCategoryClick,
  iconColor,
}) => (
  <div className='mt-4 w-[91.5%] overflow-auto lg:w-full'>
    <div className='mx-6 flex gap-12 whitespace-nowrap md:ml-0 xl:justify-center'>
      {categories.map((category, index) => (
        <div
          className={`flex cursor-pointer flex-col items-center pb-4 ${selectedCategory === category.title ? 'border-b-2 border-b-black' : ''}`}
          onClick={() => handleCategoryClick(category.title)}
          key={index}
        >
          <div className='mb-2 flex items-center justify-center'>
            {React.cloneElement(category.icon, {
              color: selectedCategory === category.title ? 'black' : iconColor,
            })}
          </div>
          <div
            className={`text-xs ${selectedCategory === category.title ? 'text-black' : 'text-[#77787C]'} font-bold leading-[1.1rem] capitalize`}
          >
            {category.title}
          </div>
        </div>
      ))}
      <div>
        <div className='mr-[10px] rounded-full border border-[E0E0E1] p-3'>
          <IoIosSearch size={24} color={iconColor} />
        </div>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  totalCount: PropTypes.number.isRequired,
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    })
  ).isRequired,
  selectedCategory: PropTypes.string,
  handleCategoryClick: PropTypes.func.isRequired,
  iconColor: PropTypes.string,
};

Header.HeroSection = HeroSection;
Header.Categories = Categories;

export default Header;

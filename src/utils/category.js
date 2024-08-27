import { BiCycling, BiDonateHeart, BiHappy, BiBeenHere } from 'react-icons/bi';
import { TbFlag3, TbMoodKid, TbMountain } from 'react-icons/tb';
import { FiShoppingCart } from 'react-icons/fi';

/**
 * A constant representing the default color used for icons in the categories.
 */
export const ICON_COLOR = '#77787C';

/**
 * An array of category objects used for displaying different types of activities or interests.
 * Each category object contains a title and an icon.
 * 
 * @constant
 * @type {Array<Object>}
 * @property {string} title - The title of the category.
 * @property {ReactElement} icon - The icon associated with the category, rendered as a React element.
 **/
export const categories = [
  { title: 'Adventure', icon: <BiCycling size={24} /> },
  { title: 'Arts & Culture', icon: <BiDonateHeart size={24} /> },
  { title: 'Attractions', icon: <TbFlag3 size={24} /> },
  { title: 'Family & Kids', icon: <TbMoodKid size={24} /> },
  { title: 'Nature & Sightseeing', icon: <TbMountain size={24} /> },
  { title: 'Outdoor Tours', icon: <BiHappy size={24} /> },
  { title: 'Shopping & Entertainment', icon: <FiShoppingCart size={24} /> },
  { title: 'Wellbeing', icon: <BiBeenHere size={24} /> },
];

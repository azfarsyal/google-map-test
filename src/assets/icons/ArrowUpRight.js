/**
 * A functional component that renders a Close icon using an SVG element.
 *
 * @param {React.SVGProps<SVGSVGElement>} props - The properties passed to the SVG element. This includes all standard SVG attributes as well as any custom props.
 * @returns {JSX.Element} The rendered SVG plus icon.
 */
export default function ArrowUpRight(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.8172 9.17159L10.2421 5.59913C9.9088 5.26604 9.9088 4.74143 10.2413 4.41667C10.5663 4.08358 11.0913 4.08358 11.4246 4.41583L16.4246 9.41214C16.6337 9.61574 16.7083 9.90897 16.6483 10.1787C16.6055 10.3776 16.491 10.5507 16.3335 10.6694L11.4164 15.5828C11.2581 15.7327 11.0414 15.8243 10.8248 15.8243L10.8331 15.8334C10.6081 15.8334 10.3914 15.7418 10.2414 15.5919C9.90812 15.2672 9.90812 14.7342 10.2331 14.4095V14.4011L13.7999 10.837L4.16683 10.837C3.70016 10.837 3.3335 10.4623 3.3335 10.0043C3.3335 9.53798 3.70016 9.17159 4.16683 9.17159L13.8172 9.17159Z'
        fill='black'
      />
    </svg>
  );
}

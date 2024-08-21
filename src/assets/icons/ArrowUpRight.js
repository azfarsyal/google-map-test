/**
 * A functional component that renders a Close icon using an SVG element.
 *
 * @param {React.SVGProps<SVGSVGElement>} props - The properties passed to the SVG element. This includes all standard SVG attributes as well as any custom props.
 * @returns {JSX.Element} The rendered SVG plus icon.
 */
export default function ArrowUpRight(props) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M7 17L17 7M17 7H7M17 7V17'
        stroke='black'
        strokeWidth='2.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

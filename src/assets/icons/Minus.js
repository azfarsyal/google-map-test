/**
 * A functional component that renders a plus icon using an SVG element.
 *
 * @param {React.SVGProps<SVGSVGElement>} props - The properties passed to the SVG element. This includes all standard SVG attributes as well as any custom props.
 * @returns {JSX.Element} The rendered SVG plus icon.
 */

export function MinusIcon(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path fill='currentColor' d='M19 12.998H5v-2h14z'></path>
    </svg>
  );
}

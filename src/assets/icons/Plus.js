/**
 * A functional component that renders a minus icon using an SVG element.
 *
 * @param {React.SVGProps<SVGSVGElement>} props - The properties passed to the SVG element. This includes all standard SVG attributes as well as any custom props.
 * @returns {JSX.Element} The rendered SVG plus icon.
 */
export function PlusIcon(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path fill='currentColor' d='M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z'></path>
    </svg>
  );
}

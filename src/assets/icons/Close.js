/**
 * A functional component that renders a Close icon using an SVG element.
 *
 * @param {React.SVGProps<SVGSVGElement>} props - The properties passed to the SVG element. This includes all standard SVG attributes as well as any custom props.
 * @returns {JSX.Element} The rendered SVG plus icon.
 */
export function CloseIcon({ fill }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='17px'
      height='17px'
      viewBox='0 0 24 24'
    >
      <path
        fill={fill}
        d='m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z'
      ></path>
    </svg>
  );
}

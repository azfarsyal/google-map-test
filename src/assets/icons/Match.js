const Match = ({color= 'black', width='16', height='16'}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke={color}
    >
      <path
        d='M11.286 8.94221C12.3672 8.94221 13.2438 8.05797 13.2438 6.9672C13.2438 5.87643 12.3672 4.99219 11.286 4.99219C10.2047 4.99219 9.32812 5.87643 9.32812 6.9672C9.32812 8.05797 10.2047 8.94221 11.286 8.94221Z'
        stroke-width='1.33333'
      />
      <path
        d='M10.1115 10.8513H12.4952C13.8521 10.8513 14.9793 11.8439 15.2017 13.1485C15.2898 13.6659 14.8984 14.14 14.3778 14.14H8.22893C7.70826 14.14 7.31692 13.6659 7.405 13.1485C7.62743 11.8439 8.75462 10.8513 10.1115 10.8513Z'
        stroke-width='1.33333'
      />
      <path
        d='M9.39742 7.41477L5.99065 10.8514L1.5014 6.36611L1.49526 6.35992C0.756625 5.63505 0.484026 4.55308 0.790073 3.55997C1.09612 2.56685 1.92841 1.83185 2.94467 1.65696C3.79926 1.51019 4.66221 1.78068 5.281 2.36778L5.30441 2.3914L5.97504 3.0769L6.66295 2.40939L6.69361 2.37959C7.28229 1.82173 8.09228 1.55068 8.90506 1.65359L9.04108 1.6744C10.049 1.85379 10.8746 2.58541 11.1795 3.57121C11.3651 4.17068 11.3395 4.80277 11.1277 5.36962'
        strokeWidth='1.33333'
      />
    </svg>
  );
};

export default Match;
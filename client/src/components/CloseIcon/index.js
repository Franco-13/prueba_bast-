const CloseIcon = (props) => (
  <svg
    height={21}
    width={21}
    viewBox="0 0 21 21"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(2 2)"
    >
      <circle cx={8.5} cy={8.5} r={8} />
      <path d="m5.5 5.5 6 6M11.5 5.5l-6 6" />
    </g>
  </svg>
);

export default CloseIcon;

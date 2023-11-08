export function ChevronLeft({ ...props }) {
  return (
    <svg
      viewBox="0 0 12 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.5 20.5L1 11L10.5 1.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRight({ ...props }) {
  return (
    <svg
      {...props}
      viewBox="0 0 84 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_56_24)">
        <mask
          id="mask0_56_24"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="84"
          height="156"
        >
          <path
            d="M0.578003 156H84L84 0.0500031H0.578003L0.578003 156Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_56_24)">
          <path
            d="M2.4006 10.764C1.2323 9.58301 0.577103 7.988 0.577103 6.327C0.577103 4.666 1.2323 3.071 2.4006 1.89C2.9738 1.307 3.6573 0.844 4.4113 0.528C5.1653 0.212 5.9746 0.0500031 6.7921 0.0500031C7.6095 0.0500031 8.4188 0.212 9.1728 0.528C9.9267 0.844 10.6103 1.307 11.1835 1.89L82.1766 73.59C83.3448 74.7713 84 76.3656 84 78.027C84 79.6884 83.3448 81.2827 82.1766 82.464L11.1845 154.164C10.6106 154.746 9.9268 155.207 9.173 155.523C8.4191 155.838 7.6102 156 6.7931 156C5.976 156 5.167 155.838 4.4131 155.523C3.6593 155.207 2.9755 154.746 2.4016 154.164C1.2333 152.983 0.578102 151.388 0.578102 149.727C0.578102 148.066 1.2333 146.471 2.4016 145.29L67.1486 78.027L2.4006 10.769V10.764Z"
            fill="black"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_56_24">
          <rect
            width="84"
            height="156"
            fill="white"
            transform="matrix(-1 0 0 -1 84 156)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

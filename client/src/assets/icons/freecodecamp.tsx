import React from 'react';

function FreeCodeCampLogo(): JSX.Element {
  return (
    <svg
      width={26}
      height={26}
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <mask
        id='mask0_4082_890'
        style={{ maskType: 'luminance' }}
        maskUnits='userSpaceOnUse'
        x={14}
        y={4}
        width={10}
        height={18}
      >
        <path d='M14.768 4.41992H23.4V21.5799H14.768V4.41992Z' fill='white' />
      </mask>
      <g mask='url(#mask0_4082_890)'>
        <path
          d='M14.8073 4.41797V7.92743L19.8775 12.9974L14.8073 18.0677V21.5772L23.387 12.9974L14.8073 4.41797Z'
          fill='white'
        />
      </g>
      <mask
        id='mask1_4082_890'
        style={{ maskType: 'luminance' }}
        maskUnits='userSpaceOnUse'
        x={2}
        y={4}
        width={10}
        height={18}
      >
        <path
          d='M2.60001 4.41992H11.232V21.5799H2.60001V4.41992Z'
          fill='white'
        />
      </mask>
      <g mask='url(#mask1_4082_890)'>
        <path
          d='M11.1973 7.92743V4.41797L2.61789 12.9974L11.1973 21.5772V18.0677L6.12707 12.9974L11.1973 7.92743Z'
          fill='white'
        />
      </g>
      <path
        d='M8.81213 12.9977L13.0022 8.80786L17.1922 12.9977L13.0022 17.1877L8.81213 12.9977Z'
        fill='white'
      />
    </svg>
  );
}

FreeCodeCampLogo.displayName = 'FreeCodeCampLogo';

export default FreeCodeCampLogo;

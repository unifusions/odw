import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const CompassIcon = (props) => (
  <Svg
    viewBox="0 0 36 36"
    width={props.size || 36}
    height={props.size || 36}
    fill="none"
    {...props}
  >
    {/* Outer orange circle */}
    <Circle fill="#F4900C" cx="18" cy="18" r="18" />
    
    {/* Yellow inner circle */}
    <Circle fill="#FFD983" cx="18" cy="18" r="14.5" />
    
    {/* White central circle */}
    <Circle fill="#F5F8FA" cx="18" cy="18" r="13" />
    
    {/* Star-like path */}
    <Path
      fill="#CCD6DD"
      d="M18 8l1.531 6.304l5.54-3.375l-3.375 5.54L28 18l-6.304 1.531l3.375 5.54l-5.54-3.375L18 28l-1.531-6.304l-5.54 3.375l3.375-5.54L8 18l6.304-1.531l-3.375-5.54l5.54 3.375z"
    />
    
    {/* Dark overlay triangle */}
    <Path
      fill="#292F33"
      d="M17.343 20.748l8.777 5.381l-5.379-8.778z"
    />
    
    {/* Red triangle */}
    <Path
      fill="#DD2E44"
      d="M18.657 15.267L9.879 9.886l5.38 8.779z"
    />
    
    {/* Gray center circle */}
    <Circle fill="#8899A6" cx="18" cy="18.008" r="3.055" />
    
    {/* White dot in center */}
    <Circle fill="#F5F8FA" cx="18" cy="18.008" r="1.648" />
  </Svg>
);

export default CompassIcon;

import { useMemo } from 'react';

export type PlayerIconType = {
  isActive: boolean;
  isAllIn: boolean;
};

const PlayerIcon = ({ isActive, isAllIn }: PlayerIconType) => {
  const color = useMemo(() => {
    if (isAllIn) return '#B4171E';
    return isActive ? '#005CFF' : '#7777';
  }, [isActive, isAllIn]);

  return (
    <svg
      width="61"
      height="72"
      viewBox="0 0 61 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.4336 17.614C12.4336 7.88457 20.4352 0 30.3091 0C40.1829 0 48.1905 7.88457 48.1905 17.614C48.1905 27.3492 40.1829 35.2338 30.3091 35.2338C20.4352 35.2338 12.4336 27.3492 12.4336 17.614ZM30.4429 72.0003C42.2478 72.0003 52.931 67.3433 60.6312 59.8513V54.5366C60.6312 48.1099 55.2047 42.8941 48.505 42.8941H12.1262C5.42649 42.8941 0 48.1099 0 54.5366V59.5836C7.71835 67.2269 18.5046 72.0003 30.4429 72.0003Z"
        fill={color}
        fillOpacity="0.8"
      />
    </svg>
  );
};

export default PlayerIcon;

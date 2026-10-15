import React from 'react';
import Svg, { Path, Rect, Circle, Line, G } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const LogoBoxIcon = ({ size = 26, color = '#F79E89' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="2" width="20" height="20" rx="4" stroke={color} strokeWidth="2.2" />
    <Path
      d="M7 12.5L10.5 16L17 8.5"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ListIcon = ({ size = 22, color = '#F76C5E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="9" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Line x1="9" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Line x1="9" y1="18" x2="21" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Circle cx="4.5" cy="6" r="1.8" fill={color} />
    <Circle cx="4.5" cy="12" r="1.8" fill={color} />
    <Circle cx="4.5" cy="18" r="1.8" fill={color} />
  </Svg>
);

export const FilterIcon = ({ size = 20, color = '#F76C5E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 4H21L14 12.5V18.5L10 20.5V12.5L3 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SettingsIcon = ({ size = 22, color = '#272727' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.4 15A1.65 1.65 0 0 0 19.73 16.82L20.1 17.26A2 2 0 0 1 17.27 20.09L16.83 19.72A1.65 1.65 0 0 0 15 19.39A1.65 1.65 0 0 0 14 20.94V21.5A2 2 0 0 1 10 21.5V20.94A1.65 1.65 0 0 0 9 19.39A1.65 1.65 0 0 0 7.18 19.72L6.74 20.09A2 2 0 0 1 3.91 17.26L4.28 16.82A1.65 1.65 0 0 0 4.61 15A1.65 1.65 0 0 0 3.06 14H2.5A2 2 0 0 1 2.5 10H3.06A1.65 1.65 0 0 0 4.61 9A1.65 1.65 0 0 0 4.28 7.18L3.91 6.74A2 2 0 0 1 6.74 3.91L7.18 4.28A1.65 1.65 0 0 0 9 4.61A1.65 1.65 0 0 0 10 3.06V2.5A2 2 0 0 1 14 2.5V3.06A1.65 1.65 0 0 0 15 4.61A1.65 1.65 0 0 0 16.82 4.28L17.26 3.91A2 2 0 0 1 20.09 6.74L19.72 7.18A1.65 1.65 0 0 0 19.39 9A1.65 1.65 0 0 0 20.94 10H21.5A2 2 0 0 1 21.5 14H20.94A1.65 1.65 0 0 0 19.4 15Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ClockIcon = ({ size = 20, color = '#FFFFFF' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <Path d="M12 7V12L15 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const PencilIcon = ({ size = 20, color = '#272727' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 3A2.828 2.828 0 1 1 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TrashIcon = ({ size = 20, color = '#272727' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 6H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path
      d="M19 6V20A2 2 0 0 1 17 22H7A2 2 0 0 1 5 20V6M8 6V4A2 2 0 0 1 10 2H14A2 2 0 0 1 16 4V6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line x1="10" y1="11" x2="10" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="14" y1="11" x2="14" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const CalendarIcon = ({ size = 20, color = '#FFFFFF' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="4" width="18" height="18" rx="3" stroke={color} strokeWidth="2" />
    <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" />
  </Svg>
);

export const ImageIcon = ({ size = 20, color = '#FFFFFF' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="2" />
    <Circle cx="8.5" cy="8.5" r="1.5" fill={color} />
    <Path
      d="M21 15L16 10L5 21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const EyeIcon = ({ size = 20, color = '#949494' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 12C2.5 7.5 7 4 12 4C17 4 21.5 7.5 23 12C21.5 16.5 17 20 12 20C7 20 2.5 16.5 1 12Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="2" />
  </Svg>
);

export const EyeOffIcon = ({ size = 20, color = '#949494' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2.5 16.5 1 12A18.45 18.45 0 0 1 5.06 6.06M9.9 4.24A9.12 9.12 0 0 1 12 4C17 4 21.5 7.5 23 12A18.5 18.5 0 0 1 19.78 16.22"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.12 14.12A3 3 0 1 1 9.88 9.88"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line x1="1" y1="1" x2="23" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const BackIcon = ({ size = 22, color = '#272727' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PlusIcon = ({ size = 26, color = '#FFFFFF' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);

export const ProfileIllustration = ({ width = 180, height = 200 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 200 220" fill="none">
    <Rect x="40" y="30" width="100" height="150" rx="10" fill="#FFFFFF" stroke="#F79E89" strokeWidth="3" />
    <Rect x="75" y="20" width="30" height="16" rx="4" fill="#D9D9D9" stroke="#949494" strokeWidth="1.5" />
    <Circle cx="90" cy="28" r="3" fill="#FFFFFF" />

    <Rect x="55" y="55" width="18" height="18" rx="3" stroke="#F76C5E" strokeWidth="2" />
    <Path d="M59 64L63 68L69 60" stroke="#F76C5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="82" y1="64" x2="125" y2="64" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />

    <Rect x="55" y="85" width="18" height="18" rx="3" stroke="#F76C5E" strokeWidth="2" />
    <Path d="M59 94L63 98L69 90" stroke="#F76C5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="82" y1="94" x2="125" y2="94" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />

    <Rect x="55" y="115" width="18" height="18" rx="3" stroke="#F76C5E" strokeWidth="2" />
    <Path d="M59 124L63 128L69 120" stroke="#F76C5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="82" y1="124" x2="125" y2="124" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />

    <Rect x="55" y="145" width="18" height="18" rx="3" stroke="#949494" strokeWidth="1.5" />
    <Line x1="82" y1="154" x2="120" y2="154" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />

    <Circle cx="150" cy="65" r="14" fill="#F79E89" />
    <Path d="M142 58C145 52 155 52 160 56C163 60 162 66 162 66C158 64 153 64 148 66C145 66 142 63 142 58Z" fill="#272727" />

    <Path d="M140 85C140 80 145 78 152 78C159 78 164 80 164 85L160 145H144L140 85Z" fill="#F76C5E" />

    <Path d="M145 92L125 105L130 115L146 100Z" fill="#F79E89" />
    <Path d="M158 92L172 108L166 116L155 102Z" fill="#F79E89" />

    <Line x1="147" y1="145" x2="147" y2="200" stroke="#272727" strokeWidth="6" strokeLinecap="round" />
    <Line x1="157" y1="145" x2="157" y2="200" stroke="#272727" strokeWidth="6" strokeLinecap="round" />
    <Path d="M142 200H152" stroke="#272727" strokeWidth="6" strokeLinecap="round" />
    <Path d="M154 200H164" stroke="#272727" strokeWidth="6" strokeLinecap="round" />

    <Path d="M110 95L120 70L135 110L125 130Z" fill="#F79E89" opacity="0.9" />
  </Svg>
);

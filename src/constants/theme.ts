import { Platform } from 'react-native';

export const Colors = {
  primary: '#F79E89',
  primaryDark: '#F76C5E',
  text: '#272727',
  textMuted: '#949494',
  textLight: '#FFFFFF',
  background: '#FFFFFF',
  backgroundLight: '#F8F8F8',
  border: '#D9D9D9',
  borderLight: '#EFEFEF',
  danger: '#EA5C54',
  success: '#52D174',
};

export const Fonts = {
  title: Platform.select({
    web: "'Bebas Neue', BebasNeue_400Regular, sans-serif",
    default: 'BebasNeue_400Regular',
  }),
  body: Platform.select({
    web: "'Montserrat', Montserrat_400Regular, sans-serif",
    default: 'Montserrat_400Regular',
  }),
  bodyMedium: Platform.select({
    web: "'Montserrat', Montserrat_500Medium, sans-serif",
    default: 'Montserrat_500Medium',
  }),
  bodySemiBold: Platform.select({
    web: "'Montserrat', Montserrat_600SemiBold, sans-serif",
    default: 'Montserrat_600SemiBold',
  }),
  bodyBold: Platform.select({
    web: "'Montserrat', Montserrat_700Bold, sans-serif",
    default: 'Montserrat_700Bold',
  }),
};

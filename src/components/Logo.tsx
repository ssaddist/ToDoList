import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';
import { LogoBoxIcon } from './Icons';

interface LogoProps {
  size?: 'normal' | 'small';
}

export const Logo = ({ size = 'normal' }: LogoProps) => {
  const isSmall = size === 'small';

  const containerWidth = isSmall ? 130 : 180;
  const letterFontSize = isSmall ? 32 : 46;
  const iconSize = isSmall ? 22 : 30;

  return (
    <View style={[styles.container, { width: containerWidth }]}>
      <View style={styles.row}>
        <View style={styles.colLeft}>
          <Text style={[styles.letter, { fontSize: letterFontSize }]}>T</Text>
        </View>
        <View style={styles.colCenter}>
          <Text style={[styles.letter, { fontSize: letterFontSize }]}>O</Text>
        </View>
        <View style={styles.colRight}>
          <LogoBoxIcon size={iconSize} color={Colors.primary} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.colLeft}>
          <Text style={[styles.letter, { fontSize: letterFontSize }]}>D</Text>
        </View>
        <View style={styles.colCenter}>
          <Text style={[styles.letter, { fontSize: letterFontSize }]}>O</Text>
        </View>
        <View style={styles.colRight} />
      </View>

      <View style={[styles.row, styles.bottomRow]}>
        <Text style={[styles.letter, { fontSize: letterFontSize }]}>L</Text>
        <Text style={[styles.letter, { fontSize: letterFontSize }]}>I</Text>
        <Text style={[styles.letter, { fontSize: letterFontSize }]}>S</Text>
        <Text style={[styles.letter, { fontSize: letterFontSize }]}>T</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    gap: 6,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  colLeft: {
    width: 36,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  colCenter: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colRight: {
    width: 36,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bottomRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  letter: {
    fontFamily: Fonts.title,
    color: Colors.primary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

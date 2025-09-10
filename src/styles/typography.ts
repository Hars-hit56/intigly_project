import {textScale} from './responsiveStyles';

export const FONT_FAMILY = {
  PRIMARY_THIN: 'Roboto-Thin',
  PRIMARY_LIGHT: 'Roboto-Light',
  PRIMARY_REGULAR: 'Roboto-Regularr',
  PRIMARY_MEDIUM: 'Roboto-Medium',
  PRIMARY_SEMI_BOLD: 'Roboto-SemiBold',
  PRIMARY_BLACK: 'Roboto-Black',
  PRIMARY_BOLD: 'Roboto-Bold',
  PRIMARY_EXTRA_BOLD: 'Roboto-ExtraBold',
};

export const FONT_SIZE = {
  VERY_SMALL: textScale(8),
  SMALL: textScale(9),
  NORMAL: textScale(10),
  SEMI_MEDIUM: textScale(12),
  MEDIUM: textScale(14),
  TITLE: textScale(16),
  LARGE: textScale(18),
  EXTRA_LARGE: textScale(20),
  DOUBLE_EXTRA_LARGE: textScale(24),
};

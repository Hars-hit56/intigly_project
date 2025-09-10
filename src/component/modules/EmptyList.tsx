import React from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import colors from '../../utility/colors';
import Image from '../common/Image';
import RegularText from '../common/RegularText';
import {APP_PADDING_HORIZONTAL} from '../../styles/globalStyles';
import {FONT_FAMILY, FONT_SIZE} from '../../styles/typography';
interface EmptyListProps {
  msg?: string;
  img?: string;
  contentStyle?: StyleProp<TextStyle>;
  textComponent?: any;
  mainContaierStyle?: StyleProp<ViewStyle>;
}

const EmptyList = ({
  msg,
  img,
  contentStyle,
  textComponent,
  mainContaierStyle,
}: EmptyListProps) => {
  return (
    <View style={[styles.mainContainer, mainContaierStyle]}>
      {img && <Image source={img} style={styles.img} />}
      {!textComponent ? (
        <RegularText style={[styles.content, contentStyle]}>
          {msg || 'No data'}
        </RegularText>
      ) : (
        textComponent
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    paddingVertical: APP_PADDING_HORIZONTAL * 2,
    backgroundColor: colors.TRANSPARENT,
    paddingHorizontal: APP_PADDING_HORIZONTAL * 2,
  },
  img: {},
  content: {
    fontSize: FONT_SIZE.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
  },
});

export default EmptyList;

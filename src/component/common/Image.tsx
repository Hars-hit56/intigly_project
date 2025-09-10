import React from 'react';
import {
  Image as RNImage,
  TouchableOpacity,
  View,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageResizeMode,
  ImageStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';

interface ImageProps {
  source: any;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode | any;
  showFull?: boolean;
  viewStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

const Image = ({
  source,
  style,
  resizeMode,
  showFull,
  viewStyle,
  isLoading,
}: ImageProps) => {
  function onPressImage(link: string) {}

  return (
    <>
      {
        <View style={viewStyle}>
          {source.uri == undefined ? (
            <RNImage
              source={source}
              resizeMode={resizeMode ? resizeMode : 'contain'}
              style={[style, {}]}
              key={source}
            />
          ) : showFull && showFull == true ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => onPressImage(source.uri)}>
              <FastImage
                source={source}
                resizeMode={resizeMode ? resizeMode : 'contain'}
                style={style as any}
                key={source.uri}
              />
            </TouchableOpacity>
          ) : (
            <FastImage
              source={source}
              resizeMode={resizeMode ? resizeMode : 'contain'}
              style={style as any}
              key={source.uri}
            />
          )}
        </View>
      }
    </>
  );
};

export default Image;

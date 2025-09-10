import React, {useEffect, useRef, useState} from 'react';
import {View, PanResponder, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export function DrawingOverlay({
  currentColor,
  layout,
  onPathsChange,
}: {
  currentColor?: string;
  layout: {x: number; y: number; width: number; height: number};
  onPathsChange: (paths: any[]) => void;
}) {
  const [paths, setPaths] = useState<{color?: string; points: any[]}[]>([]);

  const colorRef = useRef(currentColor);
  useEffect(() => {
    colorRef.current = currentColor;
  }, [currentColor]);

  useEffect(() => {
    onPathsChange(paths);
  }, [paths, onPathsChange]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: e => {
        const {locationX, locationY} = e.nativeEvent;
        setPaths(prev => [
          ...prev,
          {color: colorRef.current, points: [{x: locationX, y: locationY}]},
        ]);
      },
      onPanResponderMove: e => {
        const {locationX, locationY} = e.nativeEvent;
        setPaths(prev => {
          const copy = [...prev];
          if (!copy.length) return copy;
          copy[copy.length - 1].points.push({x: locationX, y: locationY});
          return copy;
        });
      },
    }),
  ).current;

  const pathToSvg = (pts: any[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <View
      style={[
        styles.mainContainer,
        {
          left: layout.x,
          top: layout.y,
          width: layout.width,
          height: layout.height,
        },
      ]}
      {...panResponder.panHandlers}>
      <Svg height={layout.height} width={layout.width}>
        {paths.map((p, idx) => (
          <Path
            key={idx}
            d={pathToSvg(p.points)}
            stroke={p.color}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});

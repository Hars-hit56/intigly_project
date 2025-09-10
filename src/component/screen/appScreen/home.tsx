import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import uuid from 'react-native-uuid';
import Video, {OnProgressData, VideoRef} from 'react-native-video';
import commonStyle, {
  APP_PADDING_HORIZONTAL,
} from '../../../styles/globalStyles';
import {spacing} from '../../../styles/spacing';
import {FONT_FAMILY, FONT_SIZE} from '../../../styles/typography';
import colors from '../../../utility/colors';
import {formatTime} from '../../../utility/commonFunction';
import {KEY_COMMENTS} from '../../../utility/constants';
import {Images} from '../../../utility/imagePaths';
import {CommentItem} from '../../../utility/types/generalType';
import Button from '../../common/buttons/Button';
import AppContainer from '../../common/container/AppContainer';
import Header from '../../common/header/Header';
import TextInput from '../../common/inputBoxes/TextInput';
import RegularText from '../../common/RegularText';
import CommentList from '../../modules/CommentList.';
import {DrawingOverlay} from '../../modules/DrawingOverlay';

const HomeScreen = () => {
  const videoRef = useRef<VideoRef>(null);

  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentText, setCommentText] = useState('');
  const [drawMode, setDrawMode] = useState(false);
  const [videoLayout, setVideoLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [activeDrawing, setActiveDrawing] = useState<CommentItem | null>(null);
  const [selectedColor, setSelectedColor] = useState(colors.RED_500);
  const [tempPaths, setTempPaths] = useState<any[]>([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(KEY_COMMENTS);
      if (raw) setComments(JSON.parse(raw));
    })();
  }, []);

  const saveComments = async (next: CommentItem[]) => {
    setComments(next);
    await AsyncStorage.setItem(KEY_COMMENTS, JSON.stringify(next));
  };

  const onProgress = (data: OnProgressData) => {
    setCurrentTime(data.currentTime);

    const match = comments.find(
      a =>
        Math.floor(a.timestamp) === Math.floor(data.currentTime) &&
        a.paths?.length,
    );
    setActiveDrawing(match || null);
  };

  const onPressSubmitComment = async () => {
    if (!commentText.trim()) {
      return Alert.alert('Please enter a comment');
    }

    const newComments: CommentItem = {
      id: uuid.v4() as string,
      timestamp: currentTime,
      text: commentText.trim(),
      paths: tempPaths.length > 0 ? tempPaths : undefined,
      createdAt: new Date().toISOString(),
    };
    const next = [...comments, newComments].sort(
      (a, b) => a.timestamp - b.timestamp,
    );
    await saveComments(next);

    // reset
    setCommentText('');
    setTempPaths([]);
    setDrawMode(false);
  };

  const onPressCommentCard = (comment: CommentItem) => {
    videoRef.current?.seek(comment.timestamp);
    setPaused(false);
    if (comment?.paths) setActiveDrawing(comment);
  };

  const COLORS = [colors.RED_500, colors.BLACK];

  const onPressPencil = () => {
    setDrawMode(prev => !prev);
  };

  return (
    <AppContainer>
      <Header title="Video" hideBack />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{flex: 1}} keyboardShouldPersistTaps="handled">
          <View style={{height: 200}}>
            <Video
              ref={videoRef}
              source={{
                uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              }}
              style={{flex: 1}}
              paused={paused}
              onProgress={onProgress}
              resizeMode="cover"
              controls
              onLayout={e => setVideoLayout(e.nativeEvent.layout)}
            />

            {drawMode && videoLayout && (
              <DrawingOverlay
                currentColor={selectedColor}
                layout={videoLayout}
                onPathsChange={setTempPaths}
              />
            )}

            {activeDrawing && videoLayout && (
              <View
                pointerEvents="none"
                style={{
                  position: 'absolute',
                  left: videoLayout.x,
                  top: videoLayout.y,
                  width: videoLayout.width,
                  height: videoLayout.height,
                }}>
                <Svg height={videoLayout.height} width={videoLayout.width}>
                  {activeDrawing.paths?.map((p, idx) => (
                    <Path
                      key={`${activeDrawing.id}-${idx}`}
                      d={p.points
                        .map(
                          (pt: any, i: number) =>
                            `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`,
                        )
                        .join(' ')}
                      stroke={p.color || selectedColor}
                      strokeWidth={3}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}
                </Svg>
              </View>
            )}
          </View>
          <RegularText style={styles.title}>Comments</RegularText>
          <View style={styles.seconderyContainer}>
            <CommentList
              comments={comments}
              onPressCommentCard={onPressCommentCard}
            />
          </View>
        </ScrollView>
        <View
          style={[
            styles.commentContainer,
            keyboardVisible && {marginBottom: spacing.MARGIN_36},
          ]}>
          <TextInput
            leftComponent={
              <View style={styles.timeLineContainer}>
                <Image source={Images.IMG_CLOCK} />
                <RegularText style={styles.timelineText}>
                  {formatTime(currentTime)}
                </RegularText>
              </View>
            }
            value={commentText}
            onChangeText={setCommentText}
            placeHolder="Leave your comment..."
            multiline
            inputContainerStyle={{borderColor: colors.TRANSPARENT}}
            isErrorPossible
          />
          <View style={styles.commentSeconderyContainer}>
            <View style={styles.colorPickerContainer}>
              <TouchableOpacity onPress={onPressPencil}>
                <Image source={Images.IMG_PENCIL} />
              </TouchableOpacity>
              {drawMode &&
                COLORS.map((color, index) => (
                  <View key={'color' + index} style={styles.colorContainer}>
                    <View style={styles.sperator} />
                    <TouchableOpacity
                      onPress={() => setSelectedColor(color)}
                      style={[styles.color, {backgroundColor: color}]}>
                      {color === selectedColor && (
                        <Image
                          source={Images.IMG_TICK}
                          style={styles.tickIcon}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
            <Button
              title="Comment"
              onPressButton={onPressSubmitComment}
              buttonStyle={styles.commentBtnStyle}
              textStyle={styles.commentBtnTextStyle}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  seconderyContainer: {flex: 1},
  title: {
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
    padding: APP_PADDING_HORIZONTAL,
    borderBottomWidth: spacing.WIDTH_1,
    borderBottomColor: colors.GREY_300,
  },
  commentContainer: {
    backgroundColor: colors.GREY_100,
    paddingBottom: APP_PADDING_HORIZONTAL,
    borderTopWidth: spacing.WIDTH_1,
    borderColor: colors.GREY_200,
  },
  timeLineContainer: {
    gap: spacing.MARGIN_5,
    ...commonStyle.flexDirectionRow,
    borderWidth: spacing.WIDTH_1,
    borderColor: colors.GREY_300,
    padding: spacing.PADDING_5,
    borderRadius: spacing.RADIUS_8,
    marginLeft: APP_PADDING_HORIZONTAL,
  },
  timelineText: {
    fontFamily: FONT_FAMILY.PRIMARY_MEDIUM,
    fontSize: FONT_SIZE.VERY_SMALL,
  },
  commentSeconderyContainer: {
    ...commonStyle.flexDirectionRow,
    justifyContent: 'space-between',
    paddingHorizontal: APP_PADDING_HORIZONTAL,
  },
  colorPickerContainer: {
    gap: spacing.MARGIN_10,
    flexDirection: 'row',
    borderWidth: spacing.WIDTH_1,
    borderColor: colors.GREY_300,
    paddingVertical: spacing.PADDING_6,
    paddingHorizontal: spacing.PADDING_10,
    borderRadius: spacing.RADIUS_8,
  },
  sperator: {
    height: '100%',
    width: spacing.WIDTH_1,
    backgroundColor: colors.GREY_300,
  },
  colorContainer: {gap: spacing.MARGIN_10, flexDirection: 'row'},
  color: {
    width: spacing.WIDTH_16,
    height: spacing.WIDTH_16,
    borderRadius: spacing.RADIUS_4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickIcon: {tintColor: colors.WHITE},
  commentBtnStyle: {height: spacing.HEIGHT_28},
  commentBtnTextStyle: {fontSize: FONT_SIZE.NORMAL},
});

export default HomeScreen;

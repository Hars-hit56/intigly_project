import {StyleSheet, TouchableOpacity, View} from 'react-native';
import commonStyle, {APP_PADDING_HORIZONTAL} from '../../styles/globalStyles';
import {spacing} from '../../styles/spacing';
import {FONT_FAMILY, FONT_SIZE} from '../../styles/typography';
import colors from '../../utility/colors';
import {formatTime, uploadedTime} from '../../utility/commonFunction';
import {CommentItem} from '../../utility/types/generalType';
import Image from '../common/Image';
import RegularText from '../common/RegularText';

type CommentCardProps = {
  comment: CommentItem;
  onPressCommentCard: (comment: CommentItem) => void;
  lastIndex: number;
  index: number;
};
const CommentCard = ({
  comment,
  onPressCommentCard,
  lastIndex,
  index,
}: CommentCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPressCommentCard(comment)}
      style={[
        styles.mainContainer,
        lastIndex === index + 1 && {borderBottomWidth: 0},
      ]}>
      <View style={styles.headerContainer}>
        <View style={styles.userImg} />
        <View style={styles.headerRightContainer}>
          <RegularText style={styles.username}>Harshit</RegularText>
          <RegularText style={styles.uploadedTime}>
            . {uploadedTime(comment?.createdAt)}
          </RegularText>
        </View>
      </View>
      <RegularText style={styles.desc}>
        <RegularText style={styles.timestamp}>
          {formatTime(comment.timestamp)}
        </RegularText>
        {'  '}
        {comment.text || 'Drawing'}
      </RegularText>
      {comment.imageUri && (
        <Image
          source={{uri: comment.imageUri}}
          style={{width: 60, height: 40, marginTop: 4}}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: APP_PADDING_HORIZONTAL,
    borderBottomWidth: spacing.WIDTH_1,
    borderColor: colors.GREY_300,
    gap: spacing.MARGIN_10,
  },
  headerContainer: {
    ...commonStyle.flexDirectionRow,
    gap: spacing.MARGIN_10,
  },
  headerRightContainer: {
    ...commonStyle.flexDirectionRow,
    gap: spacing.MARGIN_4,
  },
  userImg: {
    width: spacing.WIDTH_24,
    height: spacing.WIDTH_24,
    backgroundColor: colors.GREY_300,
    borderRadius: spacing.RADIUS_30,
  },
  username: {
    fontFamily: FONT_FAMILY.PRIMARY_MEDIUM,
    fontSize: FONT_SIZE.NORMAL,
  },
  uploadedTime: {
    fontFamily: FONT_FAMILY.PRIMARY_REGULAR,
    fontSize: FONT_SIZE.VERY_SMALL,
    color: colors.GREY_600,
  },
  desc: {
    fontFamily: FONT_FAMILY.PRIMARY_MEDIUM,
    fontSize: FONT_SIZE.SMALL,
  },
  timestamp: {
    color: colors.GREEN_500,
    fontFamily: FONT_FAMILY.PRIMARY_MEDIUM,
    fontSize: FONT_SIZE.SMALL,
  },
});

export default CommentCard;

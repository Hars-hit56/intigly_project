import {FlatList, View} from 'react-native';
import {CommentItem} from '../../utility/types/generalType';
import CommentCard from '../row/commentCard';
import EmptyList from './EmptyList';

type CommentListProps = {
  comments: CommentItem[];
  onPressCommentCard: (comment: CommentItem) => void;
};
const CommentList = ({comments, onPressCommentCard}: CommentListProps) => {
  return (
    <View>
      <FlatList
        data={comments}
        keyExtractor={i => i.id}
        renderItem={({item, index}: any) => (
          <CommentCard
            key={'CommentCard' + index}
            comment={item}
            onPressCommentCard={onPressCommentCard}
            lastIndex={comments?.length}
            index={index}
          />
        )}
        ListEmptyComponent={<EmptyList msg="No comments yet" />}
      />
    </View>
  );
};

export default CommentList;

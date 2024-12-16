import { useCallback, useContext, useEffect, useState } from 'react';
import { getComments, postComments } from '../api/comments';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { AppContext } from './AppContextProvider';
import { CommentDto } from '../dtos/CommentsDto';
import { toast } from 'react-toastify';
import { toastConfig } from '../../shared/toastConfig';

type CommentsProps = {
  imdbId: string;
};

const Comments = ({ imdbId }: CommentsProps) => {
  const [commentsList, setCommentsList] = useState<CommentDto[]>([]);
  const [comment, setComment] = useState<string>('');
  const { user } = useContext(AppContext);

  const updateComments = useCallback(async () => {
    const comments = await getComments(imdbId);
    setCommentsList(comments.data);
  }, [imdbId]);
  useEffect(() => {
    updateComments();
  }, [imdbId, updateComments]);

  const postComment = async () => {
    if (!comment) {
      toast.error('Comment cannot be empty', toastConfig);
      return;
    }
    await postComments(imdbId, comment);
    await updateComments();
    setComment('');
  };

  return (
    <div className="flex flex-col gap-4 rounded-md bg-slate-400 text-black w-full p-6">
      {user ? (
        <div className="w-full relative flex justify-center items-center">
          <input
            className="p-2 py-4 rounded-md w-full relative"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ajouter un commentaire..."></input>
          <FaArrowAltCircleRight
            size={24}
            className="absolute right-2"
            onClick={() => postComment()}
          />
        </div>
      ) : (
        <h2 className="text-mainBlack">
          <a className="hover:text-mainYellow" href="/login">
            Login
          </a>{' '}
          to post comments
        </h2>
      )}
      {commentsList.length > 0 &&
        commentsList.map((comments, index) => {
          return (
            <div key={index} className="flex gap-x-4 w-full">
              <img
                className="w-10 h-10 rounded-full"
                src={comments.author.profilePictureUrl}
                alt="Author profile picture"
              />
              <span>{comments.author.username.slice(0, 8)}</span>
              <span>{comments.content}</span>
            </div>
          );
        })}
    </div>
  );
};

export default Comments;

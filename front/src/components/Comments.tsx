import { useContext, useEffect, useState } from 'react';
import { getComments, postComments } from '../api/comments';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { AppContext } from './AppContextProvider';
import { CommentsDto } from '../dtos/CommentsDto';
import { toastConfig } from '../../shared/toastConfig';
import { toast } from 'react-toastify';

type CommentsProps = {
  imdbId: string | undefined;
};

const Comments = ({ imdbId }: CommentsProps) => {
  const [commentsList, setCommentsList] = useState<CommentsDto[]>([]);
  const [currentComment, setCurrentComment] = useState<string>('');
  const { user } = useContext(AppContext);
  useEffect(() => {
    if (!imdbId) return;
    const updateComments = async () => {
      const comments = await getComments(imdbId);
      setCommentsList(comments.data);
    };
    updateComments();
  }, [imdbId]);

  const postComment = async () => {
    if (!currentComment || !imdbId) return;
    if (currentComment.length > 75) {
      toast.warning('Nice try buddy', toastConfig);
      return;
    }
    const resp = await postComments(imdbId, currentComment);
    if (resp.status === 201) {
      const comments = await getComments(imdbId);
      setCommentsList(comments.data);
      setCurrentComment('');
      toast.success('Comment posted', toastConfig);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-md bg-slate-400 text-mainBlack w-full p-2 md:p-6">
      {user ? (
        <div className="flex flex-col gap-4 items-end">
          <div className="w-full relative flex justify-center items-center">
            <input
              className="p-2 rounded-md w-full relative"
              type="text"
              value={currentComment}
              onChange={(e) => {
                if (e.target.value.length <= 75)
                  setCurrentComment(e.target.value);
              }}
              placeholder="Ajouter un commentaire..."></input>
            <FaArrowAltCircleRight
              size={24}
              className="absolute right-2"
              onClick={() => postComment()}
            />
          </div>
          <div className="text-lg">{currentComment.length}/75</div>
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
            <div className="flex" key={index}>
              <img
                className="w-16 h-16 rounded-full mr-4"
                src={comments.author.profilePictureUrl || '/user-default.png'}
                alt=""
              />
              <div className="gap-y-2 flex flex-col justify-center items-start">
                <p className="text-xl text-slate-900 opacity-90">
                  {comments.author.username}
                </p>
                <p>{comments.content}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Comments;

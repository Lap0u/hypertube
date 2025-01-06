import { useContext, useEffect, useState } from 'react';
import { getComments, postComments } from '../api/comments';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { UserDto } from '../dtos/UserLoginDto';
import { AppContext } from './AppContextProvider';

type CommentsProps = {
  imdbId: string;
};

const Comments = ({ imdbId }: CommentsProps) => {
  const [commentsList, setCommentsList] = useState<string[]>([]);
  const { user } = useContext(AppContext);
  useEffect(() => {
    const updateComments = async () => {
      const comments = await getComments(imdbId);
      setCommentsList(comments.data);
    };
    updateComments();
  }, [imdbId]);

  const postComment = () => {
    alert('envoi');
    postComments(imdbId, 'salut');
  };

  return (
    <div className="flex flex-col gap-4 rounded-md bg-slate-400 text-mainBlack w-[70%] p-6">
      {user ? (
        <div className="w-full relative flex justify-center items-center">
          <input
            className="p-2 rounded-md w-full relative"
            type="text"
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
          return <div key={index}>{comments.content}</div>;
        })}
    </div>
  );
};

export default Comments;

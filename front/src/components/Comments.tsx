import { useEffect, useState } from 'react';
import { getComments, postComments } from '../api/comments';
import { FaArrowAltCircleRight } from 'react-icons/fa';

type CommentsProps = {
  imdbId: string;
};

const Comments = ({ imdbId }: CommentsProps) => {
  const [commentsList, setCommentsList] = useState<string[]>([]);
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
    <div className="flex flex-col gap-4 rounded-md bg-slate-400 text-black w-full p-6">
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

      {commentsList.length > 0 &&
        commentsList.map((comments, index) => {
          return <div key={index}>{comments.content}</div>;
        })}
    </div>
  );
};

export default Comments;

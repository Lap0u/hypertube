type CommentsProps = {
  imdbId: string;
};

const Comments = ({ imdbId }: CommentsProps) => {
  return <div className="bg-red text-blue-400">Comments {imdbId}</div>;
};

export default Comments;

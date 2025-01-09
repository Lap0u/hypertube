export type CommentsDto = {
  id: number;
  authorId: number;
  content: string;
  movieId: string;
  author: {
    username: string;
    profilePictureUrl: string;
  };
};

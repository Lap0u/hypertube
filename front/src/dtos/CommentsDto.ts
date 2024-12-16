export type CommentDto = {
  id: number;
  authorId: number;
  content: string;
  movieId: string;
  createAt: string;
  author: {
    username: string;
    profilePictureUrl: string;
  };
};

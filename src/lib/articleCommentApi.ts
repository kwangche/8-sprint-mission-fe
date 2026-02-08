import type { CreateCommentData, UpdateCommentData, CommentParams } from '@/types';

  createComment,
  getComments,
  updateComment as updateSharedComment,
  deleteComment as deleteSharedComment,
} from '@/lib/commentApi';

// ============================================
// 자유게시판 댓글 관련 API
// ============================================

/**
 * 자유게시판 댓글 등록
 */
export const createArticleComment = async (
  articleId: string | number,
  commentData: CreateCommentData,
): Promise<Comment> => {
  return createComment('article', articleId, commentData);
};

/**
 * 자유게시판 댓글 목록 조회
 */
export const getArticleComments = async (
  articleId: string | number,
  params: CommentParams = {},
): Promise<Comment[]> => {
  return getComments('article', articleId, params);
};

/**
 * 댓글 수정
 */
export const updateComment = async (
  commentId: string | number,
  commentData: UpdateCommentData,
): Promise<Comment> => {
  return updateSharedComment(commentId, commentData);
};

/**
 * 댓글 삭제
 */
export const deleteComment = async (commentId: string | number): Promise<void> => {
  await deleteSharedComment(commentId);
};
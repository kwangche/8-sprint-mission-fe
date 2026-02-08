import { api } from './apiClient';
import { commentSchema, commentsResponseSchema } from '@/schemas';
import { Comment, CreateCommentData, UpdateCommentData, CommentParams } from '@/types';
import { buildQueryParams } from '@/lib/queryParams';

type CommentResource = 'article' | 'product';

export async function createComment(
  resource: CommentResource,
  resourceId: string | number,
  commentData: CreateCommentData,
): Promise<Comment> {
  const response = await api.post(`/comments/${resource}/${resourceId}`, commentData, { auth: true });
  return commentSchema.parse(response);
}

export async function getComments(
  resource: CommentResource,
  resourceId: string | number,
  params: CommentParams = {},
): Promise<Comment[]> {
  const query = buildQueryParams({
    limit: params.limit,
    cursor: params.cursor,
  });

  const response = await api.get(
    `/comments/${resource}/${resourceId}${query ? `?${query}` : ''}`,
  );
  const validated = commentsResponseSchema.parse(response);
  return validated?.list || validated?.comments || [];
}

export async function updateComment(
  commentId: string | number,
  commentData: UpdateCommentData,
): Promise<Comment> {
  const response = await api.patch(`/comments/${commentId}`, commentData, { auth: true });
  return commentSchema.parse(response);
}

export async function deleteComment(commentId: string | number): Promise<void> {
  await api.delete(`/comments/${commentId}`, { auth: true });
}

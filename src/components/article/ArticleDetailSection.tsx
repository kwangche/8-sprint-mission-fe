'use client';

import { useEffect, useState } from 'react';
import { useArticles } from '@/providers/ArticleProvider';
import { useAuth } from '@/providers/AuthProvider';
import DropdownMenu from '@/components/DropdownMenu';

import {
  ArticleDetailContent,
  ArticleDetailError,
  ArticleDetailLoading,
} from './ArticleDetailStates';

interface ArticleDetailSectionProps {
  articleId: string;
}

export default function ArticleDetailSection({ articleId }: ArticleDetailSectionProps) {
  const {
    currentArticle,
    getArticleById,
    toggleArticleFavorite,
    loading: articleLoading,
    error: articleError,
  } = useArticles();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!user;

  useEffect(() => {
    if (!articleId) return;
    getArticleById(articleId).catch((e) => console.error('상세 로드 실패', e));
  }, [articleId, getArticleById]);

  const handleFavoriteToggle = async (nextFavorite: boolean) => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }
    const result = await toggleArticleFavorite(articleId);
    if (result && typeof result === 'object') {
      return {
        isLiked: result.isLiked ?? nextFavorite,
        favoriteCount: result.favoriteCount ?? 0,
      };
    }
  };

  // 로딩 상태
  if (articleLoading) {
    return <ArticleDetailLoading />;
  }

  // 에러 상태
  if (articleError) {
    return <ArticleDetailError />;
  }

  // 데이터 없음 상태
  if (!currentArticle) {
    return <ArticleDetailError message="게시글을 찾을 수 없습니다." />;
  }

  // 성공 상태
  return (
    <ArticleDetailContent
      article={currentArticle}
      isLoggedIn={isLoggedIn}
      onFavoriteToggle={handleFavoriteToggle}
      onMenuClick={() => setMenuOpen((v) => !v)}
      menuOpen={menuOpen}
      MenuComponent={
        <DropdownMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          articleId={articleId}
          type="article"
        />
      }
    />
  );
}

import Image from 'next/image';
import React from 'react';

import FavoriteButton from '@/components/product/FavoriteButton';
import { Article } from '@/types/article';
import { formatCreatedAt } from '@/utils/formatter';
/**
 * 로딩 상태 컴포넌트
 */
export function ArticleDetailLoading() {
  return (
    <div>
      <div className="mb-6 border-b pb-6" style={{ borderColor: 'var(--gray-200)' }}>
        <div className="h-8 w-2/3 bg-gray-100 rounded animate-pulse" />
        <div className="mt-3 flex items-center gap-4">
          <div className="h-5 w-40 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
      <div className="mb-10">
        <div className="h-64 w-full bg-gray-100 rounded animate-pulse mb-4" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/**
 * 에러 상태 컴포넌트
 */
interface ArticleDetailErrorProps {
  message?: string;
}

export function ArticleDetailError({ message = '게시글을 불러오지 못했습니다.' }: ArticleDetailErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-center">
        <div className="mb-4 text-6xl">⚠️</div>
        <p className="text-lg font-medium mb-2" style={{ color: 'var(--gray-900)' }}>
          {message}
        </p>
        <p className="text-sm" style={{ color: 'var(--gray-500)' }}>
          잠시 후 다시 시도해주세요.
        </p>
      </div>
    </div>
  );
}

/**
 * 성공 상태 - 본문 콘텐츠 컴포넌트
 */
interface ArticleDetailContentProps {
  article: Article;
  isLoggedIn: boolean;
  onFavoriteToggle: (nextFavorite: boolean) => Promise<{ isLiked: boolean; favoriteCount: number } | void>;
  onMenuClick: () => void;
  menuOpen: boolean;
  MenuComponent: React.ReactNode;
}

export function ArticleDetailContent({
  article,
  isLoggedIn,
  onFavoriteToggle,
  onMenuClick,
  menuOpen,
  MenuComponent,
}: ArticleDetailContentProps) {
  return (
    <div>
      {/* 제목과 메타 */}
      <div className="mb-6 border-b pb-6" style={{ borderColor: 'var(--gray-200)' }}>
        <div className="flex items-center justify-between relative">
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--gray-900)' }}>
            {article.title || '제목 없음'}
          </h1>
          <div className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={onMenuClick}
              className="p-1 rounded hover:bg-gray-50"
            >
              <Image src="/images/icon/ic_kebab.svg" alt="더보기" width={20} height={20} />
            </button>
            {MenuComponent}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center text-sm gap-2" style={{ color: 'var(--gray-500)' }}>
            <Image src="/images/icon/ic_profile.svg" alt="작성자" width={20} height={20} />
            <span>{article.writer?.nickname || '익명'}</span>
            <span>{formatCreatedAt(article.createdAt)}</span>
          </div>

          <div className="text-sm pl-4 border-l" style={{ color: 'var(--gray-500)' }}>
            <FavoriteButton
              isLiked={article.isLiked || false}
              count={article.favoriteCount || 0}
              disabled={!isLoggedIn}
              onToggle={onFavoriteToggle}
            />
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="mb-10 whitespace-pre-wrap leading-7" style={{ color: 'var(--gray-800)' }}>
        {article.image && (
          <div
            className="mb-6 w-full rounded-lg overflow-hidden border"
            style={{ borderColor: 'var(--gray-100)' }}
          >
            <Image
              src={article.image}
              alt={article.title}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        {article.content || <p className="text-gray-500">내용이 없습니다.</p>}
      </div>
    </div>
  );
}
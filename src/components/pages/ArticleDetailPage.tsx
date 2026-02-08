'use client';

import Link from 'next/link';
import React from 'react';

import ArticleCommentSection from '@/components/article/ArticleCommentSection';
import ArticleDetailSection from '@/components/article/ArticleDetailSection';
import Button from '@/components/Button';
interface ArticleDetailPageProps {
  articleId: string;
}

export default function ArticleDetailPage({ articleId }: ArticleDetailPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ArticleDetailSection articleId={articleId} />
      <ArticleCommentSection articleId={articleId} />
      <div className="flex justify-center">
        <Button as={Link} href="/article" appearance="primary">
          목록으로 돌아가기 ↩
        </Button>
      </div>
    </div>
  );
}
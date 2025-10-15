import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MotionDiv } from '@/components/blogs/MotionWrapper';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { Components } from 'react-markdown';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;

  const blogsDirectory = path.join(process.cwd(), 'src/data/blogs');
  const filePath = path.join(blogsDirectory, `${slug}.md`);

  let post;
  let frontmatter;

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    frontmatter = data;
    post = content;
  } catch {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>404</h1>
          <p className='text-gray-600 mb-8'>Blog post not found</p>
          <Link href='/blogs' className='text-blue-600 hover:text-blue-700'>
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white min-h-screen'>
      {/* Header with cover image */}
      <div className='relative h-[60vh] w-full'>
        <Image
          src={frontmatter.image}
          alt={frontmatter.title}
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white' />
      </div>

      {/* Content container */}
      <div className='max-w-3xl mx-auto px-6 sm:px-8 -mt-32 relative z-10'>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back button */}
          <Link
            href='/blogs'
            className='inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors'
          >
            <svg
              className='w-5 h-5 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            Back to Blogs
          </Link>

          {/* Title and meta */}
          <article className='bg-white rounded-lg'>
            <header className='mb-12'>
              <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
                {frontmatter.title}
              </h1>

              <div className='flex items-center text-gray-600 text-sm space-x-4 mb-6'>
                <time dateTime={frontmatter.date}>
                  {new Date(frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>•</span>
                <span>{frontmatter.author}</span>
              </div>

              {frontmatter.tags && (
                <div className='flex flex-wrap gap-2'>
                  {frontmatter.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className='px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Markdown content with custom styling */}
            <div
              className="prose prose-lg prose-slate max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6 prose-h1:font-extrabold
              prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:font-bold
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:font-semibold
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg
              prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:text-blue-800 hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-em:text-gray-700 prose-em:italic
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
              prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:my-6
              prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:shadow-lg
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-700 prose-li:my-2 prose-li:leading-relaxed
              prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-8
              prose-hr:my-8 prose-hr:border-gray-300
              prose-table:border-collapse prose-table:w-full prose-table:my-8
              prose-thead:bg-gray-50
              prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900
              prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-3 prose-td:text-gray-700
            "
            >
              <ReactMarkdown
                components={
                  {
                    code(props) {
                      const { className, children } = props;
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <SyntaxHighlighter
                          style={oneDark as Record<string, React.CSSProperties>}
                          language={match[1]}
                          PreTag='div'
                          className='rounded-lg !mt-6 !mb-6'
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className}>{children}</code>
                      );
                    },
                    img(props) {
                      const { src, alt } = props;
                      if (!src) return null;
                      return (
                        <span className='block my-8'>
                          <Image
                            src={src as string}
                            alt={alt ?? ''}
                            width={800}
                            height={500}
                            className='rounded-lg shadow-lg w-full h-auto'
                          />
                        </span>
                      );
                    },
                  } as Components
                }
              >
                {post}
              </ReactMarkdown>
            </div>
          </article>

          {/* Bottom navigation */}
          <div className='mt-16 mb-12 pt-8 border-t border-gray-200'>
            <Link
              href='/blogs'
              className='inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium'
            >
              <svg
                className='w-5 h-5 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
              View all posts
            </Link>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default BlogPostPage;

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { MotionDiv } from '@/components/blogs/MotionWrapper';
import ReactMarkdown from 'react-markdown';

// Define type for params - params is a Promise in Next.js 15+
interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  // Await the params
  const { slug } = await params;

  const blogsDirectory = path.join(process.cwd(), 'src/data/blogs');
  const filePath = path.join(blogsDirectory, `${slug}.json`);

  let post;
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    post = JSON.parse(fileContents);
  } catch {
    return <div>Not Found</div>;
  }

  return (
    <div className='bg-white min-h-screen'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href='/blogs'>
            <span className='text-gray-500 hover:text-gray-700 mb-8 block'>
              &larr; Back to Blogs
            </span>
          </Link>
          <div className='relative h-96 mb-8'>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className='rounded-lg object-cover'
            />
          </div>
          <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-8'>
            {post.title}
          </h1>
          <div className='prose lg:prose-xl max-w-none'>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default BlogPostPage;

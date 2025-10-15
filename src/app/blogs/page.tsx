import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MotionDiv } from '@/components/blogs/MotionWrapper';

const BlogsPage = () => {
  const blogsDirectory = path.join(process.cwd(), 'src/data/blogs');
  const filenames = fs.readdirSync(blogsDirectory);

  const posts = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace('.md', '');
      const filePath = path.join(blogsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        image: data.image,
        date: data.date,
        author: data.author,
        tags: data.tags,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className='bg-white min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center'>
            Our Blog
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {posts.map((post, index) => (
              <MotionDiv
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Link href={`/blogs/${post.slug}`}>
                  <div className='bg-gray-50 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden'>
                    <div className='relative h-48'>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='p-6'>
                      <div className='flex items-center text-sm text-gray-500 mb-2'>
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      <h2 className='text-xl font-bold text-gray-900 mb-2'>
                        {post.title}
                      </h2>
                      <p className='text-gray-600 mb-4'>{post.excerpt}</p>
                      {post.tags && (
                        <div className='flex flex-wrap gap-2'>
                          {post.tags.slice(0, 3).map((tag: string) => (
                            <span
                              key={tag}
                              className='px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded'
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default BlogsPage;

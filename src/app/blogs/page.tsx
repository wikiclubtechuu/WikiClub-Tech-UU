import React from "react";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { MotionDiv } from "@/components/blogs/MotionWrapper";

const BlogsPage = () => {
  const blogsDirectory = path.join(process.cwd(), "src/data/blogs");
  const filenames = fs.readdirSync(blogsDirectory);

  const posts = filenames.map((filename) => {
    const slug = filename.replace(".json", "");
    const filePath = path.join(blogsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const post = JSON.parse(fileContents);
    return {
      slug,
      ...post,
    };
  });

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center">
            Our Blog
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <MotionDiv
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Link href={`/blogs/${post.slug}`}>
                  <div className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={post.image}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                      <p className="text-gray-600">{post.excerpt}</p>
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
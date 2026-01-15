import React from "react";
import Container from "../../Shared/Container";
import { Darkbg } from "../../Shared/Darkbg";

const Blog = () => {
  const posts = [
    {
      title: "How to Write a Strong Scholarship Essay",
      date: "Updated regularly",
      excerpt:
        "A simple structure and a clear story can make your application stand out.",
    },
    {
      title: "Common Mistakes to Avoid While Applying",
      date: "Updated regularly",
      excerpt:
        "From missing documents to vague answers—here’s what to watch for.",
    },
    {
      title: "Checklist: Before You Submit Your Application",
      date: "Updated regularly",
      excerpt:
        "A quick final review can save you from easy-to-fix problems.",
    },
  ];

  return (
    <Darkbg>
      <Container>
        <div className="mt-17 min-h-screen">
          <title>Blog</title>
          <div className="max-w-5xl mx-auto py-10">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Blog
            </h1>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Tips, guides, and updates to help you find and apply for
              scholarships.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.title}
                  className="bg-white dark:bg-[#0b0b0b] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-black/40"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {post.date}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Darkbg>
  );
};

export default Blog;

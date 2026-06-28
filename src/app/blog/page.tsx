/* eslint-disable */
"use client";

import React, { useMemo, useState } from "react";

const BLOG_POSTS = [
  {
    slug: "the-real-stories-of-crushing-fatigue-with-zennova-pure-himalayan-shilajit",
    title: "The Real Stories of Crushing Fatigue with Zennova Pure Himalayan Shilajit",
    date: "May 21, 2026",
    category: "Self Care",
    image: "/storage/zennova-blog-shilajit.png",
    summary:
      "We have all been there. It is 3:00 PM, you are staring at your laptop screen, and your brain feels like lead. Discover how pure gold-grade Himalayan Shilajit is helping thousands reclaim their energy and focus naturally.",
  },
  {
    slug: "burn-fat-smarter-feel-stronger-every-day",
    title: "Burn Fat Smarter, Feel Stronger Every Day",
    date: "May 21, 2026",
    category: "Fitness",
    image: "/storage/zennova-blog-fat-burner.png",
    summary:
      "Are you struggling with stubborn belly fat, low energy levels, or uncontrollable cravings? Learn the smart science behind thermogenesis and how a curated fat burner can accelerate your progress safely.",
  },
  {
    slug: "the-sleep-that-actually-makes-you-glow-why-zennova-sleepglow-is-the-transformation-youve-been-praying-for",
    title: "Why Zennova SLEEPGlow Is the Missing Piece to Your Wellness Puzzle",
    date: "May 21, 2026",
    category: "Self Care",
    image: "/storage/zennova-blog-sleepglow.png",
    summary:
      "Deep, restorative REM sleep is the ultimate beauty and longevity secret. Meet the natural sleep aid changing everything for people who are tired of waking up exhausted.",
  },
];

function BlogGridCard({ post }: { post: (typeof BLOG_POSTS)[0] }) {
  const href = `/blog/${post.slug}`;
  return (
    <article className="zn-blog-card">
      <a href={href} className="zn-blog-card-link">
        <div className="zn-blog-card-img-wrapper">
          <img src={post.image} alt={post.title} className="zn-blog-card-img" loading="lazy" />
        </div>
        <div className="zn-blog-card-content">
          <div className="zn-blog-card-meta">
            <span>{post.date}</span>
            <span className="zn-blog-card-meta__dot" aria-hidden="true" />
            <span>{post.category}</span>
          </div>
          <h3 className="zn-blog-card-title">{post.title}</h3>
          <p className="zn-blog-card-summary">{post.summary}</p>
          <span className="zn-blog-card-more">Read more</span>
        </div>
      </a>
    </article>
  );
}

export default function BlogListing() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    BLOG_POSTS.forEach((post) => {
      counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    });
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredPosts = useMemo(() => {
    if (!activeCategory) return BLOG_POSTS;
    return BLOG_POSTS.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="zn-blog-page-bg">
      <section className="zn-blog-breadcrumb">
        <div className="container">
          <h1 className="zn-blog-main-title">Latest News & Articles</h1>
        </div>
      </section>

      <section className="zn-blog-grid-area">
        <div className="container">
          <div className="zn-blog-layout">
            <div className="zn-blog-main">
              {filteredPosts.length === 0 ? (
                <div className="zn-blog-empty">
                  <p>No posts in this category yet.</p>
                  <button type="button" className="zn-blog-cat-clear" onClick={() => setActiveCategory(null)}>
                    View all posts
                  </button>
                </div>
              ) : (
                <div className="zn-blog-posts-grid">
                  {filteredPosts.map((post) => (
                    <BlogGridCard post={post} key={post.slug} />
                  ))}
                </div>
              )}
            </div>

            <aside className="zn-blog-sidebar">
              <div className="zn-blog-sidebar-card zn-blog-about-card">
                <h2 className="zn-blog-sidebar-title">About Me</h2>
                <img src="/storage/ravi-avatar.png" alt="Aanya Sharma" className="zn-blog-author-avatar" />
                <h3 className="zn-blog-author-name">Aanya Sharma</h3>
                <span className="zn-blog-author-title">Wellness Editor &amp; Blogger</span>
                <p className="zn-blog-author-bio">
                  I write about supplements, recovery, and everyday wellness — turning science into
                  simple tips you can actually use.
                </p>
              </div>

              <div className="zn-blog-sidebar-card">
                <h2 className="zn-blog-sidebar-title">Latest Posts</h2>
                <div className="zn-blog-recent-posts-list">
                  {BLOG_POSTS.slice(0, 3).map((post) => (
                    <a href={`/blog/${post.slug}`} className="zn-blog-recent-post-item" key={`recent-${post.slug}`}>
                      <span className="zn-blog-recent-thumb-wrap">
                        <img src={post.image} alt={post.title} className="zn-blog-recent-thumb" loading="lazy" />
                      </span>
                      <div className="zn-blog-recent-content">
                        <span className="zn-blog-recent-meta">{post.date}</span>
                        <h4 className="zn-blog-recent-title">{post.title}</h4>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="zn-blog-sidebar-card">
                <h2 className="zn-blog-sidebar-title">Categories</h2>
                <div className="zn-blog-cat-list">
                  <button
                    type="button"
                    className={`zn-blog-cat-item ${activeCategory === null ? "is-active" : ""}`}
                    onClick={() => setActiveCategory(null)}
                  >
                    <span className="zn-blog-cat-item__label">All Posts</span>
                    <span className="zn-blog-cat-badge">{BLOG_POSTS.length}</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat.name}
                      className={`zn-blog-cat-item ${activeCategory === cat.name ? "is-active" : ""}`}
                      onClick={() => setActiveCategory(cat.name)}
                    >
                      <span className="zn-blog-cat-item__label">{cat.name}</span>
                      <span className="zn-blog-cat-badge">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

import React from 'react';
import '../../Style/CSS/Landing/10LatestBlog.css';

import boss from "../../assets/image/boss.jpg"
import emp from "../../assets/image/emp.jpg"
import meet from "../../assets/image/meet.jpg"

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: {
    day: string;
    month: string;
  };
  imageUrl: string;
}

const LatestBlog: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Making innovative strategies for outstanding.",
      category: "Business",
      date: { day: "14", month: "JUL" },
      imageUrl: boss
    },
    {
      id: 2,
      title: "What Are The Other Roles Of Financial Advisor?",
      category: "Economy",
      date: { day: "14", month: "JUL" },
      imageUrl: emp
    },
    {
      id: 3,
      title: "How to Use the Investment Growth Calculator",
      category: "Finance",
      date: { day: "14", month: "JUL" },
      imageUrl: meet
    }
  ];

  const handleCardClick = (postId: number) => {
    console.log(`Clicked on blog post ${postId}`);
    // Add your navigation logic here
  };

  return (
    <section className="latest-blog-section">
      <div className="section-header ">
        <div className="header-left py-5">
          <span className="badge">Latest Blog</span>
          <h2 className="section-title min-[1000px]:mb-3">Latest news coming</h2>
        </div>
        <div className="header-right">
          <p className="section-description">
            We welcome and celebrate different perspectives to help our firm, our clients and our people grow. 
            Ipsum aenean comma dolig slove. Proin quis de suis crestopius.
          </p>
        </div>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <article 
            key={post.id} 
            className="news-card"
            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            onClick={() => handleCardClick(post.id)}
          >
            <div 
              className="news-image" 
              style={{ 
                backgroundImage: `url(${post.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="news-overlay">
                <div className="news-date">
                  <span className="date-number">{post.date.day}</span>
                  <span className="date-month">{post.date.month}</span>
                </div>
                <div className="news-content">
                  <span className="news-category">{post.category}</span>
                  <h3 className="news-title">{post.title}</h3>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LatestBlog;
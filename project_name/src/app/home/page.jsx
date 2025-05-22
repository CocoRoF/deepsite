'use client';
import styles from './assets/starryCamping.module.scss';
import React, { useEffect, useRef } from 'react';

const TEAM = [
  { avatar: 'A', name: 'Alex Morgan', role: 'Astronomer' },
  { avatar: 'S', name: 'Sarah Chen', role: 'Designer' },
  { avatar: 'J', name: 'Jamal Wright', role: 'Developer' },
  { avatar: 'M', name: 'Maria Garcia', role: 'Storyteller' },
];

export default function StarryNight() {
  const starBgRef = useRef(null);

  useEffect(() => {
    // 별 랜덤 추가
    const container = starBgRef.current;
    if (container) {
      // 중복 추가 방지
      if (container.querySelectorAll('.star').length === 0) {
        for (let i = 0; i < 1000; i++) {
          const star = document.createElement('div');
          star.className = styles.star;
          // 별 크기/위치
          const size = Math.random() * 2.5 + 0.5;
          star.style.width = `${size}px`;
          star.style.height = `${size}px`;
          star.style.top = `${Math.random() * 200}%`;
          star.style.left = `${Math.random() * 100}%`;
          // 더 밝은 상단 연출
          if (parseFloat(star.style.top) < 20) {
            star.style.filter = 'drop-shadow(0 0 8px #fff) brightness(1.5)';
            star.style.opacity = `${Math.random() * 0.5 + 0.6}`;
          } else {
            star.style.opacity = `${Math.random() * 0.6 + 0.2}`;
          }
          // twinkle 애니메이션
          const duration = Math.random() * 4 + 2;
          star.style.animation = `${styles.twinkle} ${duration}s infinite alternate`;
          star.style.animationDelay = `${Math.random() * 6}s`;
          container.appendChild(star);
        }
      }
    }

    // Parallax + Fade-in
    const handleScroll = () => {
      const y = window.scrollY;
      const starsLayer = document.querySelector(`.${styles.stars}`);
      if (starsLayer) starsLayer.style.transform = `translateY(${-y * 0.18}px)`;

      document.querySelectorAll(`.${styles.bioContainer}`).forEach(container => {
        const rect = container.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          container.classList.add(styles.visible);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.starryNightRoot}>
      {/* 배경과 별, 달, 은하수 */}
      <div className={styles.starryBackground} ref={starBgRef}>
        <div className={styles.stars} />
        <div className={styles.milkyWay} />
        {/* 달 (상단 20vh) */}
        <div className={styles.moon}>
          <div className={styles.moonGlow} />
          <div className={styles.moonBody} />
        </div>
        {/* 별똥별 */}
        <div className={styles.shootingStar} style={{ top: '10%', left: '25%', animationDelay: '1.5s' }} />
        <div className={styles.shootingStar} style={{ top: '30%', left: '70%', animationDelay: '4s' }} />
        <div className={styles.shootingStar} style={{ top: '55%', left: '40%', animationDelay: '7.2s' }} />
      </div>

      {/* Hero Section */}
      <section className={styles.section}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Under the Infinite Stars</h1>
          <p className={styles.heroSubtitle}>Scroll down to discover the team behind this celestial experience</p>
        </div>
        <div className={styles.scrollIndicator}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      {/* Bio Section */}
      <section className={styles.section}>
        <div className={styles.bioContainer}>
          <h2 className={styles.bioTitle}>Meet Our Team</h2>
          <p className={styles.bioText}>
            We are a group of passionate stargazers and digital creators who believe in the magic of the night sky.
            Our mission is to bring the wonder of the cosmos to everyone, anywhere, through immersive digital experiences.
          </p>
          <p className={styles.bioText}>
            Each member of our team brings unique skills and perspectives, united by our shared love for astronomy
            and the stories written in the stars.
          </p>
          <div className={styles.teamMembers}>
            {TEAM.map(({ avatar, name, role }) => (
              <div key={name} className={styles.teamMember}>
                <div className={styles.memberAvatar}>{avatar}</div>
                <h3 className={styles.memberName}>{name}</h3>
                <p className={styles.memberRole}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.section}>
        <div className={styles.bioContainer}>
          <h2 className={styles.bioTitle}>Our Mission</h2>
          <p className={styles.bioText}>
            To inspire wonder and curiosity about the universe through beautiful digital experiences that make astronomy accessible to everyone.
          </p>
          <div className="mt-8 p-6 bg-purple-900 bg-opacity-30 rounded-xl backdrop-blur-md border border-purple-700">
            <h3 className="text-xl font-light mb-4">Join Our Journey</h3>
            <p className="mb-4">Subscribe to our newsletter for cosmic updates</p>
            <div className="flex justify-center">
              <input type="email" placeholder="Your email"
                className="px-4 py-2 rounded-l-lg bg-gray-800 bg-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-r-lg transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

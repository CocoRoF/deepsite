'use client';

import { useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from './assets/starryCamping.module.scss';

export default function CelestialExperience() {
  const starryBgRef = useRef(null);
  const moonRef = useRef(null);
  const starsArr = useRef([]);

  /* ---------- DOM 세팅 & 이펙트 ---------- */
  useEffect(() => {
    const starryBg = starryBgRef.current;
    const moon     = moonRef.current;

    /* 1) 정적 별(500개) 생성 ----------------------------------------------- */
    if (starsArr.current.length === 0) {
      const temp = [];
      for (let i = 0; i < 250; i++) {
        const star       = document.createElement('div');
        const size       = Math.random() * 6 + 1;           // 1 – 3 px
        const bright = Math.random() > 0.7;
        star.className = `${styles.star}${bright ? ' ' + styles.bright : ''}`;
        if (bright) star.dataset.bright = '1';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        const { width: W, height: H } = starryBg.getBoundingClientRect();
        const x = Math.random() * W;
        const y = Math.random() * H;
        star.style.top  = `${y}px`;
        star.style.left = `${x}px`;
        // 거리 계산용으로 저장
        star.dataset.cx = x;
        star.dataset.cy = y;
        starryBg.appendChild(star);
        temp.push(star);
      }
      starsArr.current = temp;
    }

    /* 2) 유성 생성 함수 ---------------------------------------------------- */
    const createShootingStar = () => {
      const el = document.createElement('div');
      el.className = styles.shootingStar;
      el.style.top = `${Math.random() * 90}%`;
      el.style.left = `${Math.random() * 100}%`;
      const duration = Math.random() * 4 + 2;               // 2 – 6 s
      el.style.setProperty('--duration', `${duration}s`);
      starryBg.appendChild(el);
      setTimeout(() => el.remove(), duration * 1000);
    };
    const shootingTimer = setInterval(createShootingStar, 1500);

    /* 3) 커서 & 별 반응 이펙트 -------------------------------------------- */
    const handleMouseMove = (e) => {
      const { clientX: mx, clientY: my } = e;
      starsArr.current.forEach((star) => {
        const sx = +star.dataset.cx;
        const sy = +star.dataset.cy;
        const dist = Math.hypot(mx - sx, my - sy);

        const isBright = star.classList.contains(styles.bright);

        if (dist < 300) {
          const p = 1 - dist / 300;
          star.style.opacity   = p;
          star.style.transform = `scale(${1 + p * 2})`;
          if (isBright) {
            star.style.boxShadow = `0 0 ${10 + p * 10}px ${2 + p * 3}px rgba(255,255,255,1)`;
          }
        } else {
          star.style.opacity   = '';
          star.style.transform = '';
          if (isBright) {
            star.style.boxShadow = '0 0 10px 2px rgba(255,255,255,0.9)';
          } else {
            star.style.boxShadow = '';
          }
        }
      });

      /* 달 근접 반응 */
      if (moon) {
        const mRect = moon.getBoundingClientRect();
        const mdist = Math.hypot(mx - (mRect.left + mRect.width / 2),
                                 my - (mRect.top  + mRect.height / 2));
        if (mdist < 100) moon.classList.add(styles.moonActive);
        else             moon.classList.remove(styles.moonActive);
      }
    };
    let ticking = false;
    const onMouse = (e) => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
      }
    };
    window.addEventListener('mousemove', onMouse);

    /* 4) 스크롤 패럴럭스 & 섹션 애니메이션 ------------------------------- */
    const handleScroll = () => {
      const y = window.scrollY;
      const starsLayer = starryBg.querySelector(`.${styles.stars}`);
      if (starsLayer) starsLayer.style.transform = `translateY(${-y * 0.2}px)`;

      document.querySelectorAll(`.${styles.bioContainer}`).forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) el.classList.add(styles.visible);
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 호출

    return () => {
      clearInterval(shootingTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* ---------- JSX 마크업 ---------- */
  return (
    <>
      <Head>
        {/* Montserrat 폰트 로드 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* 밤하늘 배경 */}
      <div ref={starryBgRef} className={styles.starryBackground}>
        <div className={styles.colorfulNebula}></div>
        <div className={styles.stars}></div>
        <div className={styles.milkyWay}></div>
        <div ref={moonRef} className={styles.moon}></div>
      </div>

      {/* Hero Section */}
      <section className={styles.section}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Celestial&nbsp;Wonder</h1>
          <p  className={styles.heroSubtitle}>
            Experience the magic of the cosmos with our enhanced starry&nbsp;night
          </p>
        </div>
        <div className={styles.scrollIndicator}>
          <span /><span /><span />
        </div>
      </section>

      {/* Bio Section */}
      <section className={styles.section}>
        <div className={styles.bioContainer}>
          <h2 className={styles.bioTitle}>Meet&nbsp;Our&nbsp;Team</h2>
          <p className={styles.bioText}>
            We are a group of passionate stargazers and digital creators who believe
            in the magic of the night sky…
          </p>
          <p className={styles.bioText}>
            Each member of our team brings unique skills and perspectives…
          </p>

          <div className={styles.teamMembers}>
            {[
              ['A', 'Alex Morgan', 'Astronomer'],
              ['S', 'Sarah Chen', 'Designer'],
              ['J', 'Jamal Wright', 'Developer'],
              ['M', 'Maria Garcia', 'Storyteller'],
            ].map(([initial, name, role]) => (
              <div key={name} className={styles.teamMember}>
                <div className={styles.memberAvatar}>{initial}</div>
                <h3 className={styles.memberName}>{name}</h3>
                <p  className={styles.memberRole}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.section}>
        <div className={styles.bioContainer}>
          <h2 className={styles.bioTitle}>Our Mission</h2>
          <p  className={styles.bioText}>
            To inspire wonder and curiosity about the universe through beautiful
            digital experiences…
          </p>

          {/* Tailwind 예시 박스 – 프로젝트에 Tailwind 설정이 있다면 그대로 동작 */}
          <div className="mt-8 p-6 bg-purple-900/30 rounded-xl backdrop-blur-md border border-purple-700 hover:border-purple-500 transition-all duration-300">
            <h3 className="text-xl font-light mb-4">Join Our Journey</h3>
            <p  className="mb-4">Subscribe to our newsletter for cosmic updates</p>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg bg-gray-800/70 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
              />
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

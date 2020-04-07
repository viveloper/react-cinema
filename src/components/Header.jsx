import React from 'react';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className="container">
        <div className={classes.upper}>
          <h1 className={classes.logo}>chova cinema</h1>
          <ul className={`${classes.menu} ${classes.menu1}`}>
            <li>
              <a href="#">
                <span>
                  <i className="fab fa-facebook"></i>
                </span>{' '}
                좋아요
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i className="fab fa-youtube"></i>
                </span>{' '}
                구독하기
              </a>
            </li>
          </ul>
          <ul className={`${classes.menu} ${classes.menu2}`}>
            <li>
              <a href="#">멤버십</a>
            </li>
            <li>
              <a href="#">고객센터</a>
            </li>
            <li>
              <a href="#">로그인</a>
            </li>
          </ul>
        </div>
        <nav className={classes.navigation}>
          <ul className={classes.links}>
            <li>
              <a href="#">예매</a>
            </li>
            <li>
              <a href="#">영화</a>
            </li>
            <li>
              <a href="#">영화관</a>
            </li>
            <li>
              <a href="#">이벤트</a>
            </li>
            <li>
              <a href="#">스토어</a>
            </li>
            <li>
              <a href="#">VOD</a>
            </li>
          </ul>
          <ul className={`${classes.menu} ${classes.menu3}`}>
            <li>
              <a href="#">
                <span>
                  <i className="fas fa-user"></i>
                </span>{' '}
                회원가입
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i className="fas fa-bookmark"></i>
                </span>{' '}
                바로예매
              </a>
            </li>
            <li>
              <button className={classes['btn-menu']}>
                <span className={classes.icon}>
                  <i className="fas fa-bars"></i>
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

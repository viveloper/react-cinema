import users from './data/users.json';

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const loginUser = users.users.find(
        (user) => user.email === email && user.password === password
      );
      if (loginUser) {
        resolve({
          user: {
            email: loginUser.email,
            name: loginUser.name,
            reviewList: loginUser.reviewList,
            ticketingList: loginUser.ticketingList,
          },
          token: 'accessToken',
        });
      } else {
        reject('이메일, 비밀번호가 일치하지 않습니다');
      }
    }, 300);
  });
};

export const logout = (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (true) {
        resolve({
          success: true,
        });
      } else {
        reject({
          success: false,
        });
      }
    }, 300);
  });
};

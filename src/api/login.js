import users from './data/users.json';

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const loginUser = users.users.find(
        (user) => user.email === email && user.password === password
      );
      if (loginUser) {
        resolve({
          user: loginUser,
          token: 'accessToken',
        });
      } else {
        reject(new Error('Login Failed'));
      }
    }, 300);
  });
};

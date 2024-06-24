const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7219';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/HackerNews"
    ],
    target,
    secure: false
  },
  // {
  //   context: [
  //     "/getnewstories",
  //   ],
  //   target: target +"/HackerNews/api",
  //   secure: false
  // },
  // {
  //   context: [
  //     "/HackerNews/api/getnewstories",
  //   ],
  //   target: target +"/HackerNews/api/getnewstories",
  //   secure: false
  // },
]

module.exports = PROXY_CONFIG;

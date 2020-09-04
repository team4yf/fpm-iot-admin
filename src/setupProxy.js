const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/biz',
    createProxyMiddleware({
      target: 'http://open.yunplus.io:19580',
      // pathRewrite: {
      //   "^/api": "/"
      // },
      changeOrigin: true,
    })
  );
};
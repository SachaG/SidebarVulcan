/*

HTTPS redirect

*/
// see https://blog.wax-o.com/2017/11/meteor-galaxy-redirect-non-www-to-www-with-ssl-and-https/

WebApp.rawConnectHandlers.use((req, res, next) => {
  /**
   * Redirect www to non-www in production
   */
  const host = req.headers && req.headers.host;
  if (process.env.NODE_ENV !== 'development' && host && host.includes('www')) {
    res.writeHead(301, {
      Location: 'https://sidebar.io' + req.originalUrl,
    });
    return res.end();
  }

  /**
   * Keep going
   * /!\ DO NOT DELETE /!\
   */
  return next();
});

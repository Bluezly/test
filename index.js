const http = require('http');
const httpProxy = require('http-proxy');

// إنشاء بروكسي
const proxy = httpProxy.createProxyServer({});

// إنشاء خادم HTTP
const server = http.createServer((req, res) => {
  // استخدم البروكسي لتوجيه الطلبات إلى الوجهة الأصلية المطلوبة من قبل العميل
  proxy.web(req, res, { target: req.url }, (err) => {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Proxy Error');
  });
});

// استماع الخادم على منفذ 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});

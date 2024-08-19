const SocksProxyAgent = require('socks5-http-client/lib/Agent');
const http = require('http');

// إعداد البروكسي SOCKS5
const proxyAgent = new SocksProxyAgent('socks5://localhost:1080'); // تأكد من أن هذا هو عنوان البروكسي الصحيح

// إنشاء خادم HTTP
const server = http.createServer((req, res) => {
  // استخدم البروكسي لتوجيه الطلبات
  req.pipe(proxyAgent.request(req.url)).pipe(res);
});

// استماع الخادم على منفذ 10000
server.listen(10000, () => {
  console.log('Proxy server is running on port 10000');
});

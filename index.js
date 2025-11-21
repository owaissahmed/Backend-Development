const http = require("http");

const server = http.createServer((req, res) => {
  // Content type set karte hain
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Routing logic
  if (req.url === "/") {
    res.end("Welcome to Home Page!");
  } else if (req.url === "/about") {
    res.end("This is the About Page!");
  } else if (req.url === "/contact") {
    res.end("This is the Contact Page!");
  } else {
    // agar koi galat route likha ho to error message
    res.end("404 - Page Not Found!");
  }
});

server.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});

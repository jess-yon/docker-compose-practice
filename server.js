const express = require("express");
const redis = require("redis");

//! redis client 생성
const client = redis.createClient({
  host: "redis-server", //? docker-compose.yml 파일에 명시한 컨테이너 이름
  port: 6379,
});
const app = express();

// 숫자는 0 부터 시작합니다.
client.set("number", 0);

app.get("/", (req, res) => {
  client("number", (err, number) => {
    // 현재 숫자를 가져온 후에 1씩 증가 시키기
    client.set("number", parseInt(number) + 1);
    res.send("숫자가 1씩 증가합니다. 숫자" + number);
  });
});

app.listen(4000);
console.log("Server is running!");

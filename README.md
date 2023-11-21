Video viewer manager Ver2.0

- 현재 chatGPT 활용하여 웹 크롤링 프로그램 진행 중,

```
npm install cheerio
npm install axios
```

설치 되어있음.

- scrape.js 를 node에서 실행 시키면 해당 사이트에 접속하여 페이지 정보를 불러옴.
- 현재 특정 사이트 접속하여 정보를 불러오면, 스크랩하여 csv 파일로 저장하도록 진행 중.

1. 23-11-21 현재
- https://www.avdbs.com 사이트는 'cheerio' 로 크롤링 불가능,
'puppeteer' 로 작업 가능,
```
node puppeteer.js
```
# Video viewer manager Ver2.0

- 현재 chatGPT 활용하여 웹 크롤링 프로그램 진행 중.

- chatGPT의 설명 : 주로 브라우저 환경에서 동작하는 라이브러리나 프레임워크를 사용합니다. 대표적으로는 Puppeteer와 Cheerio가 있습니다.
  1. Puppeteer: Headless Chrome을 사용하여 브라우저 상에서 동작하는 라이브러리입니다. 웹 페이지를 열고 조작하며 데이터를 수집할 수 있습니다.
  2. Cheerio: 서버 사이드에서 동작하는 라이브러리로, jQuery 문법을 사용하여 HTML 문서를 파싱하고 조작할 수 있습니다. Puppeteer는 Node.js에서 실행됩니다.

```
npm install cheerio
npm install axios
npm install puppeteer

node puppeteer.js
```

- scrape.js 파일은 cheerio 크롤링

- avdbs.com 사이트는 'cheerio' 로 크롤링 불가능,  
  'puppeteer' 로 작업 가능,

- 현재 'cheerio', 'axios', 'puppeteer' 설치 되어있음.  
  사용은 puppeteer 로 크롤링 중

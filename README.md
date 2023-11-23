# Video viewer manager Ver2.0

1. 현재 chatGPT 활용하여 웹 크롤링 프로그램 진행 중.
2. chatGPT의 설명 : 주로 브라우저 환경에서 동작하는 라이브러리나 프레임워크를 사용합니다. 대표적으로는 Puppeteer와 Cheerio가 있습니다.
   - Puppeteer: Headless Chrome을 사용하여 브라우저 상에서 동작하는 라이브러리입니다. 웹 페이지를 열고 조작하며 데이터를 수집할 수 있습니다.
   - Cheerio: 서버 사이드에서 동작하는 라이브러리로, jQuery 문법을 사용하여 HTML 문서를 파싱하고 조작할 수 있습니다. Puppeteer는 Node.js에서 실행됩니다.
3. 'cheerio', 'axios', 'puppeteer', 'puppeteer-core' 설치 되어있음.
   - 사용은 puppeteer 로 크롤링 중

```
npm install

node puppeteer.js
```

- scrape.js 파일은 cheerio 크롤링 (임시)

  - avdbs.com 사이트는 'cheerio' 로 크롤링 불가능,  
    'puppeteer' 로 작업 가능,

- actor 페이지 정보 추출에서, dvd 페이지 정보 추출로 변경,  
  현재 url, 품번, 국글, 일문, 영문 데이터 추출 가능

- 2023-11-23: _./data/av_product.csv_ 파일 추출,

  - 품번, 한글명, 일어명, 영어명, 출시일, 출연, 제작사, 레이블, 시리즈, 감독, 재생시간, AVDBS_URL
  - 1~100번까지 진행
  - 종종 url 참조를 실패하는 경우가 발생함.

- 2023-11-23: 404 not found 처리 추가함

const fs = require('fs');
const cheerio = require('cheerio');

// HTML 파일 읽기
const html = fs.readFileSync('https://naver.com', 'utf-8');

// Cheerio로 HTML 로드
const $ = cheerio.load(html);

// 특정 요소에서 데이터 추출
const headingText = $('h1').text();
const paragraphText = $('p').text();

// 결과 출력
console.log('Heading:', headingText);
console.log('Paragraph:', paragraphText);

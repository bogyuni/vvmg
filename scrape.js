const axios = require('axios');
const cheerio = require('cheerio');

async function fetchData(url) {
  const result = await axios.get(url);
  return result.data;
}

async function scrapeData() {
  const baseUrl = 'https://bogyuni.github.io/vvmg/pages/';
  const totalPages = 3; // 예시로 10페이지까지만 수집

  for (let page = 1; page <= totalPages; page++) {
    const url = `${baseUrl}${page}.html`;
    const html = await fetchData(url);
    const $ = cheerio.load(html);

    // 페이지에서 필요한 정보 추출
    const title = $('title').text();
    console.log(`Page ${page} Title: ${title}`);

    // 추가로 필요한 정보 수집 작업을 여기에 추가

    // 요청 간격 설정 (예: 1초)
    await delay(1000);
  }
}

// 지정된 밀리초 동안 대기하는 함수
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

scrapeData();

const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

async function fetchData(url) {
  const result = await axios.get(url);
  return result.data;
}

async function scrapeData() {
  const baseUrl = 'https://www.avdbs.com/menu/actor.php?actor_idx=';
  const totalPages = 1; // 예시로 10페이지까지만 수집
  const data = []; // 수집한 데이터를 저장할 배열

  for (let page = 8898; page <= totalPages; page++) {
    const url = `${baseUrl}${page}`;
    const html = await fetchData(url);
    const $ = cheerio.load(html);

    // 페이지에서 필요한 정보 추출
    const title = $('title').text();

		console.log(title);

    // 추가로 필요한 정보 수집 작업을 여기에 추가

    // 수집한 데이터를 배열에 추가
    data.push({ page, title });

    // 요청 간격 설정 (예: 1초)
    await delay(100);
  }

  // CSV 파일로 저장
  saveToCSV(data, 'output2.csv');
}

// 지정된 밀리초 동안 대기하는 함수
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// CSV 파일로 저장하는 함수
function saveToCSV(data, filename) {
  const csvContent = data.map(row => Object.values(row).join(',')).join('\n');
  fs.writeFileSync(filename, csvContent, 'utf-8');
  console.log(`Data has been saved to ${filename}`);
}

scrapeData();

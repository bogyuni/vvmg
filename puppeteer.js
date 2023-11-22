const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeData() {
	const browser = await puppeteer.launch({
    headless: 'new', // "new"로 설정
  });
	const page = await browser.newPage();

	try {
		const baseUrl = 'https://www.avdbs.com/menu/actor.php?actor_idx=';
		const urlCnt = 20;
		const pageUrls = [];
		for (let i = 1; i < urlCnt; i++) {
			pageUrls.push(baseUrl+i);
		}
		const data = [];
    const url = 'https://www.avdbs.com'; // 대상 URL로 변경
    const response = await page.goto(url);

    if (!response.ok()) {
      throw new Error(`${response.status()} ${response.statusText()} at ${url}`);
    }

		let csvData = '';
		let resultData = '';

    // 나머지 코드...
		for (const url of pageUrls) {
			let timeoutOccurred = false;
			try {
				await page.goto(url, { timeout: 1000 }); // 타임아웃을 1초로 설정
				// 원하는 HTML 클래스 선택자
				const name_en = '.inner_name_en';
				const name_ko = '.inner_name_kr';
				// 페이지 내에서 해당 선택자에 일치하는 요소가 있는지 확인
				const isElementExist = await page.$(name_en);

				if (isElementExist) {
					// 선택자에 일치하는 내용을 추출
					const elementContentName_en = await page.$eval(name_en, element => element.textContent);
					const elementContentName_ko = await page.$eval(name_ko, element => element.textContent);
					const reMsg = `Content of the selected element on ${url}:, ${elementContentName_en}`;
					console.log(reMsg);
					resultData += reMsg+'\n';
					// 데이터 배열에 추가
					data.push({
						url: url,
						nameEn: elementContentName_en,
						nameKo: elementContentName_ko,
					});
				} else {
					console.error(`No element found for name_en "${name_en}" on ${url}`);
				}
				// 데이터를 CSV 문자열로 변환
				csvData = data.map(item => `${item.url},${item.nameEn},${item.nameKo}`).join('\n');
			} catch (error) {
				if (error.message.includes('Navigation timeout')) {
					const reMsg = `Timeout error occurred for URL: ${page.url()}`;
					console.error(reMsg);
					resultData += reMsg+'\n';
					timeoutOccurred = true;
				} else {
					console.error(error.message);
				}
			}

			if (timeoutOccurred) {
        // 타임아웃이 발생하면 현재 URL을 건너뛰고 다음 URL로 진행
        continue;
      }
		}

		// CSV 파일로 저장
		fs.writeFileSync('output.csv', 'url,name_en,name_ko\n' + csvData, 'utf-8');
		fs.writeFileSync('resultLog.csv', 'url,data\n' + resultData, 'utf-8');
  } finally {
    await browser.close();
  }
}

scrapeData();

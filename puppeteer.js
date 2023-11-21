const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeData() {
	const browser = await puppeteer.launch({
    headless: 'new', // "new"로 설정
  });
	const page = await browser.newPage();

	try {
		const baseUrl = 'https://www.avdbs.com/menu/actor.php?actor_idx=';
		const urlCnt = 10;
		const pageUrls = [
			baseUrl+'9000',
			baseUrl+'1',
			baseUrl+'2',
		];
		const data = [];
	
    const url = 'https://www.avdbs.com'; // 대상 URL로 변경

    const response = await page.goto(url);

    if (!response.ok()) {
      throw new Error(`${response.status()} ${response.statusText()} at ${url}`);
    }

		let csvData = '';

    // 나머지 코드...
		for (const url of pageUrls) {
			await page.goto(url, { timeout: 1000 }); // 타임아웃을 0.1초로 설정
	
			// 원하는 HTML 클래스 선택자
			const name_en = '.inner_name_en';
			const name_ko = '.inner_name_kr';
			
	
			// 페이지 내에서 해당 선택자에 일치하는 요소가 있는지 확인
			const isElementExist = await page.$(name_en);
	
			if (isElementExist) {
				// 선택자에 일치하는 내용을 추출
				const elementContentName_en = await page.$eval(name_en, element => element.textContent);
				const elementContentName_ko = await page.$eval(name_ko, element => element.textContent);
				console.log(`Content of the selected element on ${url}:`, elementContentName_en);
				console.log(`Content of the selected element on ${url}:`, elementContentName_ko);

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
			// console.log('\n Data has been saved');
		}

		// CSV 파일로 저장
		fs.writeFileSync('output.csv', 'url,name_en,name_ko\n' + csvData, 'utf-8');


	} catch (error) {
		if (error.message.includes('Navigation timeout')) {
      console.error(`Timeout error occurred for URL: ${page.url()}`);
      // 타임아웃이 발생하면 이 URL을 무시하고 계속 진행
			continue;
    } else {
      console.error(error.message);
    }
  } finally {
    await browser.close();
  }
}

scrapeData();

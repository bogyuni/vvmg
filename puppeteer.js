const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeData() {
	const browser = await puppeteer.launch({
		headless: 'new', // "new"로 설정
	});
	const page = await browser.newPage();
	// const baseUrl = 'https://www.avdbs.com/menu/actor.php?actor_idx=';
	const baseUrl = 'https://www.avdbs.com/menu/dvd.php?dvd_idx=';
	const url = 'https://www.avdbs.com'; // 대상 URL로 변경
	const urlMin = 1;
	const urlMax = 100;
	const pageUrls = [];
	for (let i = urlMin; i <= urlMax; i++) {
		pageUrls.push(baseUrl+i);
	}
	const data = [];
	let csvData = '';
	let resultData = '';

	try {
		const response = await page.goto(url);
		if (!response.ok()) {
			throw new Error(`${response.status()} ${response.statusText()} at ${url}`);
		}

		for (const url of pageUrls) {
			let timeoutOccurred = false;
			try {
				await page.goto(url, { timeout: 500 }); // 타임아웃을 1초로 설정
				// 원하는 HTML 클래스 선택자
				const selectedData = '.title';
				const profileDetail = '.profile_detail';
				// 페이지 내에서 해당 선택자에 일치하는 요소가 있는지 확인
				const isElementExist = await page.$(selectedData);

				if (isElementExist) {
					// 선택자에 일치하는 내용을 추출
					const customData = await page.$eval(selectedData, element => element.textContent);
					const customProfile = await page.$eval(profileDetail, element => element.textContent);

					// console.log(customProfile);


					const description = customData.replace(/\s/g, '').replace(/\//g, ',');
					const profile = customProfile
													.replace(/\n/g, ',')
													.replace(/\s/g, '')
													.replace(':,', ':')
													.replace(',출시:', '')
													.replace('출연:', '')
													.replace('제작사:', '')
													.replace('레이블:', '')
													.replace('시리즈:', '')
													.replace('감독:', '')
													.replace('재생시간:', '');
					// const profile = customProfile;

					const reMsg = `Content of the selected element on ${url}:, ${description}`;
					// console.log(reMsg);
					resultData += reMsg+'\n';
					// 데이터 배열에 추가
					data.push({
						url: url,
						desc: description,
						prof: profile,
					});
				} else {
					const reMsg = `No element found for selectedData "${selectedData}" on ${url}`;
					// console.error(reMsg);
					resultData += reMsg+'\n';
				}
				// 데이터를 CSV 문자열로 변환
				csvData = data.map(item => `${item.url.split(baseUrl)[1]},${item.desc},${item.prof}`).join('\n');
			} catch (error) {
				if (error.message.includes('Navigation timeout')) {
					const reMsg = `Timeout error occurred for URL: ${page.url()}`;
					// console.error(reMsg);
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
		// fs.writeFileSync('./data/av_prduct.csv', 'url_id, 품번, 한글명, 일어명, 영어명, profile\n' + csvData, 'utf-8');
		fs.writeFileSync('./data/av_prduct.csv', 'url_id, 품번, 한글명, 일어명, 영어명, 출시일, 출연, 제작사, 레이블, 시리즈, 감독, 재생시간\n' + csvData, 'utf-8');
		fs.writeFileSync('resultLog.csv', 'url,data\n' + resultData, 'utf-8');
	} finally {
		await browser.close();
	}
}

scrapeData();

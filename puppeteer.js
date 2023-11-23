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
	const urlMax = 10;
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
				// await page.goto(url, { timeout: 200 }); // 타임아웃을 1초로 설정
				await page.goto(url);

				const pageTitle = await page.$eval('title', element => element.textContent);
				const check404 = pageTitle.indexOf('404') > -1 ? true : false

				if (!check404) {
					// 원하는 HTML 클래스 선택자
					const selectedData = '.title';
					const profileDetail = '.profile_detail';
					// 페이지 내에서 해당 선택자에 일치하는 요소가 있는지 확인
					const isElementExist = await page.$(selectedData);
	
					if (isElementExist) {
						// 선택자에 일치하는 내용을 추출
						const customData = await page.$eval(selectedData, element => element.textContent);
						const customProfile = await page.$eval(profileDetail, element => element.textContent);
						const description = customData.replace(/\s/g, '').replace(/\//g, ',');
						const profile = customProfile
														.replace(/\n/g, ',')
														.replace(/\s/g, '')
														.replace(':,', ':')
														.replace('출시:', '')
														.replace('출연:', '')
														.replace('제작사:', '')
														.replace('레이블:', '')
														.replace('시리즈:', '')
														.replace('감독:', '')
														.replace('재생시간:', '');
	
						// const reMsg = `Content of the selected element on ${url}:, ${description}`;
						const reMsg = `${url}, ${description}`;
						console.log(reMsg);
						resultData += reMsg+'\n';
						// 데이터 배열에 추가
						data.push({
							url: url,
							desc: description,
							prof: profile,
						});
					} else {
						// const reMsg = `No element found for selectedData "${selectedData}" on ${url}`;
						const reMsg = `${url}, No element found`;
						console.error(reMsg);
						resultData += reMsg+'\n';
					}
					// 데이터를 CSV 문자열로 변환
					csvData = data.map(item => `${item.url},${item.desc}${item.prof}`).join('\n');
				} else {
					const reMsg = `${url}, 404 Not found`;
					console.error(reMsg);
					resultData += reMsg+'\n';
				}
			} catch (error) {
				if (error.message.includes('Navigation timeout')) {
					const reMsg = `${page.url()}, Timeout error`;
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
		fs.writeFileSync('./data/av_prduct.csv', 'AVDBS_URL, 품번, 한글명, 일어명, 영어명, 출시일, 출연, 제작사, 레이블, 시리즈, 감독, 재생시간\n' + csvData, 'utf-8');
		fs.writeFileSync('resultLog.csv', 'url,data\n' + resultData, 'utf-8');
	} finally {
		await browser.close();
	}
}

scrapeData();

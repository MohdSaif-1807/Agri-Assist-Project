import * as cheerio from 'cheerio';
async function performScraping(stateInfo) {
  let data = [];
  const url = `https://vegetablemarketprice.com/market/${stateInfo}/today`;
  const response = await fetch(url);
  const body = await response.text()
  const $ = cheerio.load(body);
  console.log("vegetable names");
  $('tr').each((_, e) => {
    let _1 = $(e).find('td:nth-child(2)').text().replace(/(\s+)/g, ' ');
    let _2 = $(e).find('td:nth-child(3)').text().replace(/(\s+)/g, ' ');
    let _3 = $(e).find('td:nth-child(4)').text().replace(/(\s+)/g, ' ');
    let _4 = $(e).find('td:nth-child(5)').text().replace(/(\s+)/g, ' ');
    let _5 = $(e).find('td:nth-child(6)').text().replace(/(\s+)/g, ' ');
    data.push({
      vegetable_names: _1,
      wholesale_price: _2,
      retail_price: _3,
      shoppingmall_price: _4,
      units: _5
    });
  });
  return data;
}
export async function main(stateInfo) {
  let data = await performScraping(stateInfo);
  return data;
}

const xml2js = require("xml2js");
const https = require("https");

// Configuration
const sitemapUrl = "https://www.borachurrasco.app/sitemap.xml";
const host = "https://www.borachurrasco.app";
const key = "07253e5f97f448ee8a9e110c68a08db9";
const keyLocation =
  "https://www.borachurrasco.app/07253e5f97f448ee8a9e110c68a08db9.txt";

const modifiedSinceDate = new Date(process.argv[2] || "1970-01-01");

if (isNaN(modifiedSinceDate.getTime())) {
  console.error("Invalid date provided. Please use format YYYY-MM-DD");
  process.exit(1);
}

function fetchSitemap(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

function parseSitemap(xmlData) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function filterUrlsByDate(sitemap, date) {
  const urls = sitemap.urlset.url;
  return urls
    .filter((url) => new Date(url.lastmod[0]) > date)
    .map((url) => url.loc[0]);
}

async function main() {
  try {
    const xmlData = await fetchSitemap(sitemapUrl);
    const sitemap = await parseSitemap(xmlData);
    const filteredUrls = filterUrlsByDate(sitemap, modifiedSinceDate);
    console.log(filteredUrls);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();

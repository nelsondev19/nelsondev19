const fs = require("fs").promises;
const axios = require("axios").default;

const LATEST_IMAGES_ARTICLES1 = "%{{latest_images_articles1}}%";
const LATEST_IMAGES_ARTICLES2 = "%{{latest_images_articles2}}%";
const LATEST_IMAGES_ARTICLES3 = "%{{latest_images_articles3}}%";

(async () => {
  const markdownTemplate = await fs.readFile("README.md.tpl", {
    encoding: "utf-8",
  });

  const response = await axios.get(
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40nelsonher019"
  );
  const posts = response.data.items;

  const imagesPost1 = `<a href="${posts[0].link}" target='_blank'>
    <img width='30%' src=${posts[0].thumbnail} alt="${posts[0].title}" />
  </a>`;
  const imagesPost2 = `<a href="${posts[1].link}" target='_blank'>
    <img width='30%' src="${posts[1].thumbnail}" alt="${posts[1].title}" />
  </a>`;
  const imagesPost3 = `<a href="${posts[2].link}" target='_blank'>
    <img width='30%' src="${posts[2].thumbnail}" alt="${posts[2].title}" />
  </a>`;

  const newMarkdown = markdownTemplate
    .replace(LATEST_IMAGES_ARTICLES1, imagesPost1)
    .replace(LATEST_IMAGES_ARTICLES2, imagesPost2)
    .replace(LATEST_IMAGES_ARTICLES3, imagesPost3);

  await fs.writeFile("./README.md", newMarkdown);
})();

const fs = require("fs").promises;
const axios = require("axios").default;

const LATEST_IMAGES_MEDIUM1 = "%{{latest_images_medium1}}%";
const LATEST_IMAGES_MEDIUM2 = "%{{latest_images_medium2}}%";
const LATEST_IMAGES_MEDIUM3 = "%{{latest_images_medium3}}%";

const LATEST_IMAGES_DEVTO1 = "%{{latest_images_devto1}}%";
const LATEST_IMAGES_DEVTO2 = "%{{latest_images_devto2}}%";

(async () => {
  const markdownTemplate = await fs.readFile("./README.md.tpl", {
    encoding: "utf-8",
  });

  const responseMedium = await axios.get(
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40nelsonher019"
  );
  const posts = responseMedium.data.items;

  const responseDevTo = await axios.get(
    "https://dev.to/api/articles?username=nelsonher019"
  );
  postDevTo = responseDevTo.data;

  //MEDIUM
  const mediumPost1 = `<a href="${posts[0].link}" target='_blank'>
    <img width='30%' src=${posts[0].thumbnail} alt="${posts[0].title}" />
  </a>`;
  const mediumPost2 = `<a href="${posts[1].link}" target='_blank'>
    <img width='30%' src="${posts[1].thumbnail}" alt="${posts[1].title}" />
  </a>`;
  const mediumPost3 = `<a href="${posts[2].link}" target='_blank'>
    <img width='30%' src="${posts[2].thumbnail}" alt="${posts[2].title}" />
  </a>`;

  //DEV.TO

  const devtoPost1 = `<a href="${postDevTo[0].url}" target='_blank'>
    <img width='30%' src=${postDevTo[0].cover_image} alt="${postDevTo[0].title}" />
  </a>`;
  const devtoPost2 = `<a href="${postDevTo[1].url}" target='_blank'>
    <img width='30%' src="${postDevTo[1].cover_image}" alt="${postDevTo[1].title}" />
  </a>`;

  const newMarkdown = markdownTemplate
    //medium
    .replace(LATEST_IMAGES_MEDIUM1, mediumPost1)
    .replace(LATEST_IMAGES_MEDIUM2, mediumPost2)
    .replace(LATEST_IMAGES_MEDIUM3, mediumPost3)
    //devto
    .replace(LATEST_IMAGES_DEVTO1, devtoPost1)
    .replace(LATEST_IMAGES_DEVTO2, devtoPost2);

  await fs.writeFile("./README.md", newMarkdown);
})();

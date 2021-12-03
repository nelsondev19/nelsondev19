import { promises as fs } from "fs";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LATEST_IMAGES_MEDIUM1 = "%{{latest_images_medium1}}%";
const LATEST_IMAGES_MEDIUM2 = "%{{latest_images_medium2}}%";
const LATEST_IMAGES_MEDIUM3 = "%{{latest_images_medium3}}%";

const LATEST_IMAGES_YOUTUBE1 = "%{{latest_images_youtube1}}%";
const LATEST_IMAGES_YOUTUBE2 = "%{{latest_images_youtube2}}%";
const LATEST_IMAGES_YOUTUBE3 = "%{{latest_images_youtube3}}%";

async function handler() {
  try {
    console.log("la variable es ",process.env.CHANNELID )
    const markdownTemplate = await fs.readFile("./README.md.tpl", {
      encoding: "utf-8",
    });
    const responseMedium = await axios.get(
      "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40nelsoncode"
    );
    const posts = responseMedium.data.items;

    const responseYoutube = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.CHANNELID}&maxResults=10&order=date&type=video&key=${process.env.API_KEY}`
    );

    const youtubeItems = responseYoutube.data.items;

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

    // YOUTUBE
    const youtubePost1 = `<a href="https://www.youtube.com/watch?v=${youtubeItems[0].id.videoId}" target='_blank'>
 <img width='30%' src="${youtubeItems[0].snippet.thumbnails.high.url}" alt="${youtubeItems[0].snippet.title}" />
</a>`;
    const youtubePost2 = `<a href="https://www.youtube.com/watch?v=${youtubeItems[1].id.videoId}" target='_blank'>
 <img width='30%' src="${youtubeItems[1].snippet.thumbnails.high.url}" alt="${youtubeItems[1].snippet.title}" />
</a>`;
    const youtubePost3 = `<a href="https://www.youtube.com/watch?v=${youtubeItems[2].id.videoId}" target='_blank'>
 <img width='30%' src="${youtubeItems[2].snippet.thumbnails.high.url}" alt="${youtubeItems[2].snippet.title}" />
</a>`;

    const newMarkdown = markdownTemplate
      // MEDIUM
      .replace(LATEST_IMAGES_MEDIUM1, mediumPost1)
      .replace(LATEST_IMAGES_MEDIUM2, mediumPost2)
      .replace(LATEST_IMAGES_MEDIUM3, mediumPost3)
      // YOUTUBE
      .replace(LATEST_IMAGES_YOUTUBE1, youtubePost1)
      .replace(LATEST_IMAGES_YOUTUBE2, youtubePost2)
      .replace(LATEST_IMAGES_YOUTUBE3, youtubePost3);

    await fs.writeFile("./README.md", newMarkdown);
  } catch (error) {
    console.log("Ocurrió un error " + error);
  }
}

handler();

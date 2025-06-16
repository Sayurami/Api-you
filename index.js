const axios = require('axios');
const cheerio = require('cheerio');

async function getJilhubVideoInfo(url) {
    try {
        // Fetch the HTML content
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // Extract video information
        const title = $('.headline h1').text().trim();
        const duration = $('.fp-time-duration').text().trim();

        // Find the script containing video data
        const scriptContent = $('script:contains("video_url")').html();
        if (!scriptContent) {
            throw new Error('Video data not found in the page');
        }

        // Extract the video object
        const videoObjMatch = scriptContent.match(/var\s+(\w+)\s*=\s*\{([^}]+)\}/);
        if (!videoObjMatch) {
            throw new Error('Could not parse video data');
        }

        // Convert the video object to JSON
        const videoObjStr = `{${videoObjMatch[2]}}`;
        const videoObj = eval(`(${videoObjStr})`);

        // Construct the direct video URL
        let videoUrl = videoObj.video_url;
        if (videoUrl.startsWith('function/0/')) {
            videoUrl = videoUrl.replace('function/0/', '');
        }

        // Prepare the result
        const result = {
            title,
            duration,
            videoUrl,
            thumbnail: videoObj.preview_url,
            embedUrl: `https://jilhub.org/embed/${videoObj.video_id}`,
            videoId: videoObj.video_id,
            licenseCode: videoObj.license_code
        };

        return result;
    } catch (error) {
        console.error('Error fetching video info:', error);
        throw error;
    }
}

// Example usage
/*
getJilhubVideoInfo('https://jilhub.org/videos/1673/cute-girl-suck-in-film-hall/')
    .then(info => console.log(info))
    .catch(err => console.error(err));
*/

module.exports = { getJilhubVideoInfo };

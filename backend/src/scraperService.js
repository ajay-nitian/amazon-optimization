const axios = require("axios");
const cheerio = require("cheerio");

// ScraperAPI Key
const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY;

// ✅ Mock fallback data for demo/testing
const MOCK_PRODUCT = {
  asin: "MOCK123456",
  original_title: "Mock Product - Demo Listing for Testing",
  original_bullets: [
    "High-quality material with durable performance",
    "Perfect for daily use and compatible with various products",
    "Lightweight, portable, and easy to handle",
    "Stylish design suitable for both men and women",
    "Affordable, reliable, and great value for money",
  ],
  original_description:
    "This is a mock product used for fallback testing. It demonstrates how the Amazon Listing Optimizer works when live data is unavailable. You can safely test AI optimization without relying on live Amazon scraping.",
};

async function fetchProductDetails(asin) {
  console.log(`[Scraper Service] Fetching details for ASIN: ${asin}`);

  const url = `https://api.scraperapi.com?api_key=${SCRAPER_API_KEY}&url=https://www.amazon.in/dp/${asin}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $("#productTitle").text().trim();
    const bullets = [];
    $("#feature-bullets ul li").each((_, el) => {
      const bullet = $(el).text().trim();
      if (bullet) bullets.push(bullet);
    });
    const description = $("#productDescription p").text().trim();

    if (!title || bullets.length === 0) {
      console.warn(`[Scraper Warning] Missing product details for ${asin}. Returning mock data.`);
      return { ...MOCK_PRODUCT, asin };
    }

    return {
      asin,
      original_title: title,
      original_bullets: bullets,
      original_description: description || "No description available.",
    };
  } catch (error) {
    console.error(`[Scraper ❌ Error] ${error.message}`);
    console.log(`[Scraper Fallback] Using mock product data for ASIN: ${asin}`);
    return { ...MOCK_PRODUCT, asin };
  }
}

module.exports = { fetchProductDetails };

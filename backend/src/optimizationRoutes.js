const express = require("express");
const router = express.Router();
const Optimization = require("./models/Optimization");
const { fetchProductDetails } = require("./scraperService");
const { optimizeListing } = require("./aiService");

// POST /api/optimize
router.post("/optimize", async (req, res) => {
  const { asin } = req.body;
  if (!asin) return res.status(400).json({ error: "ASIN is required" });

  try {
    // 🟠 Step 1: Fetch product details from Amazon
    const originalData = await fetchProductDetails(asin);
    if (!originalData) {
      return res
        .status(404)
        .json({ error: "Product not found or scraping failed" });
    }

    // 🧠 Step 2: Optimize via OpenAI
    const optimizedData = await optimizeListing(originalData);
    if (!optimizedData) {
      return res.status(500).json({ error: "AI optimization failed" });
    }

    // 💾 Step 3: Save result in DB
    const newOptimization = await Optimization.create({
      asin: originalData.asin,
      original_title: originalData.original_title,
      original_bullets: JSON.stringify(originalData.original_bullets),
      original_description: originalData.original_description,
      optimized_title: optimizedData.optimized_title,
      optimized_bullets: JSON.stringify(optimizedData.optimized_bullets),
      optimized_description: optimizedData.optimized_description,
      optimized_keywords: optimizedData.optimized_keywords,
    });

    console.log("✅ Optimization saved successfully for ASIN:", asin);

    // ✅ Step 4: Return full combined response
    res.json({
      success: true,
      asin,
      saved: {
        asin: newOptimization.asin,
        original_title: originalData.original_title,
        original_description: originalData.original_description,
        original_bullets: originalData.original_bullets,
      },
      optimized: optimizedData,
    });
  } catch (err) {
    console.error("❌ Optimization failed:", err);
    res.status(500).json({
      success: false,
      error: "Optimization failed",
      message: err.message,
    });
  }
});

// GET /api/history/:asin
router.get("/history/:asin", async (req, res) => {
  try {
    const asin = req.params.asin.toUpperCase();
    const history = await Optimization.findAll({
      where: { asin },
      order: [["createdAt", "DESC"]],
    });

    const parsedHistory = history.map((item) => ({
      ...item.toJSON(),
      original_bullets: JSON.parse(item.original_bullets || "[]"),
      optimized_bullets: JSON.parse(item.optimized_bullets || "[]"),
    }));

    res.json({ success: true, history: parsedHistory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

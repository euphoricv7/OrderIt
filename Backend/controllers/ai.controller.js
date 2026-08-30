const aiService = require("../services/ai.service");
const FoodItem = require("../models/foodItem");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Generate AI data only
exports.generateFoodAI = catchAsyncErrors(async (req, res) => {
  const { name, category, spiceLevel, price } = req.body;

  if (!name || !category || !spiceLevel || !price) {
    return res.status(400).json({
      success: false,
      message: "name, category, spiceLevel and price are required",
    });
  }

  const aiData = await aiService.generateDishDescription({
    name,
    category,
    spiceLevel,
    price,
  });

  res.status(200).json({
    success: true,
    data: aiData,
  });
});

// Generate AI data and save into existing food item
exports.generateAndSaveFoodAI = catchAsyncErrors(async (req, res) => {
  const { foodId } = req.params;

  const food = await FoodItem.findById(foodId);

  if (!food) {
    return res.status(404).json({
      success: false,
      message: "Food item not found",
    });
  }

  const aiData = await aiService.generateDishDescription({
    name: food.name,
    category: food.category || "Veg",
    spiceLevel: food.spiceLevel || "Medium",
    price: food.price,
  });

  food.aiDescription = aiData.description;
  food.aiTags = aiData.tags;
  food.aiAllergens = aiData.allergens;
  food.aiServes = aiData.serves;
  food.aiBestFor = aiData.bestFor;

  await food.save();

  res.status(200).json({
    success: true,
    message: "AI metadata generated and saved",
    data: aiData,
  });
});
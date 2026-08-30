const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true,
      },
    },
  ],

  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },

  paidAt: {
    type: Date,
  },

  taxPrice: {
    type: Number,
    default: 0.0,
  },

  deliveryCharge: {
    type: Number,
    default: 0.0,
  },

  finalTotal: {
    type: Number,
    required: true,
    default: 0.0,
  },

  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },

  deliveredAt: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// STOCK MANAGEMENT 
orderSchema.pre("save", async function (next) {
  try {
    for (const orderItem of this.orderItems) {
      const foodItem = await mongoose
        .model("FoodItem")
        .findById(orderItem.foodItem);

      if (!foodItem) {
        throw new Error("Food item not found");
      }

      if (foodItem.stock < orderItem.quantity) {
        throw new Error(
          `Insufficient stock for ${orderItem.name}`
        );
      }

      // reduce stock
      foodItem.stock -= orderItem.quantity;
      await foodItem.save();
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Order", orderSchema);
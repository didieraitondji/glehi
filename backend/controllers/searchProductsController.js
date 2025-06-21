const Product = require("../models/Product");

exports.searchProducts = async (req, res) => {
  try {
    const {
      title,
      categoryId,
      minPrice,
      maxPrice,
      available,
      lat,
      lng,
      radiusKm,
    } = req.query;

    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (categoryId) {
      filter.categoryId = categoryId;
    }

    if (available !== undefined) {
      filter.available = available === "true";
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Recherche géospatiale si lat, lng et radiusKm sont fournis
    if (lat && lng && radiusKm) {
      filter.location = {
        $geoWithin: {
          $centerSphere: [
            [Number(lng), Number(lat)], // Note : [lng, lat]
            Number(radiusKm) / 6378.1, // Rayon en radians (terre ~6378 km)
          ],
        },
      };
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

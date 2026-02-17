import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // This will find all products
    res.json({ products });
  } catch (error) {
    console.log("Error in getAllProducts controller: ", error.message);
    res.status(500).json({ message: "Server error in getAllProducts", error: error.message });
  }
};

// -----Error Here------
export const getFeaturedProducts = async (req, res) => {
	try {
		let featuredProducts = await redis.get("featured_products");
		if (featuredProducts) {
			return res.json({ products: JSON.parse(featuredProducts) });
		}

		// if not in redis, fetch from mongodb
		// .lean() is gonna return a plain javascript object instead of a mongodb document
		// which is good for performance
		featuredProducts = await Product.find({ isFeatured: true }).lean();

		if (!featuredProducts) {
			return res.status(404).json({ message: "No featured products found" });
		}

		// store in redis for future quick access

		await redis.set("featured_products", JSON.stringify(featuredProducts));

		res.json({ products: featuredProducts });
	} catch (error) {
		console.log("Error in getFeaturedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url || "",
      category,
    });
    // Success
    res.status(201).json({ product });
  } catch (error) {
    console.log("Error in createProduct controller: ", error.message);
    res.status(500).json({ message: "Server error in createProduct", error: error.message });
  }
};

// Deltes product from DB and also deletes image from cloudinary
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // We will find it by id without deleting it, so we can delete image first
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0]; // Gets the url of image to delete it
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Deleted image from cloudinary");
      } catch (error) {
        console.log("error deleting image from cloudinary", error.message);
      }
    }

    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
      
  } catch (error) {
    console.log("Error in deleteProduct controller: ", error.message);
    res.status(500).json({ message: "Server error in deleteProduct", error: error.message });
  }
};

export const getRecommendedProducts = async (req, res) => {

  try {
    const products = await Product.aggregate([{ 
        $sample: { size: 3 } 
    },
    {
        $project: {
            _id:1,
            name:1,
            description:1,
            image:1,
            price:1
        },
    },
]);
    res.json({ products });
  } catch (error) {
    console.log("Error in getRecommendedProducts controller: ", error.message);
    res.status(500).json({ message: "Server error in getRecommendedProducts", error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json({ products });
  } catch (error) {
    console.log("Error in getProductsByCategory controller: ", error.message);
    res.status(500).json({ message: "Server error in getProductsByCategory", error: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();
      res.json(updatedProduct);
    }
    else {
        res.status(404).json({message: "Product not found"})
    }
  }
   catch (error) {
    console.log("Error in toggleFeaturedProduct controller: ", error.message);
    res.status(500).json({ message: "Server error in toggleFeaturedProduct", error: error.message });
  }
};


async function updateFeaturedProductsCache() {
    try {
        // The lean method is used to return JS objects instead of full Mongoose documents to imrpove performance
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("error in updateFeaturedProductsCache", error);
    }
}

const Slide = require("../models/slideModel");
const Product = require("../models/productModel");

exports.home = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const newest = 4;
  const eachPage = 8;

  try {
    // Fetch slides
    const slides = await Slide.getAll();

    // Fetch newest products (separate from paginated products)
    const newestProducts = await Product.getNewest(newest); // Get 4 newest products

    // Fetch total product count for pagination
    const count = await Product.getCount(); 

    // Fetch paginated products
    const products = await Product.getPaginated(page, eachPage); // Paginated products

    // Calculate total pages for pagination
    const totalPages = Math.ceil(count / eachPage);

    // Separate lists of products as needed
    res.render("index", {
      title: "Home",
      slides,
      newestProducts,
      products,
      currentPage: page,
      totalPages
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Server Error");
  }
};

exports.about = (req, res) => {
  res.render("index", { content: "partials/about" });
};

exports.contact = (req, res) => {
  res.render("index", { content: "partials/contact" });
};

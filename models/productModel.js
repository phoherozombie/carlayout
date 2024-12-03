const db = require("../database/database");

class Product {
  // General query handler
  static async query(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get all products
  static async getAll() {
    const query = "SELECT * FROM products";
    return this.query(query);
  }

  // Get product by ID
  static async getById(id) {
    const query = "SELECT * FROM products WHERE id = ?";
    const results = await this.query(query, [id]);
    return results[0]; // Return single product
  }

  // Get newest products
  static async getNewest(limit) {
    const query = "SELECT * FROM products ORDER BY created_at DESC LIMIT ?";
    return this.query(query, [limit]);
  }

  // Get paginated products
  static async getPaginated(page, limit) {
    const offset = (page - 1) * limit;
    const query = "SELECT * FROM products LIMIT ? OFFSET ?";
    return this.query(query, [limit, offset]);
  }

  // Get total product count
  static async getCount() {
    const query = "SELECT COUNT(*) AS count FROM products";
    const results = await this.query(query);
    return results[0].count;
  }

  // Create a new product
  static async create(product) {
    const query = "INSERT INTO products SET ?";
    const results = await this.query(query, product);
    return results.insertId; // Return inserted product ID
  }

  // Update a product
  static async update(id, product) {
    const query = "UPDATE products SET ? WHERE id = ?";
    return this.query(query, [product, id]);
  }

  // Delete a product
  static async delete(id) {
    const query = "DELETE FROM products WHERE id = ?";
    return this.query(query, [id]);
  }
}

module.exports = Product;

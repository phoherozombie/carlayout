const db = require('../database/database');

class Slide {
  // General query handler
  static async query(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get all slides
  static async getAll() {
    const query = 'SELECT * FROM slide';
    return this.query(query);
  }

  // Get slide by ID
  static async getById(id) {
    const query = 'SELECT * FROM slide WHERE id = ?';
    const results = await this.query(query, [id]);
    return results[0]; // Return single slide
  }

  // Create a new slide
  static async create(slide) {
    const query = 'INSERT INTO slide (link, image) VALUES (?, ?)';
    const results = await this.query(query, [slide.link, slide.image]);
    return results.insertId; // Return inserted slide ID
  }

  // Update an existing slide
  static async update(id, slide) {
    const query = 'UPDATE slide SET link = ?, image = ? WHERE id = ?';
    const results = await this.query(query, [slide.link, slide.image, id]);
    return results.affectedRows; // Return number of affected rows
  }

  // Delete a slide
  static async delete(id) {
    const query = 'DELETE FROM slide WHERE id = ?';
    const results = await this.query(query, [id]);
    return results.affectedRows; // Return number of affected rows
  }
}

module.exports = Slide;

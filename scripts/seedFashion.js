const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: path.join(__dirname, '..', 'config.env') });
require('../db/config');
require('../db/product');

const ProductModel = mongoose.model('products');

function stripHtml(html) {
  if (!html || typeof html !== 'string') return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 2000);
}

async function seed() {
  const csvPath = path.join(__dirname, '..', '..', 'Fashion Dataset.csv');
  if (!fs.existsSync(csvPath)) {
    console.error('CSV not found:', csvPath);
    process.exit(1);
  }

  if (mongoose.connection.readyState !== 1) {
    await new Promise((resolve, reject) => {
      mongoose.connection.once('open', resolve);
      mongoose.connection.on('error', reject);
    });
  }

  const parser = fs.createReadStream(csvPath).pipe(
    parse({ columns: true, skip_empty_lines: true, relax_column_count: true })
  );

  const BATCH = 500;
  let batch = [];
  let total = 0;

  for await (const row of parser) {
    const name = row.name && row.name.trim();
    const price = parseFloat(row.price);
    if (!name || Number.isNaN(price) || price <= 0) continue;

    batch.push({
      name,
      price: Math.round(price),
      items: 10,
      brand: (row.brand && row.brand.trim()) || 'Unknown',
      description: stripHtml(row.description || ''),
      images: row.img && row.img.trim() ? [row.img.trim()] : [],
      rating: parseFloat(row.avg_rating) || 4,
    });

    if (batch.length >= BATCH) {
      await ProductModel.insertMany(batch);
      total += batch.length;
      console.log('Inserted', total);
      batch = [];
    }
  }

  if (batch.length) {
    await ProductModel.insertMany(batch);
    total += batch.length;
  }

  console.log('Done. Total products:', total);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

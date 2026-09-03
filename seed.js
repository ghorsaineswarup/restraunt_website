require('dotenv').config();
const { MongoClient } = require('mongodb');

const menuItems = [
  // Momos
  { name: "Chicken Momo", description: "Steamed dumplings filled with minced chicken, ginger, and garlic, served with tomato achar.", price: 9.99, category: "Momo", image: "images/chicken-momo.jpeg" },
  { name: "Vegetable Momo", description: "Steamed dumplings with cabbage, carrot, and paneer filling.", price: 8.99, category: "Momo", image: "images/vegetable-momo.jpeg" },
  { name: "Jhol Momo", description: "Momos served in a spiced, tangy broth.", price: 10.99, category: "Momo", image: "images/jhol-momo.jpeg" },
  { name: "Fried Momo", description: "Crispy pan-fried dumplings with a side of spicy tomato chutney.", price: 10.49, category: "Momo", image: "images/fried-momo.jpeg" },
  { name: "Buff Momo", description: "Traditional buffalo meat momos, a Kathmandu street food classic.", price: 9.49, category: "Momo", image: "images/buff-momo.jpeg" },

  // Nepali Main Courses
  { name: "Dal Bhat Tarkari", description: "Steamed rice, lentil soup, seasonal vegetable curry, and pickle.", price: 13.99, category: "Nepali Main Courses", image: "images/dal-bhat-tarkari.jpeg" },
  { name: "Chicken Sekuwa", description: "Grilled marinated chicken skewers with Nepali spices.", price: 14.99, category: "Nepali Main Courses", image: "images/chicken-sekuwa.jpeg" },
  { name: "Aloo Tama", description: "Bamboo shoot and potato curry, a Nepali specialty.", price: 11.99, category: "Nepali Main Courses", image: "images/aalo-tama.jpeg" },
  { name: "Gundruk Sadeko", description: "Fermented leafy greens tossed with spices, tomato, and onion.", price: 9.99, category: "Nepali Main Courses", image: "images/gundruk-sadeko.jpeg" },
  { name: "Choila", description: "Spicy grilled buffalo or chicken salad, a Newari delicacy.", price: 13.49, category: "Nepali Main Courses", image: "images/choila.jpeg" },
  { name: "Thakali Set", description: "A traditional platter with rice, lentils, meat curry, greens, and pickle.", price: 16.99, category: "Nepali Main Courses", image: "images/thakali-set.jpeg" },

  // Appetizers
  { name: "Chatamari", description: "Rice flour crepe topped with minced meat and egg, sometimes called 'Nepali pizza.'", price: 7.99, category: "Appetizers", image: "images/chatamari.jpeg" },
  { name: "Sukuti", description: "Dried, spiced meat, often served as a snack with drinks.", price: 8.49, category: "Appetizers", image: "images/sukuti.jpeg" },
  { name: "Samosa", description: "Crispy pastry filled with spiced potatoes and peas.", price: 5.99, category: "Appetizers", image: "images/samosa.jpeg" },
  { name: "Paneer Pakora", description: "Battered and fried cottage cheese fritters, served with mint chutney.", price: 7.49, category: "Appetizers", image: "images/paneer-pakora.jpeg" },
  { name: "Chicken 65", description: "Spicy, deep-fried Indian-style chicken bites.", price: 9.99, category: "Appetizers", image: "images/chicken-65.jpeg" },

  // Indian Main Courses
  { name: "Butter Chicken", description: "Tender chicken simmered in a creamy tomato and butter sauce.", price: 15.99, category: "Indian Main Courses", image: "images/butter-chicken.jpeg" },
  { name: "Chicken Tikka Masala", description: "Grilled chicken chunks in a spiced curry sauce.", price: 15.49, category: "Indian Main Courses", image: "images/chicken-tikka-masala.jpeg" },
  { name: "Paneer Butter Masala", description: "Cottage cheese cubes in a rich, buttery tomato gravy.", price: 13.99, category: "Indian Main Courses", image: "images/paneer-butter-masala.jpeg" },
  { name: "Lamb Rogan Josh", description: "Slow-cooked lamb curry with Kashmiri spices.", price: 17.99, category: "Indian Main Courses", image: "images/lamb-rogan-josh.jpeg" },
  { name: "Palak Paneer", description: "Cottage cheese cooked in a smooth spinach gravy.", price: 12.99, category: "Indian Main Courses", image: "images/palak-paneer.jpeg" },
  { name: "Chana Masala", description: "Chickpeas simmered in a spiced onion-tomato curry.", price: 11.49, category: "Indian Main Courses", image: "images/chana-masala.jpeg" },
  { name: "Chicken Biryani", description: "Fragrant basmati rice layered with spiced chicken and herbs.", price: 15.99, category: "Indian Main Courses", image: "images/chicken-biryani.jpeg" },

  // Breads & Sides
  { name: "Garlic Naan", description: "Soft tandoor-baked flatbread topped with garlic and butter.", price: 3.99, category: "Breads & Sides", image: "images/garlic-naan.jpeg" },
  { name: "Plain Naan", description: "Classic soft tandoor-baked flatbread.", price: 2.99, category: "Breads & Sides", image: "images/plain-naan.jpeg" },
  { name: "Basmati Rice", description: "Steamed long-grain basmati rice.", price: 3.49, category: "Breads & Sides", image: "images/basmati-rice.jpeg" },
  { name: "Raita", description: "Cooling yogurt side with cucumber and mild spices.", price: 3.99, category: "Breads & Sides", image: "images/raita.jpeg" },

  // Desserts
  { name: "Sel Roti", description: "Sweet, ring-shaped rice bread, a festival staple.", price: 4.99, category: "Desserts", image: "images/selroti.jpeg" },
  { name: "Kheer", description: "Nepali rice pudding with cardamom and nuts.", price: 5.49, category: "Desserts", image: "images/kheer.jpeg" },
  { name: "Gulab Jamun", description: "Warm, syrup-soaked milk dumplings.", price: 4.49, category: "Desserts", image: "images/gulab-jamun.jpeg" }
];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('himalayan_kitchen');
    const collection = db.collection('menuItems');

    await collection.deleteMany({});
    const result = await collection.insertMany(menuItems);

    console.log(`Inserted ${result.insertedCount} menu items.`);
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await client.close();
  }
}

seed();
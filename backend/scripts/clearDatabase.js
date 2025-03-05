const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const clearDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/findmycareer', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Get all collections
    const collections = await mongoose.connection.db.collections();
    
    // Drop each collection
    for (const collection of collections) {
      await collection.drop();
      console.log(`Dropped collection: ${collection.collectionName}`);
    }

    console.log('Database cleared successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
};

clearDatabase(); 
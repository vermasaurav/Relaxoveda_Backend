const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://relaxoveda:surajrelaxoveda@ac-jcrmrut-shard-00-00.tcpmejl.mongodb.net:27017,ac-jcrmrut-shard-00-01.tcpmejl.mongodb.net:27017,ac-jcrmrut-shard-00-02.tcpmejl.mongodb.net:27017/?ssl=true&replicaSet=atlas-wm8und-shard-0&authSource=admin&appName=Cluster0"
    );

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
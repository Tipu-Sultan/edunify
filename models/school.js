const mongoose = require("mongoose");

if (!mongoose.models.School) {
    const schoolSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
          },
          address: {
            type: String,
            required: true,
          },
    });
  
    mongoose.model('School', schoolSchema);
  }
  export default mongoose.models.School;

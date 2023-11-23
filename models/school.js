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
          city: {
            type: String,
            required: true,
          },
          state: {
            type: String,
            required: true,
          },
          contact: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          image: {
            type: String, 
            required: true,
            default:'a',
          },
    });
  
    mongoose.model('School', schoolSchema);
  }
  export default mongoose.models.School;

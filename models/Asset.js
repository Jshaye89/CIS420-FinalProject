const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  assignedTo: { 
    type: String, 
    required: true 
  },
  deviceType: { 
    type: String, 
    required: true, 
    enum: ['Desktop', 'Laptop', 'Tablet', 'Phone'] // Restricting to allowed device types
  },
  manufacturer: { 
    type: String, 
    required: true 
  },
  model: { 
    type: String, 
    required: true 
  },
  serialNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  datePurchased: { 
    type: Date, 
    required: true 
  },
  warranty: { 
    type: Number, 
    required: true, 
    min: 0 // Warranty should be a positive number
  },
  department: { 
    type: String, 
    default: 'Unknown' // Default value for backward compatibility
  },
  location: { 
    type: String, 
    default: 'Unknown' // Default value for backward compatibility
  }
});

module.exports = mongoose.model('Asset', AssetSchema);

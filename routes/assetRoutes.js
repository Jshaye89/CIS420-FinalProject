const express = require('express');
const Asset = require('../models/Asset');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Route to add a new asset
router.post('/', async (req, res) => {
  try {
    const newAsset = new Asset(req.body);
    await newAsset.save();
    res.status(201).json({ message: 'Asset added successfully', asset: newAsset });
  } catch (error) {
    console.error('Error adding asset:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to get all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get an asset by ID
router.get('/:id', async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.status(200).json(asset);
  } catch (error) {
    console.error('Error fetching asset by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update an asset by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated asset
      runValidators: true, // Ensure the data is validated according to the model
    });

    if (!updatedAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    res.status(200).json({ message: 'Asset updated successfully', asset: updatedAsset });
  } catch (error) {
    console.error('Error updating asset:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete an asset by ID
router.delete('/:id', async (req, res) => {
  try {
    const assetId = req.params.id;

    // Check if the provided ID is valid
    if (!ObjectId.isValid(assetId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Attempt to delete the asset using the ObjectId
    const deletedAsset = await Asset.findByIdAndDelete(assetId);

    if (!deletedAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    res.status(200).json({ message: 'Asset deleted successfully', asset: deletedAsset });
  } catch (error) {
    console.error('Error deleting asset:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to fetch all assets for report generation
router.get('/report', async (req, res) => {
  try {
    const assets = await Asset.find(); // Fetch all assets from the database
    res.status(200).json(assets);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all notifications
router.get('/notifications', async (req, res) => {
  try {
    const assets = await Asset.find();

    // We are mapping through all assets to generate notifications
    const notifications = assets.map(asset => {
      const notification = {};

      // Calculate warranty expiry and lifecycle end
      const warrantyExpiryDate = new Date(asset.datePurchased);
      warrantyExpiryDate.setFullYear(warrantyExpiryDate.getFullYear() + parseInt(asset.warranty)); // Make sure warranty is an integer
      const today = new Date();

      if (warrantyExpiryDate < today) {
        notification.reason = 'Warranty Expired';
      }

      const lifecycleEndDate = new Date(asset.datePurchased);
      lifecycleEndDate.setFullYear(lifecycleEndDate.getFullYear() + 5); // 5 years from the purchase date
      if (today >= lifecycleEndDate) {
        notification.reason = 'Lifecycle Ended';
      }

      if (notification.reason) {
        // If a reason exists, prepare the notification object
        notification.assignedTo = asset.assignedTo;
        notification.model = asset.model;
        notification.warrantyExpiryDate = warrantyExpiryDate.toLocaleDateString(); // Format dates
        notification.datePurchased = asset.datePurchased.toLocaleDateString();
        return notification;  // Only include assets with relevant notifications
      }
      return null;  // No notification needed if no reason
    }).filter(notification => notification !== null); // Filter out any null notifications

    res.status(200).json(notifications); // Send back the notifications
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error fetching notifications' });
  }
});




// Test endpoint
router.get('/test', (req, res) => {
  res.send('Asset routes are working');
});

module.exports = router;

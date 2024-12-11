const Asset = require('../models/Asset');

// Get all assets
const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new asset
const addAsset = async (req, res) => {
  const { name, serialNumber, purchaseDate, status, assignedTo, location } = req.body;

  try {
    const newAsset = new Asset({ name, serialNumber, purchaseDate, status, assignedTo, location });
    const savedAsset = await newAsset.save();
    res.status(201).json(savedAsset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Edit an asset
const editAsset = async (req, res) => {
  const { id } = req.params;
  const { name, serialNumber, purchaseDate, status, assignedTo, location } = req.body;

  try {
    const updatedAsset = await Asset.findByIdAndUpdate(
      id,
      { name, serialNumber, purchaseDate, status, assignedTo, location },
      { new: true, runValidators: true }
    );
    if (!updatedAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.json(updatedAsset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an asset
const deleteAsset = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAsset = await Asset.findByIdAndDelete(id);
    if (!deletedAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.json({ message: 'Asset deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAssets, addAsset, editAsset, deleteAsset };

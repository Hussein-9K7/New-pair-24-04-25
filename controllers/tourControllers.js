const Tour = require("../models/tourModel");
const mongoose = require("mongoose");

// GET /tours
const getAllTours = async (req, res) => {
  try {
    const user_id = req.user._id; 
    const tours = await Tour.find({ user_id }).sort({ createdAt: -1 }); 
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tours" });
  }
};

// POST /tours
const createTour = async (req, res) => {
  try {
    const user_id = req.user._id; 
    const newTour = await Tour.create({ ...req.body, user_id }); 
    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({ message: "Failed to create tour", error: error.message });
  }
};

// GET /tours/:tourId
const getTourById = async (req, res) => {
  const { tourId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid tour ID" });
  }

  try {
    const tour = await Tour.findById(tourId);
    if (tour) {
      const user_id = req.user._id;
      if (tour.user_id.toString() === user_id.toString()) { 
        res.status(200).json(tour);
      } else {
        res.status(403).json({ message: "You are not authorized to view this tour" });
      }
    } else {
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tour" });
  }
};

// PUT /tours/:tourId
const updateTour = async (req, res) => {
  const { tourId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid tour ID" });
  }

  try {
    const tour = await Tour.findById(tourId);
    if (tour) {
      const user_id = req.user._id;
      if (tour.user_id.toString() === user_id.toString()) { 
        const updatedTour = await Tour.findOneAndUpdate(
          { _id: tourId },
          { ...req.body },
          { new: true }
        );
        res.status(200).json(updatedTour);
      } else {
        res.status(403).json({ message: "You are not authorized to update this tour" });
      }
    } else {
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update tour" });
  }
};

// DELETE /tours/:tourId
const deleteTour = async (req, res) => {
  const { tourId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid tour ID" });
  }

  try {
    const tour = await Tour.findById(tourId);
    if (tour) {
      const user_id = req.user._id;
      if (tour.user_id.toString() === user_id.toString()) {
        const deletedTour = await Tour.findOneAndDelete({ _id: tourId });
        res.status(204).send(); // 204 No Content
      } else {
        res.status(403).json({ message: "You are not authorized to delete this tour" });
      }
    } else {
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tour" });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};

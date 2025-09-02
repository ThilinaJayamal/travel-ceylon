import express from 'express';
import { parser } from '../middleware/cloudinaryMulter.js';

const router = express.Router();

// Multiple image upload
router.post('/', parser.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: 'No files uploaded' });

    const uploadedFiles = req.files.map(file => ({
      filename: file.originalname,
      url: file.path,
    }));

    res.status(200).json({
      message: 'Images uploaded successfully',
      files: uploadedFiles,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

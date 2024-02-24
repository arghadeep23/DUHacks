# Plant Classification and Medicinal uses Identification 

## Overview

This model is being designed to analyze input images of plant leaves, specifically with a shape of 256x256x3, and provide information about the plant species, the health status of the leaf (healthy or diseased), and the potential medicinal uses of the identified plant.

## Features to be implemented

1. **Plant Classification:**
   - Given an input image, the tool employs a trained machine learning model to classify the plant species.
   - The model has been trained on a diverse dataset of plant leaves to ensure accurate identification.

2. **Health Status Detection:**
   - The tool can determine whether the leaf is healthy or diseased.
   - This information is crucial for assessing the suitability of the leaf for medicinal purposes.

3. **Medicinal Identification:**
   - If the leaf is identified as belonging to a plant with known medicinal properties, the tool provides information about the medicinal uses of that plant.
   - A comprehensive database of medicinal plants and their uses is integrated into the tool for accurate identification.

## Dataset

The datasets can be found here-<br>
https://data.mendeley.com/datasets/nnytj2v3n5/1<br>
https://data.mendeley.com/datasets/nnytj2v3n5/1

We will be crerating 2 classes for each plant leaf, i.e., diseased and healthy for health status detection.

## Progress till time
   - The dataset, approximately of size 10GB, is preprocessed.
   - The first step is creating two different classes for a plant species, one containing the images of healthy leaves and the other of diseased leaves.
   - Next the 80% of dataset will be used for training, 10% for testing and 10% for validation.
   - The dataset partition allows shuffling of the data which ensures that the model is not trained on the same data every time and also that there is no bias.
   - The images are resized to 256x256 and with 3 channels.
   - The dataset is augmented with vertical flip, horizantal flip and at any random rotated image of the original image. This ensures that the image is recognizable if in case image is taken at any other angle (i.e., tilted image or if the leaf is placed upside down or anything like that).
   - The augmented images are then mapped to the classes in which they belong.
   - The dataset can be accessed here: https://drive.google.com/file/d/1ffQycYC1G8R75amECfIyjoQYtDiRb0oJ/view?usp=drive_link

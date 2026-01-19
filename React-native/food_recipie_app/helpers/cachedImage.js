import { Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated'

export default function CachedImage(props) {
  const { uri } = props;
  const [cachedSource, setCachedSource] = useState(null);

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        // Attempt to retrieve the cached image from AsyncStorage
        const storedImage = await AsyncStorage.getItem(uri); 
        if (storedImage) {
          // If cached image exists, set it as the source
          setCachedSource({ uri: storedImage });
          console.log('Using cached image:', storedImage);
        } else {
          // Fetch the image from the network
          const response = await fetch(uri);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          // Convert the response to a Blob
          const imageBlob = await response.blob(); // Ensure this line has parentheses
          console.log('Image fetched successfully:', uri);

          const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
              if (reader.result) {
                resolve(reader.result);
              } else {
                reject(new Error('Failed to convert blob to base64'));
              }
            };
            reader.onerror = () => {
              reject(new Error('Error reading the Blob'));
            };
          });

          // Validate base64Data before storing
          if (base64Data) {
            await AsyncStorage.setItem(uri, base64Data); // Store the base64 image
            setCachedSource({ uri: base64Data }); // Set the cached source
            console.log('Image cached successfully:', uri);
          } else {
            console.error('Base64 data is null or undefined, not caching');
          }
        }
      } catch (error) {
        console.error('Error caching image:', error);
        setCachedSource({ uri }); // Fallback to the original URI
      }
    };

    getCachedImage();
  }, [uri]); // Include uri in dependencies for proper updates

  return (
    <Animated.Image source={cachedSource} {...props} onError={() => setCachedSource({ uri: placeholderImage })}/>
  );
}

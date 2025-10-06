import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CameraIcon, PhotoIcon, XMarkIcon, ArrowPathIcon, ShareIcon, HeartIcon } from '@heroicons/react/24/outline';

const ARVirtualTryOn = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedClothing, setSelectedClothing] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showClothingMenu, setShowClothingMenu] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Mock clothing items for virtual try-on
  const clothingItems = [
    {
      id: 1,
      name: 'Classic T-Shirt',
      category: 'tops',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      overlayImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      price: '$29.99',
      colors: ['white', 'black', 'navy', 'gray']
    },
    {
      id: 2,
      name: 'Denim Jacket',
      category: 'outerwear',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop',
      overlayImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop',
      price: '$89.99',
      colors: ['blue', 'black', 'light-blue']
    },
    {
      id: 3,
      name: 'Elegant Blouse',
      category: 'tops',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      overlayImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      price: '$49.99',
      colors: ['white', 'pink', 'blue', 'black']
    },
    {
      id: 4,
      name: 'Summer Dress',
      category: 'dresses',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
      overlayImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
      price: '$79.99',
      colors: ['floral', 'solid-blue', 'solid-red']
    }
  ];

  // Initialize camera stream
  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setIsStreaming(true);
      
      // Start face detection simulation
      setTimeout(() => {
        setFaceDetected(true);
      }, 2000);
      
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
    setFaceDetected(false);
  }, []);

  // Capture photo with virtual clothing overlay
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Add virtual clothing overlay if selected
    if (selectedClothing) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Calculate overlay position and size (simplified positioning)
        const overlayWidth = canvas.width * 0.4;
        const overlayHeight = canvas.height * 0.6;
        const overlayX = (canvas.width - overlayWidth) / 2;
        const overlayY = canvas.height * 0.2;
        
        // Draw clothing overlay with transparency
        ctx.globalAlpha = 0.8;
        ctx.drawImage(img, overlayX, overlayY, overlayWidth, overlayHeight);
        ctx.globalAlpha = 1.0;
        
        // Convert to data URL and set as captured image
        setCapturedImage(canvas.toDataURL('image/jpeg', 0.9));
      };
      img.src = selectedClothing.overlayImage;
    } else {
      setCapturedImage(canvas.toDataURL('image/jpeg', 0.9));
    }
  }, [selectedClothing]);

  // Share captured image
  const shareImage = useCallback(async () => {
    if (!capturedImage) return;
    
    try {
      if (navigator.share) {
        // Convert data URL to blob
        const response = await fetch(capturedImage);
        const blob = await response.blob();
        const file = new File([blob], 'virtual-try-on.jpg', { type: 'image/jpeg' });
        
        await navigator.share({
          title: 'My Virtual Try-On',
          text: 'Check out my virtual try-on with StyleGuru!',
          files: [file]
        });
      } else {
        // Fallback: copy to clipboard or download
        const link = document.createElement('a');
        link.download = 'virtual-try-on.jpg';
        link.href = capturedImage;
        link.click();
      }
    } catch (err) {
      console.error('Error sharing image:', err);
    }
  }, [capturedImage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-black p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            AR Virtual Try-On
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Try on clothes virtually with AI-powered augmented reality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Camera Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              {/* Camera Controls */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {!isStreaming ? (
                      <button
                        onClick={startCamera}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                      >
                        <CameraIcon className="h-5 w-5" />
                        {isLoading ? 'Starting...' : 'Start Camera'}
                      </button>
                    ) : (
                      <button
                        onClick={stopCamera}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                      >
                        <XMarkIcon className="h-5 w-5" />
                        Stop Camera
                      </button>
                    )}
                    
                    {isStreaming && (
                      <button
                        onClick={capturePhoto}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                      >
                        <PhotoIcon className="h-5 w-5" />
                        Capture
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${faceDetected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {faceDetected ? 'Face Detected' : 'No Face'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Stream */}
              <div className="relative bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-96 object-cover"
                />
                
                {/* Face Detection Overlay */}
                {faceDetected && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-32 h-40 border-2 border-green-400 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                )}
                
                {/* Virtual Clothing Overlay */}
                {selectedClothing && faceDetected && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <img
                        src={selectedClothing.overlayImage}
                        alt={selectedClothing.name}
                        className="w-32 h-40 object-cover rounded-lg opacity-80"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400">
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                </div>
              )}
            </div>

            {/* Hidden Canvas for Photo Capture */}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Clothing Selection & Results */}
          <div className="space-y-6">
            {/* Clothing Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Select Clothing
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {clothingItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedClothing(item)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedClothing?.id === item.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                      {item.price}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Captured Photo */}
            {capturedImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Your Virtual Try-On
                </h3>
                
                <div className="relative mb-4">
                  <img
                    src={capturedImage}
                    alt="Virtual Try-On Result"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={shareImage}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    <ShareIcon className="h-4 w-4" />
                    Share
                  </button>
                  <button
                    onClick={() => setCapturedImage(null)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                    Retake
                  </button>
                </div>
              </motion.div>
            )}

            {/* AI Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                AI Recommendations
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Based on your body type and preferences, here are some suggestions:
              </p>
              
              <div className="space-y-3">
                {clothingItems.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {item.name}
                      </p>
                      <p className="text-purple-600 dark:text-purple-400 text-xs font-semibold">
                        {item.price}
                      </p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <HeartIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARVirtualTryOn;

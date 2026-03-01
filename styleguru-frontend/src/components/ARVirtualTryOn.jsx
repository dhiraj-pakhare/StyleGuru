import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CameraIcon, PhotoIcon, XMarkIcon, ArrowPathIcon,
  ArrowDownTrayIcon, ArrowLeftIcon, AdjustmentsHorizontalIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

// ============================================================
// GARMENT CATALOG — Professional clothing items with draw functions
// ============================================================
const GARMENT_CATEGORIES = ['All', 'Tops', 'Outerwear', 'Accessories'];

const GARMENTS = [
  {
    id: 1, name: 'Classic T-Shirt', category: 'Tops', price: '₹899',
    colors: ['#1a1a2e', '#e94560', '#0f3460', '#533483', '#e7e7e7', '#2d6a4f'],
    drawType: 'tshirt',
  },
  {
    id: 2, name: 'Polo Shirt', category: 'Tops', price: '₹1,499',
    colors: ['#1b263b', '#e63946', '#457b9d', '#2d6a4f', '#f1faee', '#6d597a'],
    drawType: 'polo',
  },
  {
    id: 3, name: 'Formal Shirt', category: 'Tops', price: '₹1,999',
    colors: ['#f8f9fa', '#a8dadc', '#457b9d', '#1d3557', '#fca311', '#e9ecef'],
    drawType: 'formalShirt',
  },
  {
    id: 4, name: 'Hoodie', category: 'Outerwear', price: '₹2,499',
    colors: ['#2b2d42', '#8d99ae', '#ef233c', '#264653', '#e9c46a', '#606c38'],
    drawType: 'hoodie',
  },
  {
    id: 5, name: 'Blazer', category: 'Outerwear', price: '₹4,999',
    colors: ['#1a1a2e', '#16213e', '#344e41', '#7f5539', '#3c096c', '#495057'],
    drawType: 'blazer',
  },
  {
    id: 6, name: 'Sunglasses', category: 'Accessories', price: '₹2,999',
    colors: ['#212529', '#6c584c', '#a68a64', '#582f0e', '#1b4332', '#3a0ca3'],
    drawType: 'sunglasses',
  },
];

// ============================================================
// CANVAS GARMENT DRAWING FUNCTIONS
// Each function draws a garment shape using canvas paths
// ============================================================
function drawTShirt(ctx, cx, cy, w, h, color) {
  const hw = w / 2;
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = adjustBrightness(color, -30);
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(0,0,0,0.2)';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  // Neckline
  ctx.moveTo(cx - hw * 0.25, cy);
  ctx.quadraticCurveTo(cx, cy + h * 0.08, cx + hw * 0.25, cy);
  // Right shoulder & sleeve
  ctx.lineTo(cx + hw * 0.85, cy - h * 0.02);
  ctx.lineTo(cx + hw, cy + h * 0.22);
  ctx.lineTo(cx + hw * 0.65, cy + h * 0.28);
  // Right body
  ctx.lineTo(cx + hw * 0.6, cy + h);
  // Bottom hem
  ctx.lineTo(cx - hw * 0.6, cy + h);
  // Left body
  ctx.lineTo(cx - hw * 0.65, cy + h * 0.28);
  ctx.lineTo(cx - hw, cy + h * 0.22);
  ctx.lineTo(cx - hw * 0.85, cy - h * 0.02);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.stroke();
  // Collar highlight
  ctx.beginPath();
  ctx.strokeStyle = adjustBrightness(color, 20);
  ctx.lineWidth = 3;
  ctx.moveTo(cx - hw * 0.25, cy);
  ctx.quadraticCurveTo(cx, cy + h * 0.08, cx + hw * 0.25, cy);
  ctx.stroke();
  ctx.restore();
}

function drawPolo(ctx, cx, cy, w, h, color) {
  drawTShirt(ctx, cx, cy, w, h, color);
  // Add collar
  ctx.save();
  ctx.fillStyle = adjustBrightness(color, 15);
  ctx.strokeStyle = adjustBrightness(color, -20);
  ctx.lineWidth = 1.5;
  const hw = w / 2;
  // Left collar flap
  ctx.beginPath();
  ctx.moveTo(cx - hw * 0.25, cy);
  ctx.lineTo(cx - hw * 0.4, cy - h * 0.06);
  ctx.lineTo(cx - hw * 0.1, cy + h * 0.06);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Right collar flap
  ctx.beginPath();
  ctx.moveTo(cx + hw * 0.25, cy);
  ctx.lineTo(cx + hw * 0.4, cy - h * 0.06);
  ctx.lineTo(cx + hw * 0.1, cy + h * 0.06);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Buttons
  ctx.fillStyle = adjustBrightness(color, -40);
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy + h * 0.06 + i * h * 0.06, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawFormalShirt(ctx, cx, cy, w, h, color) {
  const hw = w / 2;
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = adjustBrightness(color, -30);
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(0,0,0,0.2)';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  // V-neckline for collar opening
  ctx.moveTo(cx - hw * 0.18, cy);
  ctx.lineTo(cx, cy + h * 0.15);
  ctx.lineTo(cx + hw * 0.18, cy);
  // Right shoulder & full sleeve
  ctx.lineTo(cx + hw * 0.85, cy - h * 0.02);
  ctx.lineTo(cx + hw, cy + h * 0.35);
  ctx.lineTo(cx + hw * 0.58, cy + h * 0.38);
  // Right body
  ctx.lineTo(cx + hw * 0.55, cy + h);
  ctx.lineTo(cx - hw * 0.55, cy + h);
  // Left body
  ctx.lineTo(cx - hw * 0.58, cy + h * 0.38);
  ctx.lineTo(cx - hw, cy + h * 0.35);
  ctx.lineTo(cx - hw * 0.85, cy - h * 0.02);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.stroke();
  // Collar
  ctx.fillStyle = adjustBrightness(color, 10);
  ctx.beginPath();
  ctx.moveTo(cx - hw * 0.18, cy);
  ctx.lineTo(cx - hw * 0.45, cy - h * 0.08);
  ctx.lineTo(cx - hw * 0.3, cy + h * 0.05);
  ctx.lineTo(cx, cy + h * 0.15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + hw * 0.18, cy);
  ctx.lineTo(cx + hw * 0.45, cy - h * 0.08);
  ctx.lineTo(cx + hw * 0.3, cy + h * 0.05);
  ctx.lineTo(cx, cy + h * 0.15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Buttons
  ctx.fillStyle = adjustBrightness(color, -50);
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy + h * 0.18 + i * h * 0.15, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawHoodie(ctx, cx, cy, w, h, color) {
  const hw = w / 2;
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = adjustBrightness(color, -30);
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(0,0,0,0.25)';
  ctx.shadowBlur = 10;
  // Hood
  ctx.beginPath();
  ctx.moveTo(cx - hw * 0.35, cy);
  ctx.quadraticCurveTo(cx - hw * 0.5, cy - h * 0.2, cx, cy - h * 0.22);
  ctx.quadraticCurveTo(cx + hw * 0.5, cy - h * 0.2, cx + hw * 0.35, cy);
  ctx.stroke();
  ctx.fillStyle = adjustBrightness(color, -10);
  ctx.fill();
  // Main body
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx - hw * 0.3, cy);
  ctx.quadraticCurveTo(cx, cy + h * 0.06, cx + hw * 0.3, cy);
  ctx.lineTo(cx + hw * 0.9, cy + h * 0.02);
  ctx.lineTo(cx + hw, cy + h * 0.35);
  ctx.lineTo(cx + hw * 0.6, cy + h * 0.38);
  ctx.lineTo(cx + hw * 0.6, cy + h);
  ctx.lineTo(cx - hw * 0.6, cy + h);
  ctx.lineTo(cx - hw * 0.6, cy + h * 0.38);
  ctx.lineTo(cx - hw, cy + h * 0.35);
  ctx.lineTo(cx - hw * 0.9, cy + h * 0.02);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.stroke();
  // Kangaroo pocket
  ctx.beginPath();
  ctx.strokeStyle = adjustBrightness(color, -15);
  ctx.moveTo(cx - hw * 0.35, cy + h * 0.6);
  ctx.quadraticCurveTo(cx, cy + h * 0.68, cx + hw * 0.35, cy + h * 0.6);
  ctx.lineTo(cx + hw * 0.35, cy + h * 0.8);
  ctx.quadraticCurveTo(cx, cy + h * 0.82, cx - hw * 0.35, cy + h * 0.8);
  ctx.closePath();
  ctx.stroke();
  // Drawstrings
  ctx.strokeStyle = adjustBrightness(color, 30);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 4, cy + h * 0.06);
  ctx.lineTo(cx - 6, cy + h * 0.25);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + 4, cy + h * 0.06);
  ctx.lineTo(cx + 6, cy + h * 0.25);
  ctx.stroke();
  ctx.restore();
}

function drawBlazer(ctx, cx, cy, w, h, color) {
  const hw = w / 2;
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = adjustBrightness(color, -30);
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(0,0,0,0.25)';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  // Deep V-neckline
  ctx.moveTo(cx - hw * 0.15, cy);
  ctx.lineTo(cx, cy + h * 0.55);
  ctx.lineTo(cx + hw * 0.15, cy);
  // Right shoulder & full sleeve
  ctx.lineTo(cx + hw * 0.9, cy - h * 0.03);
  ctx.lineTo(cx + hw * 1.05, cy + h * 0.4);
  ctx.lineTo(cx + hw * 0.6, cy + h * 0.42);
  ctx.lineTo(cx + hw * 0.58, cy + h);
  ctx.lineTo(cx - hw * 0.58, cy + h);
  ctx.lineTo(cx - hw * 0.6, cy + h * 0.42);
  ctx.lineTo(cx - hw * 1.05, cy + h * 0.4);
  ctx.lineTo(cx - hw * 0.9, cy - h * 0.03);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.stroke();
  // Lapels
  ctx.fillStyle = adjustBrightness(color, 8);
  ctx.beginPath();
  ctx.moveTo(cx - hw * 0.15, cy);
  ctx.lineTo(cx - hw * 0.5, cy - h * 0.06);
  ctx.lineTo(cx - hw * 0.4, cy + h * 0.12);
  ctx.lineTo(cx - hw * 0.05, cy + h * 0.35);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + hw * 0.15, cy);
  ctx.lineTo(cx + hw * 0.5, cy - h * 0.06);
  ctx.lineTo(cx + hw * 0.4, cy + h * 0.12);
  ctx.lineTo(cx + hw * 0.05, cy + h * 0.35);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Buttons
  ctx.fillStyle = adjustBrightness(color, -50);
  ctx.beginPath();
  ctx.arc(cx, cy + h * 0.56, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy + h * 0.66, 3, 0, Math.PI * 2);
  ctx.fill();
  // Breast pocket
  ctx.strokeStyle = adjustBrightness(color, -15);
  ctx.lineWidth = 1;
  ctx.strokeRect(cx + hw * 0.12, cy + h * 0.18, hw * 0.18, h * 0.08);
  ctx.restore();
}

function drawSunglasses(ctx, cx, cy, w, h, color) {
  ctx.save();
  const glassW = w * 0.42;
  const glassH = h * 0.38;
  const gap = w * 0.08;
  ctx.fillStyle = color;
  ctx.strokeStyle = adjustBrightness(color, -30);
  ctx.lineWidth = 3;
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 6;
  // Left lens
  roundRect(ctx, cx - gap / 2 - glassW, cy - glassH / 2, glassW, glassH, 10);
  ctx.fill();
  ctx.stroke();
  // Right lens
  roundRect(ctx, cx + gap / 2, cy - glassH / 2, glassW, glassH, 10);
  ctx.fill();
  ctx.stroke();
  // Bridge
  ctx.shadowBlur = 0;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(cx - gap / 2, cy);
  ctx.quadraticCurveTo(cx, cy - glassH * 0.2, cx + gap / 2, cy);
  ctx.stroke();
  // Temples (arms)
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - gap / 2 - glassW, cy - glassH * 0.1);
  ctx.lineTo(cx - gap / 2 - glassW - w * 0.2, cy - glassH * 0.15);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + gap / 2 + glassW, cy - glassH * 0.1);
  ctx.lineTo(cx + gap / 2 + glassW + w * 0.2, cy - glassH * 0.15);
  ctx.stroke();
  // Lens shine
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.beginPath();
  ctx.ellipse(cx - gap / 2 - glassW * 0.6, cy - glassH * 0.1, glassW * 0.15, glassH * 0.25, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx + gap / 2 + glassW * 0.4, cy - glassH * 0.1, glassW * 0.15, glassH * 0.25, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function adjustBrightness(hex, amount) {
  let r = parseInt(hex.slice(1, 3), 16) + amount;
  let g = parseInt(hex.slice(3, 5), 16) + amount;
  let b = parseInt(hex.slice(5, 7), 16) + amount;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const DRAW_FUNCTIONS = {
  tshirt: drawTShirt,
  polo: drawPolo,
  formalShirt: drawFormalShirt,
  hoodie: drawHoodie,
  blazer: drawBlazer,
  sunglasses: drawSunglasses,
};

// ============================================================
// FACE DETECTION — Uses browser FaceDetector API (Chrome)
// Falls back to heuristic center positioning if unavailable
// ============================================================
async function detectFace(imageElement) {
  // Try browser's built-in FaceDetector API (Chrome/Edge)
  if ('FaceDetector' in window) {
    try {
      const detector = new window.FaceDetector({ maxDetectedFaces: 1, fastMode: true });
      const faces = await detector.detect(imageElement);
      if (faces.length > 0) {
        const bb = faces[0].boundingBox;
        return { x: bb.x, y: bb.y, width: bb.width, height: bb.height, method: 'auto' };
      }
    } catch (e) {
      console.warn('FaceDetector API failed, using heuristic fallback:', e.message);
    }
  }

  // Heuristic fallback: assume face is in upper-center region
  const w = imageElement.naturalWidth || imageElement.width;
  const h = imageElement.naturalHeight || imageElement.height;
  const faceW = w * 0.2;
  const faceH = faceW * 1.3;
  return {
    x: (w - faceW) / 2,
    y: h * 0.08,
    width: faceW,
    height: faceH,
    method: 'heuristic'
  };
}

// Calculate body anchor points from face detection
function getBodyAnchors(face, imgW, imgH) {
  const faceCX = face.x + face.width / 2;
  const faceCY = face.y + face.height / 2;

  return {
    // Torso: starts below chin, centered on face
    torso: {
      cx: faceCX,
      cy: face.y + face.height * 1.8,
      width: face.width * 3.2,
      height: face.height * 4.0,
    },
    // Eyes: center of face, slightly above middle
    eyes: {
      cx: faceCX,
      cy: face.y + face.height * 0.38,
      width: face.width * 1.3,
      height: face.height * 0.32,
    },
    face,
  };
}

// ============================================================
// MAIN COMPONENT
// ============================================================
const ARVirtualTryOn = () => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [selectedGarment, setSelectedGarment] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [faceData, setFaceData] = useState(null);
  const [detectionMethod, setDetectionMethod] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0.85);
  const [overlayScale, setOverlayScale] = useState(1.0);
  const [showControls, setShowControls] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [cameraMode, setCameraMode] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const canvasRef = useRef(null);
  const photoImgRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const containerRef = useRef(null);

  // Filtered garments
  const filteredGarments = activeCategory === 'All'
    ? GARMENTS
    : GARMENTS.filter(g => g.category === activeCategory);

  // Handle photo upload
  const handlePhotoUpload = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setUserPhoto(e.target.result);
      setFaceData(null);
      setDetectionMethod(null);
      setDragOffset({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file) handlePhotoUpload(file);
  }, [handlePhotoUpload]);

  // Camera functions
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsStreaming(true);
    } catch (err) {
      console.error('Camera access error:', err);
      alert('Unable to access camera. Please check permissions.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const captureFromCamera = useCallback(() => {
    if (!videoRef.current) return;
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = videoRef.current.videoWidth;
    tmpCanvas.height = videoRef.current.videoHeight;
    const tmpCtx = tmpCanvas.getContext('2d');
    tmpCtx.drawImage(videoRef.current, 0, 0);
    setUserPhoto(tmpCanvas.toDataURL('image/jpeg', 0.92));
    setFaceData(null);
    setDetectionMethod(null);
    setDragOffset({ x: 0, y: 0 });
    stopCamera();
    setCameraMode(false);
  }, [stopCamera]);

  // Face detection when photo changes
  useEffect(() => {
    if (!userPhoto) return;
    const img = new Image();
    img.onload = async () => {
      photoImgRef.current = img;
      setIsDetecting(true);
      try {
        const face = await detectFace(img);
        setFaceData(face);
        setDetectionMethod(face.method);
      } catch (e) {
        console.error('Face detection error:', e);
      } finally {
        setIsDetecting(false);
      }
    };
    img.src = userPhoto;
  }, [userPhoto]);

  // Render canvas whenever relevant state changes
  useEffect(() => {
    renderCanvas();
  });

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = photoImgRef.current;
    if (!canvas || !img || !userPhoto) return;

    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    const maxW = container ? container.clientWidth : 640;
    const scale = Math.min(maxW / img.naturalWidth, 600 / img.naturalHeight, 1);
    const cw = img.naturalWidth * scale;
    const ch = img.naturalHeight * scale;

    canvas.width = cw;
    canvas.height = ch;

    // Draw photo
    ctx.drawImage(img, 0, 0, cw, ch);

    // Draw face detection indicator
    if (faceData) {
      const fx = faceData.x * scale;
      const fy = faceData.y * scale;
      const fw = faceData.width * scale;
      const fh = faceData.height * scale;

      if (detectionMethod === 'auto') {
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(fx, fy, fw, fh);
        ctx.setLineDash([]);

        // Label
        ctx.fillStyle = 'rgba(74, 222, 128, 0.85)';
        ctx.font = 'bold 11px Inter, system-ui, sans-serif';
        const label = '✓ Face Detected';
        const tm = ctx.measureText(label);
        ctx.fillRect(fx, fy - 18, tm.width + 8, 18);
        ctx.fillStyle = '#fff';
        ctx.fillText(label, fx + 4, fy - 5);
      }
    }

    // Draw garment overlay
    if (selectedGarment && faceData) {
      const anchors = getBodyAnchors(faceData, img.naturalWidth, img.naturalHeight);
      const drawFn = DRAW_FUNCTIONS[selectedGarment.drawType];
      if (!drawFn) return;

      const isAccessory = selectedGarment.category === 'Accessories';
      const anchor = isAccessory ? anchors.eyes : anchors.torso;

      const ox = (anchor.cx * scale) + dragOffset.x;
      const oy = (anchor.cy * scale) + dragOffset.y;
      const ow = anchor.width * scale * overlayScale;
      const oh = anchor.height * scale * overlayScale;

      ctx.globalAlpha = overlayOpacity;
      drawFn(ctx, ox, oy, ow, oh, selectedColor || selectedGarment.colors[0]);
      ctx.globalAlpha = 1.0;
    }
  }, [userPhoto, faceData, selectedGarment, selectedColor, overlayOpacity, overlayScale, dragOffset, detectionMethod]);

  // Drag to reposition overlay
  const handleCanvasMouseDown = useCallback((e) => {
    if (!selectedGarment || !faceData) return;
    setIsDragging(true);
    e.preventDefault();
  }, [selectedGarment, faceData]);

  const handleCanvasMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setDragOffset(prev => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }));
  }, [isDragging]);

  const handleCanvasMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch events for mobile
  const lastTouchRef = useRef(null);
  const handleTouchStart = useCallback((e) => {
    if (!selectedGarment || !faceData) return;
    setIsDragging(true);
    lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    e.preventDefault();
  }, [selectedGarment, faceData]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !lastTouchRef.current) return;
    const dx = e.touches[0].clientX - lastTouchRef.current.x;
    const dy = e.touches[0].clientY - lastTouchRef.current.y;
    setDragOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    e.preventDefault();
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    lastTouchRef.current = null;
  }, []);

  // Download result
  const downloadResult = useCallback(() => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `styleguru-tryon-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  }, []);

  // Select garment
  const selectGarment = useCallback((garment) => {
    setSelectedGarment(garment);
    setSelectedColor(garment.colors[0]);
    setDragOffset({ x: 0, y: 0 });
    setOverlayScale(1.0);
    setShowControls(true);
  }, []);

  // Reset
  const resetAll = useCallback(() => {
    setUserPhoto(null);
    setSelectedGarment(null);
    setSelectedColor(null);
    setFaceData(null);
    setDetectionMethod(null);
    setDragOffset({ x: 0, y: 0 });
    setOverlayScale(1.0);
    setOverlayOpacity(0.85);
    setShowControls(false);
    stopCamera();
    setCameraMode(false);
  }, [stopCamera]);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/" className="flex items-center gap-2 text-purple-500 font-semibold mb-6 hover:underline">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Features
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <SparklesIcon className="h-8 w-8 text-purple-500" />
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Virtual Try-On
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Upload your photo, select clothing, and see how it looks on you — powered by AI face detection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* LEFT: Photo / Canvas Area (3 columns) */}
          <div className="lg:col-span-3" ref={containerRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Status bar */}
              <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {faceData && (
                    <span className={`flex items-center gap-1.5 text-sm font-medium ${detectionMethod === 'auto' ? 'text-green-600' : 'text-amber-600'
                      }`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${detectionMethod === 'auto' ? 'bg-green-500' : 'bg-amber-500'
                        }`} />
                      {detectionMethod === 'auto' ? 'Face Detected' : 'Estimated Position'}
                    </span>
                  )}
                  {isDetecting && (
                    <span className="text-sm text-blue-500 font-medium animate-pulse">Detecting face...</span>
                  )}
                  {selectedGarment && faceData && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">
                      Drag on canvas to reposition
                    </span>
                  )}
                </div>
                {userPhoto && (
                  <button
                    onClick={resetAll}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    <ArrowPathIcon className="h-4 w-4" /> Reset
                  </button>
                )}
              </div>

              {/* Canvas / Upload Area */}
              <div className="relative bg-gray-900">
                {!userPhoto && !cameraMode ? (
                  // Upload zone
                  <div
                    className="flex flex-col items-center justify-center h-96 cursor-pointer group"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                      className="mb-6"
                    >
                      <PhotoIcon className="h-20 w-20 text-gray-500 group-hover:text-purple-400 transition-colors" />
                    </motion.div>
                    <p className="text-lg font-semibold text-gray-400 group-hover:text-white transition-colors mb-2">
                      Drop your photo here or click to upload
                    </p>
                    <p className="text-sm text-gray-500">
                      For best results, use a front-facing half-body or full-body photo
                    </p>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                      >
                        <PhotoIcon className="h-5 w-5" /> Upload Photo
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setCameraMode(true); startCamera(); }}
                        className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                      >
                        <CameraIcon className="h-5 w-5" /> Use Camera
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(e.target.files[0])}
                    />
                  </div>
                ) : cameraMode ? (
                  // Camera view
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay playsInline muted
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                      <button
                        onClick={captureFromCamera}
                        className="px-6 py-3 bg-white text-gray-900 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                      >
                        <CameraIcon className="h-5 w-5" /> Capture
                      </button>
                      <button
                        onClick={() => { stopCamera(); setCameraMode(false); }}
                        className="px-6 py-3 bg-red-500 text-white rounded-full font-bold shadow-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                      >
                        <XMarkIcon className="h-5 w-5" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Canvas with overlay
                  <canvas
                    ref={canvasRef}
                    className={`w-full h-auto ${isDragging ? 'cursor-grabbing' : selectedGarment ? 'cursor-grab' : 'cursor-default'}`}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseLeave={handleCanvasMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  />
                )}
              </div>

              {/* Controls Panel */}
              <AnimatePresence>
                {showControls && userPhoto && selectedGarment && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-200 dark:border-gray-600 overflow-hidden"
                  >
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                          <AdjustmentsHorizontalIcon className="h-4 w-4" /> Adjustments
                        </span>
                        <button
                          onClick={() => setDragOffset({ x: 0, y: 0 })}
                          className="text-xs text-purple-500 hover:underline"
                        >
                          Reset Position
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Opacity</label>
                          <input
                            type="range" min="0.3" max="1" step="0.05"
                            value={overlayOpacity}
                            onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                            className="w-full accent-purple-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Size</label>
                          <input
                            type="range" min="0.5" max="1.8" step="0.05"
                            value={overlayScale}
                            onChange={(e) => setOverlayScale(parseFloat(e.target.value))}
                            className="w-full accent-purple-500"
                          />
                        </div>
                      </div>

                      {/* Color swatches */}
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-2">Color</label>
                        <div className="flex gap-2 flex-wrap">
                          {selectedGarment.colors.map((color) => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${selectedColor === color ? 'border-purple-500 scale-110 ring-2 ring-purple-300' : 'border-gray-300 dark:border-gray-500'
                                }`}
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              {userPhoto && selectedGarment && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-600 flex gap-3">
                  <button
                    onClick={downloadResult}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5" /> Download Result
                  </button>
                  <button
                    onClick={() => setShowControls(!showControls)}
                    className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    title="Toggle Controls"
                  >
                    <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* RIGHT: Garment Catalog (2 columns) */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-8"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                👕 Garment Catalog
              </h3>

              {/* Category Tabs */}
              <div className="flex gap-2 mb-5 flex-wrap">
                {GARMENT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Item Grid */}
              <div className="grid grid-cols-2 gap-3 max-h-[540px] overflow-y-auto pr-1">
                {filteredGarments.map((garment) => (
                  <motion.button
                    key={garment.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => selectGarment(garment)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${selectedGarment?.id === garment.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-md'
                        : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                      }`}
                  >
                    {/* Preview swatch - shows the garment's first color */}
                    <div
                      className="w-full h-16 rounded-lg mb-2 flex items-center justify-center text-3xl"
                      style={{ backgroundColor: garment.colors[0] + '22', border: `2px solid ${garment.colors[0]}40` }}
                    >
                      {garment.category === 'Accessories' ? '🕶️' :
                        garment.drawType === 'hoodie' ? '🧥' :
                          garment.drawType === 'blazer' ? '🤵' : '👕'}
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{garment.name}</p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-bold">{garment.price}</p>
                    {/* Mini color swatches */}
                    <div className="flex gap-1 mt-1.5">
                      {garment.colors.slice(0, 4).map(c => (
                        <span key={c} className="w-3.5 h-3.5 rounded-full border border-gray-200 dark:border-gray-600" style={{ backgroundColor: c }} />
                      ))}
                      {garment.colors.length > 4 && (
                        <span className="text-xs text-gray-400">+{garment.colors.length - 4}</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {!userPhoto && (
                <div className="mt-5 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                  <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                    📸 Upload a photo first to start trying on clothes!
                  </p>
                </div>
              )}

              {/* How it works */}
              <div className="mt-5 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">How it works</h4>
                <ol className="text-xs text-gray-500 dark:text-gray-400 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">1.</span>
                    Upload a front-facing photo (half-body works best)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">2.</span>
                    AI detects your face and estimates body position
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">3.</span>
                    Select a garment and color — it overlays on your photo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">4.</span>
                    Drag to adjust, tweak size/opacity, then download!
                  </li>
                </ol>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARVirtualTryOn;

import React, { useState, useEffect, useRef } from "react";
const ZoomInOut = () => {
  const [dimensions, setDimensions] = useState({ height: null, width: null });
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      const initialHeight = imgRef.current.clientHeight;
      const initialWidth = imgRef.current.clientWidth;
      setDimensions({ height: initialHeight, width: initialWidth });
    }
  }, []);

  const handleZoomIn = () => {
    if (imgRef.current) {
      const height = imgRef.current.clientHeight;
      const width = imgRef.current.clientWidth;
      setDimensions({
        height: height + 10,
        width: width + 10,
      });
    }
  };

  const handleZoomOut = () => {
    if (imgRef.current) {
      const initialHeight = imgRef.current.clientHeight;
      const initialWidth = imgRef.current.clientWidth;
      setDimensions({
        height: initialHeight - 10,
        width: initialWidth - 10,
      });
    }
  };

  const imgStyle = { height: dimensions.height, width: dimensions.width };

  return (
    <div>
      <h2>Zoom In & Out</h2>
      <div style={{ display: "flex", gap: "4px", padding: "5px" }}>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
      <img
        style={imgStyle}
        ref={imgRef}
        // src="https://media.geeksforgeeks.org/wp-content/uploads/20200923125643/download.png"
        src="/test.png"
        alt="gfg"
      />
    </div>
  );
};

export default ZoomInOut;

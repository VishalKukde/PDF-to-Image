import React, { useEffect } from "react";
import "./App.css";
import PdfToImg from "./PdfToImg";
import ZoomInOut from "./ZoomInOut";
// import { pdfjs } from "pdfjs-dist";

const pdfjs = window.pdfjsLib;

export default function App() {
  return (
    <div>
      {/* <PdfToImg /> */}
      <ZoomInOut />
    </div>
  );
}

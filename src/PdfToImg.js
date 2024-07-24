import React, { useEffect } from "react";
import "./App.css";
// import { pdfjs } from "pdfjs-dist";

const pdfjs = window.pdfjsLib;

const PdfToImg = () => {
  const [pdf, setPdf] = React.useState("");
  const [width, setWidth] = React.useState(0);
  const [image, setImage] = React.useState(null);
  const [height, setHeight] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pdfRendering, setPdfRendering] = React.useState("");
  const [pageRendering, setPageRendering] = React.useState("");
  const [downloadBtnClicked, setDownloadBtnClicked] = React.useState(false);

  const showPdf = async (event) => {
    try {
      setPdfRendering(true);
      const file = event.target.files[0];
      const uri = URL.createObjectURL(file);
      const _PDF_DOC = await pdfjs.getDocument({ url: uri }).promise;
      setPdf(_PDF_DOC);
      setTotalPages(_PDF_DOC.numPages);
      setPdfRendering(false);
      document.getElementById("file-to-upload").value = "";
    } catch (error) {
      alert(error.message);
      setPdfRendering(false);
    }
  };
  console.log("totalPages", totalPages);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPage = async () => {
    if (!pdf) return;

    setPageRendering(true);
    const page = await pdf.getPage(currentPage);
    const viewport = page.getViewport({ scale: 1 });

    const canvas = document.querySelector("#pdf-canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;

    const img = canvas.toDataURL("image/png");
    if (img == null) {
      setImage(img);
      setWidth(viewport.width);
      setHeight(viewport.height);
    }
    setPageRendering(false);

    if (downloadBtnClicked) {
      const link = document.createElement("a");
      link.href = img;
      link.download = `page-${currentPage}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    pdf && renderPage();
    // eslint-disable-next-line
  }, [pdf, currentPage, downloadBtnClicked]);

  const styles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className="App">
      <button
        id="upload-button"
        onClick={() => document.getElementById("file-to-upload").click()}
      >
        {image != null ? "Choose another pdf" : "Select PDF"}
      </button>
      <input
        type="file"
        id="file-to-upload"
        accept="application/pdf"
        hidden
        onChange={showPdf}
      />
      <div id="pdf-main-container">
        <div id="pdf-loader" hidden={!pdfRendering}>
          Loading document ...
        </div>
        <div id="page-count-container">
          Page {currentPage} of <div id="pdf-total-pages"> {totalPages}</div>
        </div>
        <div id="pdf-contents">
          <div id="pdf-meta">
            <div id="pdf-buttons">
              <button id="pdf-prev" onClick={() => changePage(currentPage - 1)}>
                Previous
              </button>
              <button id="pdf-next" onClick={() => changePage(currentPage + 1)}>
                Next
              </button>
            </div>
          </div>
          <div id="image-convas-row" style={styles}>
            <canvas id="pdf-canvas" width={width} height={height}></canvas>
            <div>
              {image && (
                <img
                  id="image-generated"
                  src={image}
                  alt="pdfImage"
                  style={{ width: width, height: height }}
                />
              )}
            </div>
          </div>
          <div id="page-loader" hidden={!pageRendering}>
            Loading page ...
          </div>
          <button onClick={() => setDownloadBtnClicked(true)}>
            Download PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfToImg;

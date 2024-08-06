// Это предполагает, что вы установили jsPDF и html2canvas через npm
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
const { jsPDF } = window.jspdf;

document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("download-pdf");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadPDF);
  }
});

function downloadPDF() {
  html2canvas(document.body).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save("downloaded-page.pdf");
  }).catch(err => {
    console.error("Ошибка при создании PDF: ", err);
  });
}

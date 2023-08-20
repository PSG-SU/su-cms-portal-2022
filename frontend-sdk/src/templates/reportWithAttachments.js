import { PDFDocument } from "pdf-lib";
import html2pdf from "html2pdf.js";
import getProposalReport, { imageAttachement } from "./getProposalReport";

const reportWithAttachments = async (proposalData, clubName, view = false) => {
  const multiplePdfs = [];

  async function insertImageAttachements(url) {
    var opt = {
      margin: 0.5,
      filename: "images.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "p" },
    };

    await html2pdf()
      .from(imageAttachement(url))
      .set(opt)
      .toPdf()
      .output("datauristring")
      .then(async function (pdfAsString) {
        let currdata = await PDFDocument.load(pdfAsString, { ignoreEncryption: true });
        multiplePdfs.push(currdata);
      });
  }

  async function collectPdfs(url) {
    if (Array.isArray(url)) {
      for (let i = 0; i < url.length; i++) {
        var existingPdfBytes = await fetch(url[i]).then((res) =>
          res.arrayBuffer()
        );
        var pdfDoc = await PDFDocument.load(existingPdfBytes, { ignoreEncryption: true });
        multiplePdfs.push(pdfDoc);
      }
    } else {
      var existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
      var pdfDoc = await PDFDocument.load(existingPdfBytes, { ignoreEncryption: true });
      multiplePdfs.push(pdfDoc);
    }
  }

  async function imageOrPdf(url) {
    if (url.includes(".jpg") || url.includes(".png") || url.includes(".jpeg")) {
      await insertImageAttachements(url);
    } else {
      if (!Array.isArray(url) && url.includes(",")) {
        var urls = url.split(",");
        for (let i = 0; i < urls.length; i++) {
          await collectPdfs(urls[i]);
        }
      } else {
        await collectPdfs(url);
      }
    }
  }

  const proposalDetails = async () => {
    var opt = {
      margin: 0.5,
      filename: `Proposal-Details-${proposalData?.eventName}.pdf`,
      image: { type: "jpeg", quality: 0.2 },
      html2canvas: {
        letterRendring: true,
        scale: 2,
        dpi: 162,
        useCORS: true,
      },
      // pagebreak: {
      //   mode: ['avoid-all', 'css', 'legacy'],
      //   after: ".breakPage",
      //   avoid: ["tr", "td", "th", "table"],
      // },
      jsPDF: { unit: "in", format: "a4", orientation: "p" },
    };

    await html2pdf()
      .from(getProposalReport(proposalData, clubName))
      .set(opt)
      .toPdf()
      .output("datauristring")
      .then(async function (pdfAsString) {
        let currdata = await PDFDocument.load(pdfAsString, { ignoreEncryption: true });
        multiplePdfs.push(currdata);
      });
  };

  async function principalApproval() {
    if (proposalData?.approvalForm != null) {
      await imageOrPdf(proposalData.approvalForm);
    }
  }

  async function supportingDocuments() {
    if (proposalData?.fileURLs != null) {
      for (var i = 0; i < proposalData.fileURLs.length; i++) {
        await imageOrPdf(proposalData.fileURLs[i]);
      }
    }
  }

  async function mergePdfs() {
    const doc = await PDFDocument.create();
    var pageNumber = 1;
    for (let i = 0; i < multiplePdfs.length; i++) {
      try {
        const data = multiplePdfs[i];
        const contentPages1 = await doc.copyPages(data, data.getPageIndices());
        for (const page of contentPages1) {
          page.drawText(pageNumber + "", {
            x: 560,
            y: 35,
            size: 12,
          });
          doc.addPage(page);
          pageNumber += 1;
        }
      } catch (err) {
        console.log(err)
      }
    }

    const data = await doc.save("myPdf.pdf");
    var file = new Blob([data], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);

    if (view) {
      window.open(link.href, "_blank");
    } else {
      link.download = `Proposal - ${proposalData?.eventName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

  }

  const documentAdder = async () => {
    await principalApproval();
    await proposalDetails();
    await supportingDocuments();
    await mergePdfs();
  };

  return documentAdder();
};

export default reportWithAttachments;
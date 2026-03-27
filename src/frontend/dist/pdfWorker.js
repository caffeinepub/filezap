// pdfWorker.js — loaded via new Worker('/pdfWorker.js')
importScripts('https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js');

self.onmessage = async (e) => {
  const { files } = e.data;
  try {
    self.postMessage({ type: 'progress', progress: 5, text: 'Starting...' });
    const { PDFDocument } = PDFLib;
    const merged = await PDFDocument.create();
    const step = 80 / files.length;
    for (let i = 0; i < files.length; i++) {
      const doc = await PDFDocument.load(files[i].arrayBuffer);
      const indices = doc.getPageIndices();
      const pages = await merged.copyPages(doc, indices);
      for (const page of pages) merged.addPage(page);
      self.postMessage({ type: 'progress', progress: 10 + step * (i + 1), text: 'Processing file ' + (i + 1) + ' of ' + files.length + '...' });
    }
    self.postMessage({ type: 'progress', progress: 95, text: 'Finalizing...' });
    const pdfBytes = await merged.save();
    self.postMessage({ type: 'done', pdfBytes });
  } catch (err) {
    self.postMessage({ type: 'error', message: err.message });
  }
};

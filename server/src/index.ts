import dotenv from 'dotenv';
import { app } from './app';
import { connectDB } from '@config/db';

dotenv.config();

const PORT = process.env.PORT || 8000;

const startApp = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startApp();

// import { createWorker } from 'tesseract.js';
// (async () => {
//   const worker = await createWorker('eng', 1, {
//     logger: (m) => console.log(m), // Add logger here
//   });
//   const {
//     data: { text },
//     //@ts-ignore
//   } = await worker.recognize(
//     'https://tesseract.projectnaptha.com/img/eng_bw.png',
//     //@ts-ignore
//     { left: 0, top: 0, width: 500, height: 250 },
//   );
//   console.log(text);
//   //@ts-ignore
//   await worker.terminate();
// })();

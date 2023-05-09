//Q. demonstrate  the concept of compression and decompression using zlib module in node js application

// compresssion

const zlib = require('zlib');

const originalData = 'Hello, world!';

// Compress data using zlib.deflate()
zlib.deflate(originalData, (err, compressedData) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Original data size: ${originalData.length} bytes`);
  console.log(`Compressed data size: ${compressedData.length} bytes`);
  console.log(`Compression ratio: ${(compressedData.length / originalData.length) * 100}%`);
});

//decomporession

// const zlib = require('zlib');

// const compressedData = Buffer.from('eJwLSS0uyczPysnJzU0pNkwvSk0tKMrPzs9MAgB8Zwga', 'base64');

// // Decompress data using zlib.inflate()
// zlib.inflate(compressedData, (err, decompressedData) => {
//   if (err) {
//     if (err.code === 'Z_DATA_ERROR') {
//       console.error('Error: Invalid compressed data');
//     } else {
//       console.error(err);
//     }
//     return;
//   }

//   console.log(`Compressed data size: ${compressedData.length} bytes`);
//   console.log(`Decompressed data size: ${decompressedData.length} bytes`);
//   console.log(`Decompressed data: ${decompressedData.toString()}`);
// });


const fs = require('fs');
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log(data);
});

fs.writeFile('output.txt', 'Hello, World!', (err) => {
  if (err) {
    console.error('Error writing to the file:', err);
    return;
  }
  console.log('Data has been written to output.txt');
});



const { Transform } = require("node:stream");
const fs = require("node:fs/promises");

class Decrypt extends Transform{
    _transform(chunk,encoding,callback){
        for (let i = 0; i < chunk.length; ++i) {
            if (chunk[i] !== 255) {
              chunk[i] = chunk[i] - 1;
            }
          } 
          callback(null,chunk)
    }
}

(async ()=>{
    const readFileHandle = await fs.open("encrypt.txt", "r");
    const writeFileHandle = await fs.open("decrypt.txt", "w");
  
    const readStream = readFileHandle.createReadStream();
    const writeStream = writeFileHandle.createWriteStream();
  
    const decrypt = new Decrypt();
  
    readStream.pipe(decrypt).pipe(writeStream);
})()
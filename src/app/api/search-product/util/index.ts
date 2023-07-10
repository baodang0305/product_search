const { exec } = require('child_process');

export const test = () => {
  const filePath = 'src/app/api/search-product/lib/python/index.py'
  return new Promise((resolve, reject) => {
    exec(`python3 ${filePath}`, (error: any, stdout: any, stderr: any) => {
      if (error) {
        reject(`Error executing Python script: ${error}`)
      }
      resolve(stdout)
    });
  })
}
const { exec } = require('child_process');

const extractPhraseKey = (rawText: string) => {
  const filePath = 'lib/python/index.py'
  return new Promise((resolve, reject) => {
    exec(`python3 ${filePath} "${rawText}"`, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.log(error)
        reject(`Error executing Python script: ${error}`)
      }
      resolve(stdout)
    });
  })
}

export default extractPhraseKey
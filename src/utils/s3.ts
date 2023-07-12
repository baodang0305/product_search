import AWS from "aws-sdk";

const payload = {
  S3_BUCKET: "s3-univoice-dev",
  REGION: "ap-southeast-1",
  ACCESS_KEY_ID: "AKIASLKBNNPBOSGDKL7F",
  SECRET_ACCESS_KEY: "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",
};

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  region: payload.REGION,
  accessKeyId: payload.ACCESS_KEY_ID,
  secretAccessKey: payload.SECRET_ACCESS_KEY,
});
async function uploadFileToS3({ key, contentType, file }: any) {
  const res = await s3
    .upload({
      Bucket: payload.S3_BUCKET,
      ACL: "public-read",
      Key: key,
      Body: file,
      ContentType: contentType,
      ContentDisposition: "inline",
      Metadata: { "access-control-allow-origin": "*" },
    })
    .promise();
  return res.Location
}

export { uploadFileToS3 };

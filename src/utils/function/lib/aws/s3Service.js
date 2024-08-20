import AWS from 'aws-sdk';
import s3 from './services';

// Ensure that AWS SDK is configured with your credentials and region

export const uploadFile = (file, imageType=null) => {
  const params = {
    Bucket: 'liveparte-s3-bucket',
    Key: `${imageType}-${file.name}`,
    Body: file,
    ContentType: file.type,
  };

  return new AWS.S3().upload(params).promise();
};

export const downloadFile = (fileName) => {
  const params = {
    Bucket: 'liveparte-s3-bucket',
    Key: fileName,
  };

  return s3.getObject(params).promise();
};

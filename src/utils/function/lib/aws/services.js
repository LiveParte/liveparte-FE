import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIAWZPNK22ODGI3F2ZX',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const s3 = new AWS.S3();

export default s3;

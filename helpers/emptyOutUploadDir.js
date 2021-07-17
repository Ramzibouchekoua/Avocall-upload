const fs = require('fs');
const fse = require('fs-extra');
const cron = require('node-cron');
const path = require('path');

const emptyOutUploadDir = async () => {
  try {
    await fse.emptyDir(path.join(process.cwd(), 'uploads'));
    console.log('upload directory is empty');
  } catch (err) {
    console.error(err);
  }
};

const cronJob = cron.schedule('30 22 * * *', () => {
  fs.readdir(path.join(process.cwd(), 'uploads'), (err, files) => {
    if (err) {
      console.log('cron err : ', err);
    } else {
      if (!files.length) {
        console.log('upload directory is empty!');
      } else {
        emptyOutUploadDir();
      }
    }
  });
});

export default cronJob;

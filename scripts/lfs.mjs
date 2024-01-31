import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const cwd = process.cwd();
console.log(process.argv, cwd);

const files = process.argv.slice(3);

const conditions = process.argv[2];
const cs = conditions.split(';').map((item) => {
  const [ext, size] = item.split(':');
  return { exts: ext.split(','), size: +size.replace(/kb/gi, '') };
});

async function run() {
  let hasTrack = false;
  if (files && files.length > 0) {
    for (const filepath of files) {
      const ext = filepath.toLowerCase().split('.').pop();
      const extInfo = cs.find((item) => item.exts.find((_ext) => _ext === ext || _ext === '*'));
      if (extInfo) {
        const fileinfo = fs.statSync(filepath);
        const filesize = fileinfo.size / 1024;
        if (filesize >= extInfo.size) {
          const result = execSync(`git lfs track ${path.relative(cwd, filepath)}`).toString();
          if (result.indexOf('ready supported') <= -1) {
            hasTrack = true;
          }
        }
      }
    }
  }

  if (hasTrack) {
    execSync(`git add .gitattributes`).toString();
  }
}

run();

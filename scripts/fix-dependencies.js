import fs from 'fs';
import path from 'path';

const lockFilePath = path.join('/vercel/share/v0-project/frontend', 'package-lock.json');

try {
  if (fs.existsSync(lockFilePath)) {
    console.log('[v0] Removing outdated package-lock.json...');
    fs.unlinkSync(lockFilePath);
    console.log('[v0] Successfully removed package-lock.json');
    console.log('[v0] Running npm install to regenerate lock file...');
  } else {
    console.log('[v0] package-lock.json not found, creating fresh...');
  }
} catch (error) {
  console.error('[v0] Error:', error.message);
  process.exit(1);
}

import { copyFileSync } from 'node:fs';

const DIST_FOLDER = 'dist';

copyFileSync(`${DIST_FOLDER}/index.html`, `${DIST_FOLDER}/404.html`);

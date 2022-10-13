import archiver from 'archiver';
import { createWriteStream } from 'fs';
import path from 'path';
import { normalizePath, Plugin, ResolvedConfig as Config } from 'vite';
import { constants as z_constants } from 'zlib';
import { name, version } from '../package.json';

export default function archive(): Plugin {
	let config: Config;
	return {
		name: 'vite-plugin-archive',
		apply: (config, env) => env.mode === 'production',
		configResolved: (c) => {
			config = c;
		},
		closeBundle: () => {
			const resource = normalizePath(config.build.outDir);
			const filename = `${name}_${version}.zip`;
			const outpath = path.resolve(resource, '..', 'archive', filename);

			const archive = archiver.create('zip', { zlib: { level: z_constants.Z_BEST_COMPRESSION } });
			const output = archive.pipe(createWriteStream(outpath));
			output.on('close', () => {
				console.log(`[vite-plugin-archive] created ${outpath} (size: ${archive.pointer()}bytes)`);
			});
			archive.directory(resource, false).finalize();
		},
	};
}

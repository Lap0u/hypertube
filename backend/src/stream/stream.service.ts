import { Injectable, Logger } from '@nestjs/common';
import * as torrentStream from 'torrent-stream';
import { Readable } from 'stream';

@Injectable()
export class StreamService {
private readonly mylogger = new Logger(StreamService.name);
private userEngines = new Map<string, torrentStream>(); // userEngines[pageId]

async streamTorrent(hash: string, pageId: string, dl: boolean): Promise<Readable> {
	return new Promise((resolve, reject) => {
	let magnetLink =
		'magnet:?xt=urn:btih:' +
		hash +
		'&tr=http%3A%2F%2F125.227.35.196%3A6969%2Fannounce&tr=http%3A%2F%2F210.244.71.25%3A6969%2Fannounce&tr=http%3A%2F%2F210.244.71.26%3A6969%2Fannounce&tr=http%3A%2F%2F213.159.215.198%3A6970%2Fannounce&tr=http%3A%2F%2F37.19.5.139%3A6969%2Fannounce&tr=http%3A%2F%2F37.19.5.155%3A6881%2Fannounce&tr=http%3A%2F%2F46.4.109.148%3A6969%2Fannounce&tr=http%3A%2F%2F87.248.186.252%3A8080%2Fannounce&tr=http%3A%2F%2Fasmlocator.ru%3A34000%2F1hfZS1k4jh%2Fannounce&tr=http%3A%2F%2Fbt.evrl.to%2Fannounce&tr=http%3A%2F%2Fbt.rutracker.org%2Fann&tr=https%3A%2F%2Fwww.artikelplanet.nl&tr=http%3A%2F%2Fmgtracker.org%3A6969%2Fannounce&tr=http%3A%2F%2Fpubt.net%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce&tr=http%3A%2F%2Ftracker.grepler.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.mg64.net%3A6881%2Fannounce&tr=http%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.torrentyorg.pl%2Fannounce&tr=udp%3A%2F%2F168.235.67.63%3A6969&tr=udp%3A%2F%2F182.176.139.129%3A6969&tr=udp%3A%2F%2F37.19.5.155%3A2710&tr=udp%3A%2F%2F46.148.18.250%3A2710&tr=udp%3A%2F%2F46.4.109.148%3A6969&tr=udp%3A%2F%2Fcomputerbedrijven.bestelinks.nl%2F&tr=udp%3A%2F%2Fcomputerbedrijven.startsuper.nl%2F&tr=udp%3A%2F%2Fcomputershop.goedbegin.nl%2F&tr=udp%3A%2F%2Fc3t.org&tr=udp%3A%2F%2Fallerhandelenlaag.nl&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969';
	const engine = torrentStream(magnetLink, {path:'/tmp/torrent'});

	engine.on('ready', () => {
		let ffmpeg = require('fluent-ffmpeg');
		let file: any
		let isMkv = false
		// engine.files.forEach(element => {
		// 	this.mylogger.debug(element.name)
		// });
		for (let i = 0; engine.files[i] != undefined ; i++ ){
			if (engine.files[i].name.endsWith(".mp4") || engine.files[i].name.endsWith(".mkv")) {
				file = engine.files[i]
				if (file.name.endsWith(".mkv")) {isMkv=true}
				break
			}
		}
		this.mylogger.log(`Streaming ${file.name}...`);
		if (!dl) {
			if (isMkv) {
				this.mylogger.log("MKV TO MP4")
				const { PassThrough } = require('stream')
				let pathOutput = `/tmp/mkv_to_mp4_file/${file.name.replace('.mkv', '.webm')}`
				const outStream = new PassThrough(pathOutput);
				var command = ffmpeg(file.createReadStream())
				.outputOptions([
					'-preset ultrafast', // Optimize transcoding speed
					'-threads 0',
					'-speed 8',
					'-vf scale=1280:720'
				])
				.audioBitrate(128)
				.audioCodec("libvorbis")
				.audioChannels(2)
				.format("webm")
				.on('start', () => {
					this.mylogger.log('FFmpeg processing started');
				})
				.on('error', (err) => {
					if (command.ffmpegProc) {
						command.ffmpegProc.kill('SIGTERM'); // Use SIGKILL if necessary
						this.mylogger.log('FFmpeg process terminated due to an error');
					}
					// command.end()
					engine.destroy(); // End the stream on error
					this.mylogger.error('An error occurred: ' + err.message);
				})
				.on('end', () => {
					engine.destroy(); // End the incoming stream
					outStream.end(); // Signal the end of the stream
					this.mylogger.log('FFmpeg processing finished');
				})
				.pipe(outStream, { end: true }); // Pipe FFmpeg output to stream
				this.userEngines.set(pageId, outStream)
				resolve(outStream);
			}
			else {
				this.userEngines.set(pageId, engine)
				resolve(file.createReadStream());
			}
		} else { // ici gerer les telechargements
			this.mylogger.log(`Downloading ${file.name}...`);
			resolve(file.select());
		}
	});

	engine.on('idle', () => {
	this.mylogger.log('File DL done');
	});

	engine.on('error', (error) => {
		this.mylogger.error('Error :', error.message);
		engine.destroy();
		reject(error);
	});
	});
}

async stopEngine(pageId: string) {
	try {
		const engine = this.userEngines.get(pageId)
		engine.destroy()
		this.mylogger.log(`Stopping Dl and destroy engine`)
	} catch (error) { this.mylogger.error("Cannot destroy engine", error) }
}
}

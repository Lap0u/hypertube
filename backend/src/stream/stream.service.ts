import { Head, Injectable, Logger } from '@nestjs/common';
import * as torrentStream from 'torrent-stream';
import { PassThrough, Readable } from 'stream';
import { spawn } from 'child_process';
import { createWriteStream } from 'fs';
// import { kill } from 'process';
// import passport from 'passport';

@Injectable()
export class StreamService {
	private readonly mylogger = new Logger(StreamService.name);
	private userEngines = new Map<string, torrentStream>(); // userEngines[pageId]
	
	startFfmpeg(inputStream : Readable, pageId: string) {
		const args = [
			'-i', 'pipe:0',        // Use stdin (pipe:0) as input
			'-preset', 'ultrafast',
			'-threads', '0',
			'-speed', '8',
			'-vf', 'scale=1280:720',
			'-f', 'webm',
			'pipe:1',            // Output videoFile
			'-y'
		];
		
		const ffmpegProcess = spawn('ffmpeg', args);
		let outStream = new PassThrough()
		ffmpegProcess.stdout.pipe(outStream)
		
		// Pipe the input stream to the ffmpeg process
		inputStream.pipe(ffmpegProcess.stdin);
		
		ffmpegProcess.on('close', (code) => {

			this.mylogger.log(`FFmpeg process exited with code ${code}`);
		});
		outStream.on('close', () =>{
      // this.stopEngine(pageId)
			this.mylogger.log("stream closed")
		})
		outStream.on('error', (err) => {
			this.mylogger.error("Error on output stream")
		})
		this.userEngines.set(pageId, [outStream, ffmpegProcess])

		// Handle stdout and stderr for debugging
		// ffmpegProcess.stdout.on('data', (data) => {
		//     this.mylogger.log(`FFmpeg stdout: ${data}`);
		// });

		// ffmpegProcess.stderr.on('data', (data) => {
		// 	this.mylogger.debug(`FFmpeg stderr: ${data}`);
		// });

		// Handle process exit
		ffmpegProcess.on('error', (err) => {
		this.mylogger.error(`FFmpeg error: ${err.message}`);
		});

		return outStream;
  }

  async streamTorrent(hash: string, pageId: string): Promise<Readable> {
    return new Promise((resolve, reject) => {
    let magnetLink =
		'magnet:?xt=urn:btih:' +
		hash +
		'&tr=http%3A%2F%2F125.227.35.196%3A6969%2Fannounce&tr=http%3A%2F%2F210.244.71.25%3A6969%2Fannounce&tr=http%3A%2F%2F210.244.71.26%3A6969%2Fannounce&tr=http%3A%2F%2F213.159.215.198%3A6970%2Fannounce&tr=http%3A%2F%2F37.19.5.139%3A6969%2Fannounce&tr=http%3A%2F%2F37.19.5.155%3A6881%2Fannounce&tr=http%3A%2F%2F46.4.109.148%3A6969%2Fannounce&tr=http%3A%2F%2F87.248.186.252%3A8080%2Fannounce&tr=http%3A%2F%2Fasmlocator.ru%3A34000%2F1hfZS1k4jh%2Fannounce&tr=http%3A%2F%2Fbt.evrl.to%2Fannounce&tr=http%3A%2F%2Fbt.rutracker.org%2Fann&tr=https%3A%2F%2Fwww.artikelplanet.nl&tr=http%3A%2F%2Fmgtracker.org%3A6969%2Fannounce&tr=http%3A%2F%2Fpubt.net%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce&tr=http%3A%2F%2Ftracker.grepler.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.mg64.net%3A6881%2Fannounce&tr=http%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.torrentyorg.pl%2Fannounce&tr=udp%3A%2F%2F168.235.67.63%3A6969&tr=udp%3A%2F%2F182.176.139.129%3A6969&tr=udp%3A%2F%2F37.19.5.155%3A2710&tr=udp%3A%2F%2F46.148.18.250%3A2710&tr=udp%3A%2F%2F46.4.109.148%3A6969&tr=udp%3A%2F%2Fcomputerbedrijven.bestelinks.nl%2F&tr=udp%3A%2F%2Fcomputerbedrijven.startsuper.nl%2F&tr=udp%3A%2F%2Fcomputershop.goedbegin.nl%2F&tr=udp%3A%2F%2Fc3t.org&tr=udp%3A%2F%2Fallerhandelenlaag.nl&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969';
    const engine = torrentStream(magnetLink, { path: '/tmp/torrent' });
    
    engine.on('ready', () => {
      const files = engine.files;
      files.forEach(element => {
          this.mylogger.debug(element.name)
        });
      const videoFile = files.find((file) =>
        file.name.match(/\.(mp4|webm|mkv)$/),
      );
      let isMkv = false
      this.mylogger.log(`Streaming ${videoFile.name}...`);
      if (videoFile.name.endsWith(".mkv")) {isMkv=true}
      if (isMkv) {
        this.mylogger.log('MKV TO MP4');
        let pathOutput = `/tmp/mkv_to_mp4_file/${videoFile.name.replace('.mkv', '.webm')}`;
        const inputStream = videoFile.createReadStream();
        const outStream = this.startFfmpeg(inputStream, pageId);
        const writeStream = createWriteStream(pathOutput);
        outStream.pipe(writeStream);
        resolve(outStream);
      }
      else {
        // this.mylogger.debug(pageId);
        this.userEngines.set(pageId, [engine, undefined]);
        resolve(videoFile.createReadStream());
    }
  });

	engine.on('idle', () => {
	this.mylogger.log('File DL done');
	});

	engine.on('error', (error) => {
		this.mylogger.error('Engine Error :', error.message);
		engine.destroy();
		reject(error);
	});
	});
}

async stopEngine(pageId: string) {
	try {
		const engine = this.userEngines.get(pageId)
    if (engine[1]) {
      this.mylogger.debug("try to kill ffmpeg")
      engine[1].stdin.pause();
      engine[1].stdin.destroy()
      engine[1].stdout.unpipe(engine[0]);
      engine[1].stdout.destroy()
      engine[1].stderr.unpipe();
      engine[1].stderr.destroy();
    }
    engine[0].destroy()
    if (engine[1]) {
		  engine[1].kill("SIGKILL")
    }
    this.mylogger.log(`Stopping Dl and destroy engine`)
    this.userEngines.delete(pageId)
	} catch (error) { this.mylogger.error("Cannot destroy engine", error); throw error }
}
}
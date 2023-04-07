import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { promises } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  isReady = false;
  private ffmpeg;
  constructor() {
    this.ffmpeg = createFFmpeg({ log: true });
    this.ffmpeg.load().then(() => (this.isReady = true));
  }

  async init() {
    if (this.isReady) {
      return;
    }
    await this.ffmpeg.load();

    this.isReady = true;
  }

  async getScreenshots(file: File): Promise<string[]> {
    const data = await fetchFile(file);
    this.ffmpeg.FS('writeFile', file.name, data);

    const seconds = [1, 2, 3];
    const commands: string[] = [];
    seconds.forEach((second) => {
      commands.push(
        // inputs
        '-i',
        file.name,
        '-ss',
        `00:00:0${second}`,
        '-frames:v',
        '1',
        '-filter:v',
        'scale=510:-1',
        `output_0${second}.png`
      );
    });

    await this.ffmpeg.run(...commands);

    const screenshots: string[] = [];
    seconds.forEach((second) => {
      const screenshotFile = this.ffmpeg.FS(
        'readFile',
        `output_0${second}.png`
      );
      const screenshotBlob = new Blob([screenshotFile.buffer], {
        type: 'image/png',
      });
      const screenshotUrl = URL.createObjectURL(screenshotBlob);

      screenshots.push(screenshotUrl);
    });
    return screenshots;
  }
}

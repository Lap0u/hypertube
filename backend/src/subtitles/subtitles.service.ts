import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { error } from 'console';
import { lastValueFrom } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import { SubtitleDto } from './dto/subtitiles.dto';
import { LANG_DICTIONARY } from 'src/common/constants';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class SubtitlesService {
  constructor(private usersService: UsersService) {}

  private readonly mylogger = new Logger(SubtitlesService.name);
  private readonly api = 'https://api.opensubtitles.com/api/v1/';
  private readonly token = process.env.OPENSUBTITLES_TOKEN;
  private readonly bearer = process.env.OPENSUBTITLES_BEARER;
  private readonly httpService = new HttpService();

  async getFileId(imdbId: string, userId: number) {
    try {
      var languages = [
        (await this.usersService.findUserById(userId)).preferredLanguage,
        'en',
      ];
      languages = Array.from(new Set(languages));
      this.mylogger.debug(languages);
      const response = await lastValueFrom(
        this.httpService.get(`${this.api}subtitles`, {
          headers: {
            Accept: 'application/json',
            'Api-Key': this.token,
          },
          params: {
            imdb_id: imdbId,
            languages: languages,
          },
        }),
      );
      if (!(response.data.total_count > 0)) {
        throw error(`No subtitles found in ${languages} for this movie`);
      }
      var fileId = new Map<string, string>();
      response.data.data.forEach((movieInfo) => {
        if (languages.includes(movieInfo.attributes.language)) {
          fileId.set(
            movieInfo.attributes.language,
            movieInfo.attributes.files[0].file_id,
          );
          this.mylogger.debug(movieInfo.attributes.language);
          languages = languages.filter(
            (lang) => lang !== movieInfo.attributes.language,
          );
        }
      });
      this.mylogger.debug(fileId);
      return fileId;
    } catch (error) {
      this.mylogger.error(`getFileId ${error}`);
      throw error;
    }
  }

  async downloadFile(fileId: Map<string, string>) {
    try {
      for (const [lang, fileIdToRequest] of fileId.entries()) {
        const response = await lastValueFrom(
          this.httpService.post(
            `${this.api}download`,
            {
              file_id: fileIdToRequest,
              sub_format: 'webvtt',
            },
            {
              headers: {
                Authorization: this.bearer,
                'Api-Key': this.token,
                'User-Agent': '',
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            },
          ),
        );
        fileId.set(lang, response.data.link);
      }
      console.log(fileId);
      return fileId;
    } catch (error) {
      this.mylogger.error(`downloadFile: ${error}`);
      throw error;
    }
  }

  async getSubtitlesDto(
    langUrl: Map<string, string>,
    userId: number,
  ): Promise<SubtitleDto[]> {
    const subtitleDtos = await Promise.all(
      Array.from(langUrl.keys()).map(async (key) => {
        const subtitleDto = new SubtitleDto();
        subtitleDto.kind = 'subtitles';
        subtitleDto.src = langUrl.get(key);
        subtitleDto.srcLang = key;
        subtitleDto.label = LANG_DICTIONARY[key];
        const user = await this.usersService.findUserById(userId);
        subtitleDto.default = key === user.preferredLanguage;

        return subtitleDto;
      }),
    );

    return subtitleDtos;
  }
}

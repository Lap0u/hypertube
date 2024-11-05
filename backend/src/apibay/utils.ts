export const extractVideoDetails = (fileName: string) => {
  const qualityPattern = /\b(\d{3,4}p|4K|8K)\b/i;
  const typePattern =
    /\b(BRRip|BluRay|Blu-ray|WEBRip|WEB-DL|HDRip|HDR|HDCAM|HDTS|TS|DVDRip|AMZN|UHD|SDC|Remux)\b/i;

  const qualityMatch = fileName.match(qualityPattern);
  const typeMatch = fileName.match(typePattern);

  const quality = qualityMatch ? qualityMatch[0] : 'Unknown';
  const type = typeMatch ? typeMatch[0] : 'Unknown';

  return { quality, type };
};

export const humanFileSize = (size: number) => {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (
    +(size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
};

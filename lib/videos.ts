/**
 * Hero video URLs. Hosted as GitHub release assets (CDN-backed via
 * objects.githubusercontent.com) so the videos don't bloat the
 * repository and don't end up in Vercel's serverless function bundle
 * (which has a 250MB unzipped limit).
 *
 * To swap to a different CDN, just update VIDEO_BASE_URL — file names
 * stay the same.
 *
 * To update the videos themselves: publish a new GitHub Release with
 * the same filenames and bump the tag in VIDEO_BASE_URL.
 */
export const VIDEO_BASE_URL =
  'https://github.com/jasmith11235/mcdevitt-company/releases/download/assets-v1/'

export const heroVideo = (file: string) => `${VIDEO_BASE_URL}${file}`

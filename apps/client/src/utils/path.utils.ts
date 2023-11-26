import Path from 'routes/paths';
import qs from 'qs';

/**
 * Convert path into a relative path, based on a level(e.g. path -> ../path)
 * @param path - Path | string
 * @param level - string = '.'
 * @returns string
 */
export function relativePath(path: Path | string, level = '.') {
  return [level, path].join('/');
}

/**
 * Convert path into an absolute path (e.g. path -> /path)
 * @param path - Path | string
 * @returns string
 */
export function absolutePath(path: Path | string) {
  return `/${path}`;
}

/**
 * Join multiple paths into one path (e.g. path, to -> path/to)
 * @param args (Path | string)[]
 * @returns string
 */
export function join(...args: (Path | string)[]) {
  return args.join('/');
}

/**
 * Convert an object into a URLSearchParams compliant string
 * @param params - T
 * @param options -
 * @returns qs.IStringifyOptions
 */
export const stringify = <T extends object>(
  params: T,
  options: qs.IStringifyOptions = {},
) => qs.stringify(params, { addQueryPrefix: true, ...options });

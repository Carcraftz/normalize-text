const transformToLowerCase = (value: string) =>
  String.prototype.toLocaleLowerCase
    ? value.toLocaleLowerCase()
    : value.toLowerCase();

const transformToUpperCase = (value: string) =>
  String.prototype.toLocaleUpperCase
    ? value.toLocaleUpperCase()
    : value.toUpperCase();

/**
 * Remove spaces from start and end, transform multiple spaces into single one
 * and every space character into whitespace character.
 * @example ```js
 * ('  Fernanda \t Montenegro\r\n') => 'Fernanda Montenegro'
 * ```
 * @param {string} value
 * @returns {string}
 */
export const normalizeWhitespaces = (value: string) =>
  value.replace(/\s{2,}|\s/g, " ").trim();

/**
 * Normalize diacritics removing diacritics (accents) from letters.
 * @example ```js
 * ('Olá, você aí') => 'Ola, voce ai'
 * ```
 * @param {string} value
 * @returns {string}
 */

export const normalizeDiacritics = (value: string) =>
  value.normalize("NFKD").replace(/[\u0080-\uF8FF]/g, "");

/**
 * Normalize a paragraph. Normalize it's whitespaces, transform first letter to
 * upper case and put a dot at end.
 * @example ```js
 * ('hello world, my friend\r\n') => 'Hello world, my friend.'
 * ```
 * @param {string} value
 * @returns {string}
 */

export const normalizeParagraph = (value: string) => {
  const setenceWithPeriod = normalizeWhitespaces(
    value[value.length - 1] === "." ? value : value + "."
  );

  return (
    transformToUpperCase(setenceWithPeriod)[0] + setenceWithPeriod.substring(1)
  );
};

/**
 * Normalize a name. Normalize it's whitespaces and capitalize letters.
 * @example ```js
 * (' fernanda \tMONTENEGRO') => 'Fernanda Montenegro'
 * ```
 * @param {string} value
 * @returns {string}
 */
export const normalizeName = (value: string) =>
  transformToLowerCase(normalizeWhitespaces(value)).replace(
    /^\w|\ \w/g,
    transformToUpperCase
  );

/**
 * Join arguments (when receives an `Array`), normalize it's whitespaces,
 * normalize it's diacritics and transform to lower case.
 * @example ```js
 * ([ '    Olá, \r\n', 'Fernanda \t MONtenegro' ]) => 'ola, fernanda montenegro'
 * ```
 * @param {(string|Array.<string>)} value
 * @returns {string}
 */
export default (values: string | Array<string>) =>
  transformToLowerCase(
    normalizeWhitespaces(
      normalizeDiacritics(Array.isArray(values) ? values.join(" ") : values)
    )
  );
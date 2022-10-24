/* eslint-disable import/prefer-default-export */
export function splitAndTrim(s: string | undefined) { return s?.split(',').map((x) => x.trim()) ?? s; }

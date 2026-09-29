/** Prefix local routes/assets for project-site hosting; leave external URLs and hashes intact. */
export function sitePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return path.startsWith("/") && !path.startsWith("//")
    ? `${basePath}${path}`
    : path;
}

// Baked in at build time — the static site is rebuilt on each deploy.
export default function Year() {
  return new Date().getFullYear();
}

// Shared handle to the single Lenis instance created by <SmoothScroll />.
let instance = null;

export const setLenis = (lenis) => {
  instance = lenis;
};

export const getLenis = () => instance;

export const scrollToCenter = (elementId: string) => {
  let element = document.getElementById(elementId);
  let offset = element.offsetTop - (window.innerHeight / 2) + (element.offsetHeight / 2);
  window.scrollTo({ top: offset, behavior: 'smooth' });
}
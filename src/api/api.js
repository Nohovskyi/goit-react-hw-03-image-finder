export function fetchImage(question, currentPage) {
  return fetch(
    `https://pixabay.com/api/?q=${question}&page=${currentPage}&key=32158519-15576ba172a71d2bf58c30f9b&image_type=photo&orientation=horizontal&per_page=12`
  ).then(r => {
    if (r.ok) {
      return r.json();
    }

    if (r.total !== 0) {
      return Promise.reject(new Error(`Нет картинок с именем ${question}`));
    }
  });
}

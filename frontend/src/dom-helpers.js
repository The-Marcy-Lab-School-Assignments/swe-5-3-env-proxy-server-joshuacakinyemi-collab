const gifList = document.querySelector('#gif-list');
const errorEl = document.querySelector('#error');

// Clears the gif list and renders an array of gif items.
export const renderGifs = (gifs) => {
  gifList.innerHTML = '';
  if (!gifs || gifs.length === 0) {
    renderError('No GIFs found.');
    return;
  }
  gifs.forEach((gif) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = gif.images.original.url;
    img.alt = gif.title || '';
    li.append(img);
    gifList.append(li);
  });
  errorEl.classList.add('hidden');
};

// Shows an error message.
export const renderError = (message) => {
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');
};

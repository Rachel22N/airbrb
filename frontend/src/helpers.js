/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
export function fileToDataUrl (file) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

export function fromISOTime (iso) {
  const date = new Date(iso);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day} ${month} ${year} ${hours}:${String(minutes).padStart(2, '0')}`;
}

// referenced from https://stackoverflow.com/questions/750032/reading-file-contents-on-the-client-side-in-javascript-in-various-browsers
export function fileToObj (fileObj) {
  return new Promise((resolve, reject) => {
    if (!fileObj) {
      reject(new Error('File is null or undefined'));
      return;
    }

    const reader = new FileReader();

    reader.onload = function (evt) {
      try {
        const parsedObj = JSON.parse(evt.target.result);
        resolve(parsedObj);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = function (evt) {
      reject(new Error('Error reading the file'));
    };

    reader.readAsText(fileObj, 'UTF-8');
  });
}

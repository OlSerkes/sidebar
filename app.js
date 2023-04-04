const oneBtn = document.querySelector('.button-one');
const allBtn = document.querySelector('.button-all');
const content = document.querySelector('.content');
const images = document.querySelectorAll('.block-item__img');
const headers = document.querySelectorAll('.block-item__title');
const text = document.querySelectorAll('.block-item__text');
const boxes = document.querySelectorAll('.block-item');
const progress = document.querySelector('.progress');
const loaderFill = document.querySelector('.progress__loader-fill');

function startProgress(seconds) {
  return new Promise((resolve) => {
    let count = seconds;
    const interval = setInterval(() => {
      console.log(count);

      loaderFill.style.animation = `growProgressbar 5s ease-in both`;
      count--;

      if (count < 0) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

function endProgress(seconds) {
  return new Promise((resolve) => {
    let count = seconds;
    const interval = setInterval(() => {
      loaderFill.style.animation = `lowProgressbar 5s ease-in both`;
      count--;

      if (count < 0) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

function hideEachElemSeparate() {
  let time = 0;
  boxes.forEach((box) => {
    const img = box.querySelector('img');
    const title = box.querySelector('h2');
    const text = box.querySelector('p');
    setTimeout(function () {
      img.classList.add('hidden');
    }, (time += 500));
    setTimeout(function () {
      title.classList.add('hidden');
    }, (time += 500));
    setTimeout(function () {
      text.classList.add('hidden');
    }, (time += 500));
    setTimeout(function () {
      box.classList.add('hidden');
    }, (time += 500));
  });

  return setTimeout(showElement, (time += 500));
}

function hideAllElem(box) {
  return new Promise((resolve) => {
    const img = box.querySelector('img');
    const title = box.querySelector('h2');
    const text = box.querySelector('p');

    setTimeout(() => {
      img.classList.add('hidden');
      setTimeout(() => {
        title.classList.add('hidden');
        setTimeout(() => {
          text.classList.add('hidden');
          setTimeout(() => {
            box.classList.add('hidden');

            showElement();
            resolve();
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1500);
  });
}

function showElement() {
  endProgress(3).then(() => {
    setTimeout(() => {
      allBtn.disabled = false;
      oneBtn.disabled = false;

      boxes.forEach((box) => {
        const img = box.querySelector('img');
        const title = box.querySelector('h2');
        const text = box.querySelector('p');

        img.classList.remove('hidden');
        title.classList.remove('hidden');
        text.classList.remove('hidden');
        box.classList.remove('hidden');
      });
    }, 2000);
  });
}

allBtn.addEventListener('click', async () => {
  allBtn.disabled = true;
  oneBtn.disabled = true;

  await startProgress(5);
  Promise.all([...boxes].map(hideAllElem));
});

oneBtn.addEventListener('click', async () => {
  allBtn.disabled = true;
  oneBtn.disabled = true;

  await startProgress(5);
  hideEachElemSeparate();
});

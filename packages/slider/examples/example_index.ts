import { Slider } from '../src';

async function main() {
  initBasicSlider();
}

function initBasicSlider() {
  const element = document.getElementById('slider_basic');
  if (!element) {
    return;
  }

  const slider = new Slider(element);

  setTimeout(() => {
    slider.moveTo(2, { duration: 2000 });
  }, 1000);
}

main();

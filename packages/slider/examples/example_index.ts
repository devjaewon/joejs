import { Slider } from '../src';

async function main() {
  initBasicSlider();
}

function initBasicSlider() {
  const element = document.getElementById('slider_basic');
  if (!element) {
    return;
  }

  new Slider(element);
}

main();

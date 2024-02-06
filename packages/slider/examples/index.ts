import idom from '@kjojs/idom';
import { Slider } from '../src';

async function main() {
  initBasicSlider();
}

function initBasicSlider() {
  const element = idom('#slider_basic').get(0);
  if (!element) {
    return;
  }

  new Slider(element);

  idom('#slider_basic_html').text(`<div id="slider_basic" class="slider">
  <ul class="camera">
    <li class="panel">1</li>
    <li class="panel">2</li>
    <li class="panel">3</li>
    <li class="panel">4</li>
    <li class="panel">5</li>
  </ul>
</div>`);

  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log((window as any).__CPEmbed('.codepen-base'));
  }, 1000);
}

main();

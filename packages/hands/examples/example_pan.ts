import { PanHands } from '../src';

async function main() {
  initHandsInstance();
}

function initHandsInstance() {
  const targetElement = document.getElementById('target_fixed');
  if (!targetElement) {
    return;
  }

  const panHands = new PanHands();

  panHands.bind(targetElement);
}

main();

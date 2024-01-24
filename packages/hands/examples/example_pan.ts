import { Pan, TouchSource } from '../src';

async function main() {
  init();
}

function init() {
  const element = document.getElementById('target');
  const source = element ? new TouchSource(element) : null;

  if (source) {
    new Pan().bind(source).on('input', e => {
      console.log(e);
    });
  }
}

main();

import CanvasVideo from '../src';

async function main() {
  new CanvasVideo({
    width: 300,
    ratio: 3 / 2,
    className: '_video',
    render: () => {},
  }).insertUnder(document.getElementById('base_example') as HTMLElement);
}

main();

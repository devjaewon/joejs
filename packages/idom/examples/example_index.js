import idom from '../src';

async function main() {
  const $target = idom('.target');

  $target.css({
    width: '100px',
    height: '100px',
    'background-color': 'black',
  });
  $target.attr('role', 'main');
  $target.data('role', $target.attr('role'));
  $target.on('click', () => {
    console.log('clicked..!');
  });

  console.log($target.data('role'));
}

main();

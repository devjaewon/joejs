import idom from '../src';

async function main() {
  const $target = idom('.target');

  $target
    .css({
      width: '100px',
      height: '100px',
      'background-color': 'black',
    })
    .attr('role', 'main')
    .data('role', $target.attr('role'))
    .on('click', () => {
      console.log('clicked..!');
    });

  const $child = $target.find('.child');

  console.log($child);
  console.log($child.first());
  console.log($child.last());
}

main();

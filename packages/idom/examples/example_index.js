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

  idom('.target2').html('<div>3</div>');
  idom('.target3').text('<div>3</div>');

  setTimeout(() => {
    $target.transition('transform', 'translateX(100px)', {
      duration: 2000,
      timingFunction: 'ease-in-out',
    });
  }, 1000);
}

main();

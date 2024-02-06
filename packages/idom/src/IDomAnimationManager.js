import { IDom } from './IDom';

IDom.prototype.transition = function (cssPropery, cssValue, option) {
  const duration = option?.duration ?? 300;
  const timingFunction = option?.timingFunction ?? 'ease';
  const durationValue = `${duration / 1000}s`;
  const transitionValue = `${cssPropery} ${durationValue} ${timingFunction}`;

  return new Promise(resolve => {
    let isFinish = false;
    let timer = null;
    const finish = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (!isFinish) {
        this.off('transitionend', finish);
        this.css('transition', null);
        isFinish = true;
        resolve();
      }
    };

    this.once('transitionend', finish);
    this.css('transition', transitionValue);
    timer = setTimeout(finish, duration + 20);
    requestAnimationFrame(() => {
      this.css(cssPropery, cssValue);
    });
  });
};

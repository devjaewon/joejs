import { HandsStyleMap } from "~/types/HandsTypes";
import { handsBindRequiredError } from "~/errors/errors";

export class HandsDomHandler {
  private el: HTMLElement | null = null;
  private initialStyles: HandsStyleMap | null = null;
  private removedStyles: HandsStyleMap | null = null;

  bind(element: HTMLElement) {
    this.el = element;
  }

  initStyles(cssStyles: HandsStyleMap) {
    if (this.initialStyles) {
      this.restoreStyles();
    }
    this.initialStyles = cssStyles;
    this.removedStyles = {};
    this.setStylesByMap(cssStyles, true);
  }

  restoreStyles() {
    if (this.initialStyles) {
      const initialStylesProperties = Object.keys(this.initialStyles);
      this.removeStyles(initialStylesProperties);
      this.initialStyles = null;
    }
    if (this.removedStyles) {
      this.setStylesByMap(this.removedStyles);
      this.removedStyles = null;
    }
  }

  private setStylesByMap(styleMap: HandsStyleMap, remember?: boolean) {
    const el = this.el;
    if (!el) {
      throw handsBindRequiredError;
    }

    Object.keys(styleMap).forEach(property => {
      const value = styleMap[property];
      if (value === null || value === undefined) {
        return;
      }

      if (remember) {
        const existedValue = el.style.getPropertyValue(property);
        if (existedValue && this.removedStyles) {
          this.removedStyles[property] = existedValue;
        }
      }

      el.style.setProperty(property, value.toString());
    });
  }

  private removeStyles(styleProperties: string[]) {
    const el = this.el;
    if (!el) {
      throw handsBindRequiredError;
    }

    styleProperties.forEach(property => el.style.removeProperty(property));
  }
}

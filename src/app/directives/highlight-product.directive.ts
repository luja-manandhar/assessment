import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightProduct]',
  standalone: true
})
export class HighlightProductDirective {

  constructor(private readonly el: ElementRef) { }

  private highlight(style: string) {
      this.el.nativeElement.style.cssText = style;
  }

  @HostListener('mouseenter') onMouseOver() {
    this.highlight("background-color: #999; color: #fff");
  }

  @HostListener('mouseleave') onMouseOut() {
    this.highlight("background-color: #eee; color: #333");
  }
}

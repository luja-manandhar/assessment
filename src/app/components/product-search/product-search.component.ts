import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent implements AfterViewInit{
  @Output() search = new EventEmitter<string>();
  @ViewChild('searchValue') searchInput!: ElementRef;

  ngAfterViewInit(): void {
    const searchObserable = fromEvent<InputEvent>(this.searchInput.nativeElement, 'input');
    searchObserable.pipe(
      debounceTime(800),
      map(event => (event.target as HTMLInputElement).value),
      distinctUntilChanged()
    ).subscribe(
      res => this.search.emit(res)
    )
  }
}

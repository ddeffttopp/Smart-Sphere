import { Component, EventEmitter, Input } from '@angular/core';
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'app-sidebar-catalog',
  templateUrl: './sidebar-catalog.component.html',
  styleUrls: ['./sidebar-catalog.component.scss']
})
export class SidebarCatalogComponent {
  @Input() toggleSidenav!: EventEmitter<unknown>;

  constructor(public filtersService: FiltersService) {
  }

  selectCategories(value: any) {
    this.filtersService.setFilters({
      ...this.filtersService.getFilters(),
      selectedCategory: value
    })
    this.toggleSidenav.emit();
  }
}

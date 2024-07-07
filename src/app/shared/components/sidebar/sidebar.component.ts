import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isUserLogged: boolean | undefined;
  @Output() closeSidebar = new EventEmitter<void>();
  isSidebarCatalogVisible = false;

  onCloseSidebar() {
    this.closeSidebar.emit();
  }

  showSidebarCatalog() {
    this.isSidebarCatalogVisible = true;
  }

  hideSidebarCatalog() {
    this.isSidebarCatalogVisible = false;
  }
}

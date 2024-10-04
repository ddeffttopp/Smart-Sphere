import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isSidebarVisible = false;
  public isUserLogged: boolean = false;

  public toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}

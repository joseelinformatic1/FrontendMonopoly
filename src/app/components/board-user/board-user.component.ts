import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
@Component({
    selector: 'app-board-user',
    standalone: true,
    templateUrl: './board-user.component.html',
    styleUrl: './board-user.component.css',
    imports: [HeaderComponent]
})
export class BoardUserComponent implements OnInit{
ngOnInit(): void {
}
showAdminBoard: any;
showModeratorBoard: any;

}

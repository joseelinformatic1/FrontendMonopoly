import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-user',
  standalone: true,
  imports: [],
  templateUrl: './board-user.component.html',
  styleUrl: './board-user.component.css'
})
export class BoardUserComponent implements OnInit{
ngOnInit(): void {
 window.document.body.style.backgroundColor = '#F3F0E7';
}
showAdminBoard: any;
showModeratorBoard: any;

}

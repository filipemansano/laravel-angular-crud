import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-association-table',
  templateUrl: './association-table.component.html',
  styleUrls: ['./association-table.component.scss']
})
export class AssociationTableComponent implements OnInit {

  @Input() sourceHeader = 'Disponiveis';
  @Input() targetHeader = 'Selecionados';
  @Input() height = 300;

  @Input() source!: any[];
  @Input() target!: any[];

  constructor() { }

  ngOnInit(): void {
  }
}

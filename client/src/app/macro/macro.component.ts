import { Component, OnInit } from '@angular/core';
import { Category, Series, DataRequest } from '../../../../shared/models/macro.model';
import { BehaviorSubject } from 'rxjs';
import { ColumnDef } from 'src/app/shared/components/table/table.interfaces';
import { MacroController } from 'src/api/macro.controller';

@Component({
  selector: 'p-macro',
  templateUrl: './macro.component.html',
  styleUrls: ['./macro.component.scss']
})
export class MacroComponent implements OnInit {
  categories: Category[];
  allSerias: Series[];
  selectedSerias: Series[] = [];
  serias;
  tadleDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  id;
  columns: ColumnDef[] = [
    { field: 'hebName', title: 'שם הסידרה' },
    { field: 'catalogPath', title: 'קטלוג' },
    { field: 'id', title: 'מספר הסדרה' },
    { field: 'hebTypeName', title: 'סוג' },
    { field: 'startDate', title: 'תאריך התחלה' },
    { field: 'endDate', title: 'תאריך סוף' },
    { field: 'unitEnName', title: 'יחידות' },
    { field: 'sourceEnName', title: 'מקור נתונים' },
  ];
  options = { idProp: 'CatgID', nameProp: 'NameHebrew', childrenProp: 'Children' }
  // from = addMonths(new Date(), -1);
  // to = new Date();
  topbarModel: ITopBarModel = {
    logoutTitle: 'logout',
    routerLinks: [
      { link: 'poly', title: 'linkToPoly' },
      { link: 'dumy', title: 'linkToDumy' },
    ],
    menuItems: []
  };
  constructor(private api: MacroController) {
    this.api.getInitialData().then(data => {
      this.categories = data.categories;
      this.allSerias = data.serias;
    });
  }

  ngOnInit() {
  }

}

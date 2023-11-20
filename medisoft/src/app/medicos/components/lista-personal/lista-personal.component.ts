import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IPersonalMedico } from 'src/app/shared/interfaces/i-personal-medico';
import { PersonalService } from 'src/app/shared/services/personal.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { EditarPersonalComponent } from '../editar-personal/editar-personal.component';
@Component({
  selector: 'app-lista-personal',
  templateUrl: './lista-personal.component.html',
  styleUrls: ['./lista-personal.component.scss']
})
export class ListaPersonalComponent implements AfterViewInit {
  displayedColumns: string[] = ['idPersonal', 'nombre', 'area', 'status', 'editar', 'eliminar'];
  dataSource!: MatTableDataSource<IPersonalMedico>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private personalService:PersonalService, public dialog: MatDialog) {
    this.personalService.getPersonal().subscribe(res=>{
      this.dataSource =new MatTableDataSource(res as IPersonalMedico[]);
    })
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    /*
    this.farmaciaService.getMedicamentos().subscribe(res=>{
      this.pacientes=res;
      console.log(this.pacientes);
    })*/
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarPersonal(element: any): void {
    console.log(element);
    
    const dialogRef = this.dialog.open(EditarPersonalComponent, { panelClass:'nuevo-paciente-container',
      data: element,

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
    
  }
  
  deletePaciente(paciente: any){}
}

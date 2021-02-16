import { Component, OnInit } from '@angular/core';
import { RawDataType } from '../Interface/RawDataInterface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  public rawDataObservable: Observable<RawDataType>;
  public rawDocument: AngularFirestoreDocument<RawDataType>;


  currentSprintNumber: number;
  currentSprintName: string;

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.getCurrentSprint();
  }

  getCurrentSprint() {
    this.rawDocument = this.db.doc<RawDataType>('RawData/AppDetails');
    this.rawDataObservable = this.rawDocument.snapshotChanges().pipe(
      map(actions => {
        const data = actions.payload.data() as RawDataType;
        this.currentSprintNumber = data.CurrentSprintId;
        this.currentSprintName = "S" + this.currentSprintNumber;
        return { ...data }
      })
    )
  }
}

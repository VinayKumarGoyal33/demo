import { Component ,OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators'

import { first } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo';
  dataValue:any=[]
  headElements=['Title','Url','Created_at','Author']
  apiUrl="https://hn.algolia.com/api/v1"
  constructor( private http:HttpClient){
    
   this.getData();
  }

  ngOnInit(){
   
  }

  getUsers() {
    debugger
    return this.http.get<any>(this.apiUrl + `/search_by_date?tags=story`)
      .pipe(
        // 
        retry(1),
        
      )
  }

  getData(){
    this.getUsers()
    .pipe(first())
      .subscribe(
        data => {
          debugger
          this.dataValue=data.hits
         
        },
        error => {
         
        }
      )
  }

  getUserDetails(id){
    this.getUsers()
    .pipe(first())
      .subscribe(
        data => {
          debugger
          for (let i=0; i<=data.hits.length;i++){
            if(id == i){
              this.dataValue=data.hits
            }
          }
          // this.dataValue=data.hits
         
        },
        error => {
         
        }
      )
  }
}

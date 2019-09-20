import { Component ,OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators'
// import 'rxjs/add/observable/interval';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo';
  dataValue:any=[]
  dataValue1:any=[];
  headElements=['Title','Url','Created_at','Author'];
  apiUrl="https://hn.algolia.com/api/v1"
  constructor( private http:HttpClient){
    
   this.getData();
  }

  ngOnInit(){
    
  }

  getUsers() {
    // debugger
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
          // debugger
          this.dataValue=data.hits
         
        },
        error => {
         
        }
      )
  }

  getUserDetails(id){
    // debugger
    this.getUsers()
    .pipe(first())
      .subscribe(
        data => {
          // debugger
          this.dataValue1=data.hits;
          for (let i=0; i<=this.dataValue1.length-1;i++){
            if(id == i){
              // debugger
              this.dataValue1=data.hits;
            }
          }
          // this.dataValue=data.hits
         
        },
        error => {
         
        }
      )
  }
}

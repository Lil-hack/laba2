import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OauthToken } from '../OauthToken';
import { AccessToken } from '../AccessToken';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  BASE_API_URL:any='https://api-my-gateway.herokuapp.com/api-gateway/';

 
  param1: string;
  param2: string;
  token:AccessToken;

  URL_Base:any="https://api-my-gateway.herokuapp.com/api-gateway/statistic.getAll" 

  displayedColumns: string[] = ['Дата_записи', 'Друзей', 'Сообществ', 'Подписчиков', 'Подписки', 'Фотоальбомов', 'Видеозаписей', 'Аудиозаписей', 'Заметок', 'Подарки'];
  
  dataSource = null;
  page = 1;
  pagecount = 0;
  constructor(private http:HttpClient) { }
response:any;
  ngOnInit() {
    let params = new HttpParams().set("uuid",localStorage.getItem('UUID')).set("vk", localStorage.getItem('vk'))

    this.http.get(this.URL_Base,{ headers: new HttpHeaders({
      'Authorization': localStorage.getItem('access_token'),
      'Content-Type': 'application/json',
    }), params: params}).subscribe(
        res =>
        { console.log(Object.assign( res));
         this.dataSource=res;
         this.response=res;
         
        },
        err => 
        {console.log(err.status)
        if(err.status==401)
        {
          if(localStorage.getItem('refresh_token')!=null)
          {
            var grant_type_oauth='refresh_token';
            const oauth20: OauthToken = { client_id:localStorage.getItem('client_id'),
            client_secret:localStorage.getItem('client_secret'),
          grant_type:grant_type_oauth,refresh_token:localStorage.getItem('refresh_token')} as OauthToken;
          
          console.log(oauth20);
          this.http.post(this.BASE_API_URL+'oauth20/tokens', oauth20,{
              headers:new HttpHeaders(
                {
                  'Content-Type':'application/json'
                }
              )}).subscribe(
                res =>
                { console.log(res);
                  this.token=Object.assign(new AccessToken(), res);
                  localStorage.setItem('access_token',this.token.access_token);
               
                 
                 // this.router.navigate(['home']);
                  window.location.reload();
                  
          
                },
                msg => {
                 
                 
                 
                }
              );

          }

        }
        }
      );
  }

}

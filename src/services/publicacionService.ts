import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class PublicacionService {
	public Authorization = sessionStorage.getItem('token');
	public url = "http://bigapp123.herokuapp.com/web/api/publicacion";
	constructor(private _http: Http){
	}


	postVideoAction(params:any){
		let json = JSON.stringify(params);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/video", json, {headers: headers})
		
			 .map(res => res.json()); 
	}

	postTextAction(params:any){
		let json = JSON.stringify(params);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/text", json, {headers: headers})
		
			 .map(res => res.json()); 
	}
	
}
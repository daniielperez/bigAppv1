import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class AmigoService {
	public Authorization = sessionStorage.getItem('token');
	public url = "http://bigapp123.herokuapp.com/web/api/amigo";
	constructor(private _http: Http){
	} 

	FindAmigoUsurio(datos){
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/find/user", json, {headers: headers})
			 .map(res => res.json()); 
	}

	FindUsurioAmigos(datos){
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/find/amigos", json, {headers: headers})
			 .map(res => res.json()); 
	}

	IndexPagAction(){ 
		return this._http.get(this.url+"/user/pag",{headers: new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')})}).map(res => res.json());
	}

	NewAmigoAction(data:any){
		let json = JSON.stringify(data);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/new", json, {headers: headers})
							  .map(res => res.json());
	}
}
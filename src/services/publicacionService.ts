import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class PublicacionService {
	public Authorization = sessionStorage.getItem('token');
	public url = "http://192.168.1.75/bigApp/bigApp/web/api/publicacion";
	constructor(private _http: Http){
	}

	comentarioPublicacionAction(datos:any){
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/imagen", json, {headers: headers})
							  .map(res => res.json());
	}
	
}
import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class ComentarioSubastaService {
	public Authorization = sessionStorage.getItem('token');
	public url = "http://192.168.1.68/bigApp/bigApp/web/api/comentarioSubasta";
	constructor(private _http: Http){
	}

	comentarioSubastaAction(datos:any){
		let json = JSON.stringify(datos); 
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/subasta/show", json, {headers: headers})
							  .map(res => res.json());
	}

	crearSubastaAction(datos:any){
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/publicacion/show", json, {headers: headers})
							  .map(res => res.json());
	}

	comentarioSubastaDeleteAction(datos:any){
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/publicacion/delete", json, {headers: headers})
							  .map(res => res.json());
	}

	newComentarioAction(datos:any){
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/new", json, {headers: headers})
							  .map(res => res.json());

	}

}
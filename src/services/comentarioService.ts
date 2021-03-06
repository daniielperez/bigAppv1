import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class ComentarioService {
	public Authorization = sessionStorage.getItem('token');
	public url = "http://bigapp123.herokuapp.com/web/api/comentario";
	constructor(private _http: Http){
	}

	comentarioPublicacionAction(datos:any){
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/publicacion/show", json, {headers: headers})
							  .map(res => res.json());
	}

	crearPublicacionAction(datos:any){
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/publicacion/show", json, {headers: headers})
							  .map(res => res.json());
	}

	comentarioPublicacionDeleteAction(datos:any){
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
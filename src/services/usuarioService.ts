import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {
	public Authorization = sessionStorage.getItem('token');
	public url = "http://192.168.1.73/bigApp/bigApp/web/api/usuario";
	constructor(private _http: Http){
	}

	 loginAction(json:any){
		return this._http.post("http://192.168.1.73/bigApp/bigApp/web/oauth/v2/token",json,{headers: new Headers({'Content-Type':'application/json'})})
		.map(res => res.json());
	}

	isUsuarioAction(cedula:any){
		return this._http.get(this.url+"/isusuario/"+cedula,{headers: new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')})}).map(res => res.json());
	}

	IndexAction(){
		return this._http.get(this.url+"/",{headers: new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')})}).map(res => res.json());
	}

	UsuarioAction(datos:any){
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/logeado", json, {headers: headers})
							  .map(res => res.json());
	}

	EditarAction(usuario:any){
	
		let json = JSON.stringify(usuario);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/editar", json, {headers: headers})
							  .map(res => res.json());
	}

	NewAction(usuario:any){
	
		let json = JSON.stringify(usuario);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/new", json, {headers: headers})
							  .map(res => res.json());
	}

	EditAction(usuario:any){
	
		let json = JSON.stringify(usuario);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/edit", json, {headers: headers})
							  .map(res => res.json());
	}

	IndexPaginatorAction(idPagina:any){
		let json = JSON.stringify(idPagina);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/publicaciones/list/paginator", json, {headers: headers})
			 .map(res => res.json()); 
	}

	
}
import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class ChatUsuarioService {
	public Authorization = sessionStorage.getItem('token');
	public url = "http://bigapp123.herokuapp.com/web/api/chatUsuario";
	constructor(private _http: Http){
	}

	ChatUsuarioAction(datos:any){
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/usuario", json, {headers: headers})
							  .map(res => res.json());
	}

	GetChatsAction(datos:any){  
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/chats", json, {headers: headers})
							  .map(res => res.json());
	}

	newChatsAction(datos:any){  
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/new", json, {headers: headers})
							  .map(res => res.json());
	}
}
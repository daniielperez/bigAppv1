import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class PedidoService {
	public Authorization = sessionStorage.getItem('token');
	public url = "http://192.168.1.73/bigApp/bigApp/web/api/pedido";
	constructor(private _http: Http){
	}

	enviarAction(datos){
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/new", json, {headers: headers})
			 .map(res => res.json()); 
	}

}
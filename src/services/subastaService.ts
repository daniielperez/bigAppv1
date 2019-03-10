import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class SubastaService {
	public Authorization = sessionStorage.getItem('token');
	public url = "http://192.168.1.70/bigApp/bigApp/web/api/subasta";
	constructor(private _http: Http){
	}


	IndexAction(username:any){
		let json = JSON.stringify(username);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/", json, {headers: headers})
							  .map(res => res.json());
	}

	IndexEmpresaAction(empresaId:any){
		let json = JSON.stringify(empresaId);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/empresa", json, {headers: headers})
							  .map(res => res.json());
	}

	
	EditarAction(subasta:any){
	
		let json = JSON.stringify(subasta);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/editar", json, {headers: headers})
							  .map(res => res.json());
	}

	NewAction(subasta:any){
		let json = JSON.stringify(subasta);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/new", json, {headers: headers})
							  .map(res => res.json());
	}

}
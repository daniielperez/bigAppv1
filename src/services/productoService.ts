import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class ProductoService {
	public Authorization = sessionStorage.getItem('token');
	public url = "http://192.168.1.61/bigApp/bigApp/web/api/producto";
	constructor(private _http: Http){
	}

	

	IndexAction(){
		return this._http.get(this.url+"/index",{headers: new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')})}).map(res => res.json());
	}

	productoTagAction(tags:any){
		let json = JSON.stringify(tags);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/tag", json, {headers: headers})
		
			 .map(res => res.json()); 
	}
	productoFiltroAction(parametro:any){
		let json = JSON.stringify(parametro);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/filtro", json, {headers: headers})
		
			 .map(res => res.json());
	}
	NewAction(producto:any){
	
		let json = JSON.stringify(producto);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/new", json, {headers: headers})
							  .map(res => res.json());
	}

	EditAction(producto:any){
	
		let json = JSON.stringify(producto);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/edit", json, {headers: headers})
							  .map(res => res.json());
	}
}
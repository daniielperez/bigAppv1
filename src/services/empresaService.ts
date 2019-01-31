import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class EmpresaService {
	public Authorization = sessionStorage.getItem('token');
	public url = "http://192.168.1.99/bigApp/bigApp/web/api/empresa";
	constructor(private _http: Http){
	}

	IndexPaginatorAction(idPagina:any){ 
		let json = JSON.stringify(idPagina);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/list/paginator", json, {headers: headers})
			 .map(res => res.json()); 
	}			

	IndexAction(){
		return this._http.get(this.url+"/index",{headers: new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')})}).map(res => res.json());
	}

	empresaTagAction(tags:any){
		let json = JSON.stringify(tags);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/tag", json, {headers: headers})
		
			 .map(res => res.json());
	}
	empresaFiltroAction(parametro:any){
		let json = JSON.stringify(parametro);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/filtro", json, {headers: headers})
		
			 .map(res => res.json());
	}
	
	empresaShowAction(datos:any){
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')});
 			return this._http.post(this.url+"/show", json, {headers: headers})
							  .map(res => res.json());
	}

	
}
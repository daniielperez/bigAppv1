import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class MunicipioService {
	public Authorization = sessionStorage.getItem('token');
	public url = "http://192.168.1.99/bigApp/bigApp/web/api/municipio";
	constructor(private _http: Http){
	}

	

	IndexAction(){
		return this._http.get(this.url+"/index",{headers: new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')})}).map(res => res.json());
	}
}
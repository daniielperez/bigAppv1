import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class MedioPagoService {
	public Authorization = sessionStorage.getItem('token');

	public url = "http://192.168.1.68/bigApp/bigApp/web/api/medioPago";

	constructor(private _http: Http){
	}

	

	IndexAction(){
		return this._http.get(this.url+"/index",{headers: new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + sessionStorage.getItem('token')})}).map(res => res.json());
	}
}
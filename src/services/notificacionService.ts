import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class NotificacionService {
	public Authorization = sessionStorage.getItem('token');
	public url = "https://onesignal.com/api/v1/notifications";
	constructor(private _http: Http){
	}

	sendUsuarios(datos){
		let json = JSON.stringify(datos);
		let headers = new Headers({'Content-Type':'application/json','Authorization': 'Bearer ' + 'Zjc5ZTBhZmItYjljZC00NzNhLWFiOTMtMjQ1OTE5MmIwMjQ3'});
 			return this._http.post(this.url, json, {headers: headers})
			 .map(res => res.json()); 
	}

}
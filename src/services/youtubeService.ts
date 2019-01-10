import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";


import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeService {
	constructor(private _http: Http){
	}

	infoAction(idVideo){
        let url = "https://www.googleapis.com/youtube/v3/videos?id="+idVideo+"&key=AIzaSyA4-Va60gdUvvOh20gFukNVQTd24nWLBFw&part=snippet";
		return this._http.get(url,).map(res => res.json());
	}

	
}
import { FormService } from './form-post.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefiServiceService {

  constructor(private formService: FormService) { }
  defiUser(defi){
    return this.formService.post(FormService.DEFI_URL, defi)
  }
  getAllUser(){
    return this.formService.get(FormService.USERS_URL,{})
  }
  getAllDefi(){
    return this.formService.get(FormService.DEFI_URL, {})
  }
  //
  refuserDefi(id){
    return this.formService.post(FormService.REFUSER_DEFI_URL, {id})
  }
}

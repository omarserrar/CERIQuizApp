import { FormService } from './form-post.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizzServiceService {

  constructor(private formService: FormService) { }
  downloadRandomQuizz(nbQuestion : number, level: number): any {
    return this.formService.get(FormService.QUIZZ_URL, {nbquestion: nbQuestion, level: level})
  }
  validerQuizz(reponses : any): any {
    return this.formService.post(FormService.QUIZZ_VALIDER, reponses);
  }
  getTop10(){
    return this.formService.get(FormService.TOP10_URL, {});
  }
  getHistoriqueDefi(id){
      return this.formService.get(FormService.HISTORIQUE_DEFI_URL.replace('%id%',id), {});
  }
}

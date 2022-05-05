import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';


export class emailMatcherValidator {
  static courrielDifferents(): ValidatorFn {
      return (c: AbstractControl): { [key: string]: boolean } | null => {
          if (!c['controls'].courriel.value || !c['controls'].courrielConfirmation.value) {
            return null;
          }
          return c['controls'].courriel.value === c['controls'].courrielConfirmation.value ? null : { match: true };
      };
  }   
}
@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})

export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private typeproblemeService: TypeproblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      noTypeprobleme: ['', Validators.required],
      notification: ['pasmeNotifier'],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}],
      descriptionProbleme: ["", [Validators.required, Validators.minLength(5)]],
      noUnite:"",
      dateProbleme:{value:Date(), disabled:true}
    });

    this.typeproblemeService.obtenirTypesProbleme()
    .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
               error => this.errorMessage = <any>error);  
      this.problemeForm.get('notification').valueChanges
      .subscribe(value => this.appliquerNotifications(value))
  }
  static courrielDifferents(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (!c['controls'].courriel.value || !c['controls'].courrielConfirmation.value) {
          return null;
        }
        return c['controls'].courriel.value === c['controls'].courrielConfirmation.value ? null : { match: true };
    };
  }  

  appliquerNotifications(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const telephoneControl = this.problemeForm.get('telephone');   
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');  
    const datesGroupControl = this.problemeForm.get('courrielGroup');      

        // Tous remettre à zéro
        courrielControl.clearValidators();
        courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
        courrielControl.disable();  
    
        telephoneControl.clearValidators();
        telephoneControl.reset();    
        telephoneControl.disable();

        courrielConfirmationControl.clearValidators();
        courrielConfirmationControl.reset();    
        courrielConfirmationControl.disable();
    
 
          
          
            if(typeNotification === 'courrielNotif')
            {
              courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);      
              courrielControl.enable();   
              courrielConfirmationControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);              
              courrielConfirmationControl.enable();          
            }
            if(typeNotification === 'telephoneNotif')
            { 
              telephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]);              
              telephoneControl.enable();         
            }
          

          
        courrielControl.updateValueAndValidity();   
        telephoneControl.updateValueAndValidity();         
        courrielConfirmationControl.updateValueAndValidity();
      }
    


  save(): void {

  }


}

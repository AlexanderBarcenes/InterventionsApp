import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';
import { AppComponent } from '../app.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule ],
      declarations: [ ProblemeComponent],
      providers:[TypeproblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

    it("#1 | Zone PRÉNOM invalide avec 2 caractères", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(2));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
    });
    it("#2 | Zone PRÉNOM valide avec 3 caractères", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(3));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
    });
    it("#3 | Zone PRÉNOM valide avec 200 caractères", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(200));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
    });
    it("#4 | Zone PRÉNOM invalide avec aucune valeur", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(0));
    let errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
    });
    it("#5 | Zone PRÉNOM valide avec 10 espaces", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(" ".repeat(10));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
    });
    it("#6 | Zone PRÉNOM valide avec 2 espaces et 1 caractère", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(" ".repeat(2) + "a".repeat(1));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
    });
    it("#7 | Zone NOM invalide avec 2 caractères", () =>{
      let zone = component.problemeForm.controls['nom'];
      zone.setValue("a".repeat(2));
      let errors = zone.errors || {};
      expect(errors['minlength']).toBeFalsy();
    });
    it("#8 | Zone NOM valide avec 3 caractères", () =>{
      let zone = component.problemeForm.controls['nom'];
      zone.setValue("a".repeat(3));
      let errors = zone.errors || {};
      expect(errors['minlength']).toBeFalsy();
    });
    it("#9 | Zone NOM valide avec 200 caractères", () =>{
      let zone = component.problemeForm.controls['nom'];
      zone.setValue("a".repeat(200));
      let errors = zone.errors || {};
      expect(errors['minlength']).toBeFalsy();
    });
    it("#10 | Zone NOM invalide avec aucune valeur", () =>{
      let zone = component.problemeForm.controls['nom'];
      zone.setValue("a".repeat(0));
      let errors = zone.errors || {};
      expect(errors['required']).toBeTruthy();
    });
    it("#11 | Zone NOM valide avec 10 espaces", () =>{
      let zone = component.problemeForm.controls['nom'];
      zone.setValue(" ".repeat(10));
      let errors = zone.errors || {};
      expect(errors['minlength']).toBeFalsy();
    });
    it("#12 | Zone NOM valide avec 2 espaces et 1 caractère", () =>{
      let zone = component.problemeForm.controls['nom'];
      zone.setValue(" ".repeat(2) + "a".repeat(1));
      let errors = zone.errors || {};
      expect(errors['minlength']).toBeFalsy();
    });
    it("#13 | Zone TÉLÉPONE est désactivée quand ne pas me notifier", () =>{
      component.appliquerNotifications("pasmeNotifier");
      let zone = component.problemeForm.get('telephone');
      expect(zone.status).toEqual('DISABLED');
    });
    it("#14 | Zone TÉLÉPHONE est vide quand ne pas notifier", () =>{
      component.appliquerNotifications("pasmeNotifier");
      let zone = component.problemeForm.get('telephone');
      expect(zone.value).toBeNull();
    });
    it("#15 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier", () =>{
      component.appliquerNotifications("pasmeNotifier");
      let zone = component.problemeForm.get('courrielGroup.courriel');
      expect(zone.status).toEqual('DISABLED');
    });
    it("#16 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier", () =>{
      component.appliquerNotifications("pasmeNotifier");
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      expect(zone.status).toEqual('DISABLED');
    });
    it('#19 | Zone TELEPHONE est désactivée quand notifier Courriel', () => {
      component.appliquerNotifications('courrielNotif');
      let zone = component.problemeForm.get('telephone');
      expect(zone.status).toEqual('DISABLED'); 
    });
    it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
      component.appliquerNotifications('courrielNotif');
      let zone = component.problemeForm.get('courrielGroup.courriel');
      expect(zone.enabled).toBeTrue;   
    }); 
    it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
      component.appliquerNotifications('courrielNotif');
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      expect(zone.enabled).toBeTrue() 
    });
    it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
      component.appliquerNotifications('courrielNotif');
      let zone = component.problemeForm.get('courrielGroup.courriel');
      let errors = zone.errors || {};
      expect(errors['required']).toBeTruthy()
    });
    it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
      component.appliquerNotifications('courrielNotif');
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      let errors = zone.errors || {};
      expect(errors['required']).toBeTruthy()
    });
    it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
      component.appliquerNotifications('courrielNotif');
      let zone = component.problemeForm.get('courrielGroup.courriel');
      zone.setValue("oui");
      let errors = zone.errors || {};
      expect(errors['pattern']).toBeTruthy()
    });
    it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
      component.appliquerNotifications('courrielNotif');
      let zone = component.problemeForm.get('courrielGroup.courriel');
      let zonea = component.problemeForm.get('courrielGroup.courrielConfirmation');
      let zoneb = component.problemeForm.get('courrielGroup');
      zonea.setValue("aaaaaa@bbbbb.ccc");
      let errors = zoneb.errors || null;
      expect(errors).toBeNull();
    });
    it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
      component.appliquerNotifications('courrielNotif');
      let zone = component.problemeForm.get('courrielGroup.courriel');
      let zonea = component.problemeForm.get('courrielGroup.courrielConfirmation');
      let zoneb = component.problemeForm.get('courrielGroup');
      zone.setValue("aaaaaa@bbbbb.ccc");
      let errors = zoneb.errors || null;
      expect(errors).toBeNull();
    });
    it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
      component.appliquerNotifications('courrielNotif');
      let zone = component.problemeForm.get('courrielGroup.courriel');
      let zonea = component.problemeForm.get('courrielGroup.courrielConfirmation');
      let zoneb = component.problemeForm.get('courrielGroup');
      zone.setValue("momo@hotmail.com");
      zonea.setValue("montmorency")
      let errors = zoneb.errors || {};
      expect(errors['match']).toBeTrue()
    });
    it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
      component.appliquerNotifications('courrielNotif');
      let zone = component.problemeForm.get('courrielGroup.courriel');
      let zonea = component.problemeForm.get('courrielGroup.courrielConfirmation');
      let zoneb = component.problemeForm.get('courrielGroup');
      zone.setValue("momo@hotmail.ca");
      zonea.setValue("momo@hotmail.ca");
      let errors = zoneb.errors || {};
      expect(errors['match']).toBeFalsy()
    });
    it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
      component.appliquerNotifications('telephoneNotif');
      let zone = component.problemeForm.get('telephone');
      expect(zone.enabled).toBeTrue() 
    });
    it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
      component.appliquerNotifications('telephoneNotif');
      let zone = component.problemeForm.get('courrielGroup.courriel');
      expect(zone.disabled).toBeTrue() 
    });
    it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
      component.appliquerNotifications('telephoneNotif');
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      expect(zone.disabled).toBeTrue() 
    });
    it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
      component.appliquerNotifications('telephoneNotif');
      let zone = component.problemeForm.get('telephone');
      let errors = zone.errors || {};
      expect(errors['required']).toBeTruthy()
    });
    it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
      component.appliquerNotifications('telephoneNotif');
      let zone = component.problemeForm.get('telephone');
      zone.setValue("abcde")
      let errors = zone.errors || {};
      expect(errors['pattern']).toBeTruthy()
    });
    it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
      component.appliquerNotifications('telephoneNotif');
      let zone = component.problemeForm.get('telephone');
      zone.setValue("123456789")
      let errors = zone.errors || {};
      expect(errors['minlength']).toBeTruthy()
    });
    it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
      component.appliquerNotifications('telephoneNotif');
      let zone = component.problemeForm.get('telephone');
      zone.setValue("12345678911")
      let errors = zone.errors || {};
      expect(errors['maxlength']).toBeTruthy()
    });
    it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
      component.appliquerNotifications('telephoneNotif');
      let zone = component.problemeForm.get('telephone');
      zone.setValue("1234567891")
      let errors = zone.errors || {};
      expect(errors['maxlength']).toBeFalsy()
      expect(errors['minlength']).toBeFalsy()
      expect(errors['pattern']).toBeFalsy()
    });
  });

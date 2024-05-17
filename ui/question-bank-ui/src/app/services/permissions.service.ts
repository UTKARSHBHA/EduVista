import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  permissions: any ;

  constructor(
    private authService: AuthService,
    private jwtHelper: JwtHelperService,

  ) {
    
    }
    
  getPermissions(permission : string){
    // console.log(this.permissions);
    this.permissions = localStorage.getItem('permissions');
    return this.permissions?.includes(permission)
  }

 

  
  
  
}


// 0: "admin.change_logentry"
// ​
// 1: "Questions.add_customuser"
// ​
// 2: "sessions.view_session"
// ​
// 3: "contenttypes.change_contenttype"
// ​
// 4: "Questions.delete_option"
// ​
// 5: "auth.view_group"
// ​
// 6: "contenttypes.view_contenttype"
// ​
// 7: "Questions.view_standard"
// ​
// 8: "Questions.change_subject"
// ​
// 9: "Questions.delete_question"
// ​
// 10: "Questions.delete_chapter"
// ​
// 11: "Questions.add_subject"
// ​
// 12: "admin.view_logentry"
// ​
// 13: "Questions.change_topic"
// ​
// 14: "Questions.view_subject"
// ​
// 15: "Questions.delete_topic"
// ​
// 16: "Questions.view_chapter"
// ​
// 17: "auth.view_permission"
// ​
// 18: "auth.add_permission"
// ​
// 19: "Questions.change_option"
// ​
// 20: "Questions.view_option"
// ​
// 21: "Questions.view_questionpaper"
// ​
// 22: "contenttypes.add_contenttype"
// ​
// 23: "auth.add_group"
// ​
// 24: "sessions.change_session"
// ​
// 25: "Questions.delete_standard"
// ​
// 26: "contenttypes.delete_contenttype"
// ​
// 27: "auth.change_permission"
// ​
// 28: "admin.delete_logentry"
// ​
// 29: "Questions.view_passwordresettoken"
// ​
// 30: "Questions.change_chapter"
// ​
// 31: "Questions.add_option"
// ​
// 32: "Questions.add_standard"
// ​
// 33: "sessions.delete_session"
// ​
// 34: "Questions.delete_questionpaper"
// ​
// 35: "sessions.add_session"
// ​
// 36: "Questions.delete_customuser"
// ​
// 37: "Questions.add_chapter"
// ​
// 38: "Questions.add_passwordresettoken"
// ​
// 39: "auth.change_group"
// ​
// 40: "Questions.add_questionpaper"
// ​
// 41: "Questions.change_questionpaper"
// ​
// 42: "Questions.change_standard"
// ​
// 43: "Questions.view_customuser"
// ​
// 44: "Questions.add_topic"
// ​
// 45: "Questions.view_topic"
// ​
// 46: "Questions.change_customuser"
// ​
// 47: "admin.add_logentry"
// ​
// 48: "auth.delete_permission"
// ​
// 49: "Questions.delete_subject"
// ​
// 50: "Questions.view_question"
// ​
// 51: "Questions.delete_passwordresettoken"
// ​
// 52: "Questions.add_question"
// ​
// 53: "Questions.change_passwordresettoken"
// ​
// 54: "auth.delete_group"
// ​
// 55: "Questions.change_question"

// Questions.add_questionpaper,Questions.view_question,Questions.delete_standard,Questions.view_standard,Questions.view_subject,Questions.add_topic,Questions.delete_option,Questions.add_passwordresettoken,auth.delete_group,Questions.delete_customuser,auth.add_permission,Questions.delete_questionpaper,Questions.change_subject,contenttypes.add_contenttype,sessions.delete_session,Questions.view_questionpaper,Questions.delete_subject,admin.add_logentry,Questions.add_question,Questions.delete_student,Questions.view_passwordresettoken,Questions.view_student,admin.view_logentry,Questions.add_chapter,Questions.change_topic,contenttypes.view_contenttype,Questions.add_student,Questions.delete_passwordresettoken,Questions.add_subject,Questions.change_customuser,contenttypes.delete_contenttype,Questions.delete_topic,Questions.view_option,auth.add_group,auth.delete_permission,Questions.change_passwordresettoken,Questions.change_standard,Questions.delete_question,Questions.view_chapter,Questions.change_chapter,sessions.change_session,auth.view_permission,Questions.view_topic,auth.view_group,sessions.add_session,Questions.change_student,Questions.change_question,Questions.change_questionpaper,Questions.add_option,Questions.add_customuser,Questions.add_standard,Questions.change_option,auth.change_group,admin.delete_logentry,Questions.delete_chapter,sessions.view_session,Questions.view_customuser,admin.change_logentry,auth.change_permission,contenttypes.change_contenttype
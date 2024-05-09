import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  permissions: any ;

  constructor(
    private authService: AuthService,

  ) { 

    const token = localStorage.getItem('access_token'); // Or wherever you store the token
    this.permissions = this.authService.decodeToken();
    console.log(this.permissions);
  }

  hasViewQuestionPermission(): boolean {
    // console.log('hasviewquestionpermission called',this.permissions?.includes('Questions.view_question') )
    return this.permissions?.includes('Questions.view_question');
  }

  hasChangeSubjectPermission(): boolean{
    return this.permissions?.includes('Questions.change_subject');
  }
  hasChangeStandardPermission(): boolean{
    return this.permissions?.includes('Questions.change_standard');
  }
  hasChangeTopicPermission(): boolean{
    return this.permissions?.includes('Questions.change_topic');
  }
  hasChangeChapterPermission(): boolean{
    return this.permissions?.includes('Questions.change_chapter');
  }
  hasAddQuestionPaperPermission(): boolean{
    return this.permissions?.includes('Questions.add_questionpaper');
  }
  hasViewQuestionPaperPermission(): boolean{
    return this.permissions?.includes('Questions.view_questionpaper');
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
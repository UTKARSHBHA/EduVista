import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class QuestionService {
 private apiUrl = 'http://127.0.0.1:8000/api/questions/';

 // question.service.ts

fetchQuestions() {
  return fetch(this.apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
      // return response.json();
    })
    .then(data => {
      console.log('Fetched questions:', data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error; // Rethrow the error to be caught by the component
    });
}
}

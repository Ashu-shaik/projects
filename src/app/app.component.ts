import { Component } from '@angular/core';
import { BmiService } from './service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <div class="styled-div">
  <h1>Application Development </h1>
  <h1>Team-1 </h1>
  <h1>BMI PREDICTION </h1>
  <h1>Designed and Developed By </h1>
  <p>K.Abhignan-2111CS010004</p>
  <p>K.Abhilash-2111CS010009</p>
  <p>T.Akshay-2111CS010036</p>
  <p>V.BhanuPrakash-2111CS010083</p>
  <p>S.Bharath-2111CS010086</p>
  </div>
    <div>
      <label for="weight">Weight(in lbs):</label>
      <input type="number" [(ngModel)]="weight" name="weight" id="area" />
      
      <label for="height">Height(in cm):</label>
      <input type="number" [(ngModel)]="height" name="height" id="bedrooms" />

      <button (click)="predictBmi()">Predict BMI</button>

      <div *ngIf="result">
        <label>Predicted BMI: {{ roundedBmi }}</label>
        <label>Subscription Continuation: {{ subscriptionContinuation }}</label>

      </div>
      
    </div>
    <section>
    <h1>Diet Plan for Poor Health</h1>
    <p>Due to poor health, it's essential to focus on nutrient-rich foods. Consider the following diet plan:</p>
    <ul>
        <li>Include more fruits and vegetables in each meal.</li>
        <li>Choose whole grains over refined grains.</li>
        <li>Limit processed foods and sugary beverages.</li>
        <!-- Add more specific dietary recommendations as needed -->
    </ul>
</section>

<section>
    <h1>Exercise Plan for Poor Health</h1>
    <p>For individuals with poor health, it's crucial to start with gentle exercises. Consider the following exercise plan:</p>
    <ul>
        <li>Begin with short walks or light stretching exercises.</li>
        <li>Consult with a healthcare professional before starting any new exercise program.</li>
        <li>Gradually increase activity levels based on your comfort and health status.</li>
        <!-- Add more specific exercise recommendations as needed -->
    </ul>
</section>

  `,
  styles: [
    `
    label {
      display: block;
      margin-bottom: 5px; /* Adjust the margin as needed */
      text-align: center;
    }
    
    input, button {
      display: block;
      margin-bottom: 10px; /* Adjust the margin as needed */
      margin: 0 auto; /* Center the input and button horizontally */
    }
    
    button {
      padding: 10px; /* Add padding for a larger clickable area */
      background-color: #4CAF50; /* Green background color, you can customize */
      color: white; /* Text color */
      border: none; /* Remove border */
      border-radius: 5px; /* Add rounded corners */
      cursor: pointer;
      transition: background-color 0.3s, transform 0.3s;
    }
    
    button:hover {
      background-color: #45a049; /* Darker green on hover */
      transform: scale(1.1); /* Scale up on hover for a visual effect */
    }

    .styled-div {
      text-align: center;
      font-family: 'Times New Roman', Times, serif;
  }

  .styled-div h1,.styled-div p {
      color: #333; /* You can customize the color */
  }
  section {
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;
  }
  
  section:hover {
    background-color: #d9f2d9; /* Light green on hover */
  }
  
  /* Health Scale 1 (Poor Health) */
  section:nth-child(1) {
    background-color: #ff6666; /* Red */
  }
  
  /* Health Scale 2 */
  section:nth-child(2) {
    background-color: #ff9933; /* Orange */
  }
  
  /* Health Scale 3 */
  section:nth-child(3) {
    background-color: #ffff66; /* Yellow */
  }
  
  /* Health Scale 4 */
  section:nth-child(4) {
    background-color: #99ff99; /* Light green */
  }
  
  /* Health Scale 5 (Excellent Health) */
  section:nth-child(5) {
    background-color: #66ff66; /* Green */
  }
  
  h1 {
    color: #333;
  }
  
  p {
    color: #555;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 5px;
  }
  
  img {
    width: 100%;
    max-height: 200px;
    border-radius: 5px;
    transition: transform 0.3s;
  }
  
  img:hover {
    transform: scale(1.1);
  }
  
    `,
  ],
})
export class AppComponent {
  weight: number = 0; // Initialize with a default value
  height: number = 0; // Initialize with a default value
  result: any;
  roundedBmi: number =0;
  subscriptionContinuation: string = '';

  constructor(private bmiService: BmiService, private router: Router) {}

  predictBmi() {
    this.bmiService.predictBmi(this.weight, this.height).subscribe((response) => {
      this.result = response;
      this.roundedBmi = Math.min(5, Math.round(Number(this.result.Bmi)));
      if (Number(this.result.Bmi) === 5) {

        this.subscriptionContinuation = 'No';
      } else {

        this.subscriptionContinuation = 'Yes';
      }
    });
  }
  // redirectToComponent() {
  //   window.location.href = '/demo.html';
  //    }
  // }
}
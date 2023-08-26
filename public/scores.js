// const APP_URL = 'https://webapp-final-proj-alonb.vercel.app';
const APP_URL = 'http://localhost:3000';

async function list() {
  // const response = await fetch('https://web-workshop-gules.vercel.app', {method: 'GET'})
  const response = await fetch(`/results`, {method: 'GET'})
  return await response.json()
}

function returnToLoginPage() {
  // Redirect to index.html
  window.location.href = 'index.html';
}

 // Function to populate a table with data
 function populateTable(data, tableId) {
  const table = document.getElementById(tableId);
  const tableBody = table.querySelector('tbody');

  data.forEach(item => {
      const row = tableBody.insertRow();
      const usernameCell = row.insertCell(0);
      const scoreCell = row.insertCell(1);

      usernameCell.textContent = item.userName;

      // Choose the appropriate score property based on data structure
      const scoreProperty = 'beginnerScore' in item
          ? 'beginnerScore'
          : 'intermediateScore' in item
          ? 'intermediateScore'
          : 'expertScore';  // Corrected to check for 'expertScore'
      scoreCell.textContent = item[scoreProperty];
  });
}

document.addEventListener('DOMContentLoaded', async () => {

 const scores = await list();
 const beginners = scores.sort((item1, item2) => item2.beginnerScore - item1.beginnerScore).slice(0,5).map(item => ({userName: item.userName, beginnerScore: item.beginnerScore}));
 const intermediate = scores.sort((item1, item2) => item2.intermediateScore - item1.intermediateScore).slice(0,5).map(item => ({userName: item.userName, intermediateScore: item.intermediateScore}));
 const expert = scores.sort((item1, item2) => item2.expertScore - item1.expertScore).slice(0,5).map(item => ({userName: item.userName, expertScore: item.expertScore}));

 const beginnersAverage = calculateAverage(beginners, 'beginnerScore');
 const intermediateAverage = calculateAverage(intermediate, 'intermediateScore');
 const expertAverage = calculateAverage(expert, 'expertScore');

 console.log("response scores", scores);
 console.log("begginers", beginners);
 console.log("intermediate", intermediate);
 console.log("expert", expert);


// Populate the tables
populateTable(beginners, 'beginnersTable');
populateTable(intermediate, 'intermediateTable');
populateTable(expert, 'expertTable');

  // Display average scores
  displayAverage(beginnersAverage, 'beginnerAverage');
  displayAverage(intermediateAverage, 'intermediateAverage');
  displayAverage(expertAverage, 'expertAverage');

});

function calculateAverage(data, scoreProperty) {
  const filteredData = data.filter(item => item[scoreProperty] > 0);
  const totalScore = filteredData.reduce((sum, item) => sum + item[scoreProperty], 0);
  return filteredData.length > 0 ? totalScore / filteredData.length : 0;
}

function displayAverage(average, averageId) {
  const averageCell = document.getElementById(averageId);
  averageCell.textContent = average.toFixed(2); // Display average with 2 decimal places
}

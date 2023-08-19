const APP_URL = 'http://127.0.0.1:8000';
// const APP_URL = 'http://localhost';
async function createUser(userName) {
    try {
      // const response = await fetch('https://web-workshop-gules.vercel.app', {
      const response = await fetch(`${APP_URL}/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userName})
    })
  
      if (response) {
        console.log('User created successfully');
        return response;
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  }

  async function getScores() {
    try {
      // const response = await fetch('https://web-workshop-gules.vercel.app', {

      const response = await fetch(`${APP_URL}/scores`, {
        method: 'GET',
      });
      return await response.json();
    } catch (error) {
      console.error('An error occurred', error);
    }
  }

  async function list() {
    // const response = await fetch('https://web-workshop-gules.vercel.app', {method: 'GET'})
    const response = await fetch(`${APP_URL}/results`, {method: 'GET'})
    return await response.json()
}

    document.addEventListener('DOMContentLoaded', async () => {

      const scores = await list();
      const beginners = scores.sort((item1, item2) => item2.beginnerScore - item1.beginnerScore).slice(0,5).map(item => ({userName: item.userName, beginnerScore: item.beginnerScore}));
      const intermediate = scores.sort((item1, item2) => item2.intermediateScore - item1.intermediateScore).slice(0,5).map(item => ({userName: item.userName, intermediateScore: item.intermediateScore}));
      const expert = scores.sort((item1, item2) => item2.expertScore - item1.expertScore).slice(0,5).map(item => ({userName: item.userName, expertScore: item.expertScore}));

      console.log("response scores", scores);
      console.log("begginers", beginners);
      console.log("intermediate", intermediate);
      console.log("expert", beginners);

      
      const loginForm = document.getElementById('login-form');

      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const level = document.getElementById('level').value;
        const snakecolor = document.getElementById('snakecolor').value;
        const Foodcolor = document.getElementById('Foodcolor').value;


        const response = await createUser(username);
        let user =  await response.json();
        let bestScore = 0;
        console.log("user", user);
        if (level === 'beginner') {
          bestScore = user.beginnerScore;
        } else if (level === 'intermediate') {
          bestScore = user.intermediateScore;
        } else if (level === 'expert') {
          bestScore = user.expertScore;
        }

        const queryString = `?username=${username}&level=${level}&snakecolor=${snakecolor}&Foodcolor=${Foodcolor}&bestScore=${bestScore}`;
        window.location.href = `game.html${queryString}`;
      });
    });
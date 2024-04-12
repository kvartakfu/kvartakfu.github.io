document.addEventListener('DOMContentLoaded', function() {
    updateAnswer();
    fetchNews().catch(error => {
        console.error('Failed to fetch news:', error);
        document.getElementById('news-list').innerHTML = '<p class="text-danger">שגיאה בקבלת החדשות. האם איראן תוקפים את האתר הזה כרגע?</p>';
    });
});

function updateAnswer() {
    const answers = [
        'עדיין לא. קופסאות טונה כבר יש בממ״ד?',
        'עוד לא. מעשירים אורניום בינתיים',
        'לא. עדיין לא נגמר ספיחס',
        'לא. מחכים שאליהו יוסיאן ינגב חומוס',
        'עדיין לא. אבל איך תתעדכנו כשיפילו את האינטרנט?',
        'עוד לא. אולי זה זמן טוב להכין את מסיכות האב״כ'
    ];
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    setTimeout(() => {
        document.getElementById('answer').innerHTML = `<p>${randomAnswer}</p>`;
    }, 2000);
}

async function fetchNews() {
    const apiURL = 'https://api.webz.io/newsApiLite?token=ccdf7393-4791-4792-8010-d019fe1e74f9&q=iran%20israel';
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error('Network response was not ok.');

    const data = await response.json();
    const articles = data.posts.slice(0, 9); // Fetching 9 articles now
    const newsList = document.getElementById('news-list');

    articles.forEach((article, index) => {
        if (index % 3 === 0 && index !== 0) {
            newsList.innerHTML += '<div class="w-100"></div>'; // Adds a break after every 3 articles
        }
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-4';
        const newsItemDiv = document.createElement('div');
        newsItemDiv.className = 'news-item card';
        newsItemDiv.innerHTML = `
            <img src="${article.thread.main_image}" class="card-img-top" alt="Article Image">
            <div class="card-body">
                <a href="${article.thread.url}" class="stretched-link">${article.thread.title}</a>
            </div>
        `;
        colDiv.appendChild(newsItemDiv);
        newsList.appendChild(colDiv);
    });
}

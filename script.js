// script.js
document.addEventListener('DOMContentLoaded', function() {
    const awardsList = document.getElementById('awards-list');

    fetch('assets/awards.json')
        .then(response => response.json())
        .then(data => {
            data.awards.forEach(award => {
                const awardElement = document.createElement('div');
                awardElement.classList.add('award');
                awardElement.innerHTML = `
                    <h2>${award.title}</h2>
                    <p>${award.description}</p>
                    <p>Year: ${award.year}</p>
                `;
                awardsList.appendChild(awardElement);
            });
        })
        .catch(error => console.error('Error loading awards:', error));
});
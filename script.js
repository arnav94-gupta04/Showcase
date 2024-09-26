const content = [
    "Details of Active MOU"
];

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (query) {
        const filteredContent = content.filter(item => item.toLowerCase().includes(query));

        filteredContent.forEach(item => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.textContent = item;
            resultsContainer.appendChild(div);
        });

        resultsContainer.classList.add('show');
        resultsContainer.classList.remove('hide');
    } else {
        resultsContainer.classList.add('hide');
        resultsContainer.classList.remove('show');
    }
});

// document.getElementById('search-icon').addEventListener('click', search);
// document.getElementById('search').addEventListener('keypress', function(event) {
//     if (event.key === 'Enter') {
//         search();
//     }
// });

// function search() {
//     const query = document.getElementById('search').value.toLowerCase();
//     if (!query) return;

//     const elements = document.body.getElementsByTagName('*');
//     for (let element of elements) {
//         if (element.textContent.toLowerCase().includes(query)) {
//             element.style.backgroundColor = 'yellow';
//         } else {
//             element.style.backgroundColor = '';
//         }
//     }
// }


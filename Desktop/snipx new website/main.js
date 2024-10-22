document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const animateCards = () => {
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (cardPosition < screenPosition) {
                card.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };
    window.addEventListener('scroll', animateCards);
    animateCards();
});

document.addEventListener('DOMContentLoaded', () => {
    const snippetForm = document.getElementById('snippetForm');
    const snippetsList = document.getElementById('snippetsList');
    const privacyToggle = document.getElementById('snippetPrivacy');

    let snippets = JSON.parse(localStorage.getItem('snippets')) || [];

    function renderSnippets() {
        snippetsList.innerHTML = '';
        snippets.forEach((snippet, index) => {
            const snippetElement = document.createElement('div');
            snippetElement.classList.add('snippet-item');
            snippetElement.innerHTML = `
                <h4>${snippet.title}</h4><p><small>${snippet.isPrivate ? 'Private' : 'Public'}</small></p>
                <pre><code>${snippet.code}</code></pre>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteSnippet(${index})">Delete</button>
            `;
            snippetsList.appendChild(snippetElement);
        });
    }

    function addSnippet(e) {
        e.preventDefault();
        const newSnippet = {
            title: document.getElementById('snippetTitle').value,
            code: document.getElementById('snippetCode').value,
            isPrivate: privacyToggle.checked
        };
        snippets.push(newSnippet);
        localStorage.setItem('snippets', JSON.stringify(snippets));
        snippetForm.reset();
        renderSnippets();
    }

    window.deleteSnippet = function(index) {
        snippets.splice(index, 1);
        localStorage.setItem('snippets', JSON.stringify(snippets));
        renderSnippets();
    }

    snippetForm.addEventListener('submit', addSnippet);
    renderSnippets();
});

document.addEventListener('DOMContentLoaded', () => {
    const snippetContainer = document.getElementById('snippetContainer');
    const snippetModal = new bootstrap.Modal(document.getElementById('snippetModal'));
    const snippetCode = document.getElementById('snippetCode');

    const snippets = [
        {
            title: "JavaScript Utility Functions",
            description: "A collection of useful JavaScript utility functions.",
            code: `function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}`
        },
        {
            title: "CSS Flexbox Layout",
            description: "Responsive flexbox layout for modern web design.",
            code: `.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.item {
    flex: 0 1 calc(33.333% - 20px);
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    .item {
        flex: 0 1 calc(50% - 10px);
    }
}

@media (max-width: 480px) {
    .item {
        flex: 0 1 100%;
    }
}`
        },
        {
            title: "Python Data Processing",
            description: "Efficient data processing scripts in Python.",
            code: `import pandas as pd
import numpy as np

def process_data(file_path):
    df = pd.read_csv(file_path)
    df['new_column'] = df['column_a'] + df['column_b']
    df['normalized'] = (df['value'] - df['value'].min()) / (df['value'].max() - df['value'].min())
    result = df.groupby('category').agg({
        'new_column': 'sum',
        'normalized': 'mean'
    })
    return result

if __name__ == "__main__":
    result = process_data('data.csv')
    print(result)`
        }
    ];

    function createSnippetCard(snippet, index) {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${snippet.title}</h5>
                    <p class="card-text">${snippet.description}</p>
                    <button class="btn btn-outline-primary view-snippet" data-index="${index}">View Snippet</button>
                </div>
            </div>
        `;
        return card;
    }

    snippets.forEach((snippet, index) => {
        snippetContainer.appendChild(createSnippetCard(snippet, index));
    });

    snippetContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-snippet')) {
            const index = e.target.getAttribute('data-index');
            const snippet = snippets[index];
            document.getElementById('snippetModalLabel').textContent = snippet.title;
            snippetCode.textContent = snippet.code;
            hljs.highlightElement(snippetCode);
            snippetModal.show();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Handle post submission
    const postForm = document.getElementById('post-form');
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });
            
            if (response.ok) {
                alert('Post added successfully!');
                postForm.reset();
            } else {
                alert('Error adding post.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle dynamic button submission
    const linkForm = document.getElementById('link-form');
    const buttonsContainer = document.getElementById('buttons-container');

    linkForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const label = document.getElementById('label').value;
        const url = document.getElementById('url').value;

        const button = document.createElement('button');
        button.textContent = label;
        button.addEventListener('click', () => {
            window.open(url, '_blank');
        });

        buttonsContainer.appendChild(button);
        linkForm.reset();
    });
});

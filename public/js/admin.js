document.getElementById('addPostForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').value;

    fetch('/add-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, image })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = 'Post added successfully!';
    })
    .catch(error => {
        document.getElementById('message').textContent = 'Error adding post.';
    });
});

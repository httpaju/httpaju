
document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/posts')  // Fetching posts from API
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('posts-container');

            if (posts.length === 0) {
                postsContainer.innerHTML = "<p>No posts available at the moment.</p>";
            } else {
                posts.forEach(post => {
                    const postDiv = document.createElement('div');
                    postDiv.classList.add('post');

                    postDiv.innerHTML = `
                        <h3>${post.title}</h3>
                        <p>${post.content.substring(0, 100)}...</p>
                        <a href="/post/${post._id}">Read more</a>
                    `;
                    postsContainer.appendChild(postDiv);
                });
            }
        })
        .catch(err => {
            console.error("Error fetching posts:", err);
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = "<p>Error loading posts.</p>";
        });
});

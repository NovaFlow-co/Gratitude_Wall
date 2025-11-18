let posts = [];


const modal = document.getElementById('modal');
const floatingBtn = document.getElementById('floatingBtn');
const closeBtn = document.getElementsByClassName('close')[0];


window.onload = function() {
    const saved = localStorage.getItem('posts');
    if (saved) posts = JSON.parse(saved);
    showPosts();
};


floatingBtn.onclick = function() {
    modal.style.display = 'block';
};


closeBtn.onclick = function() {
    modal.style.display = 'none';
};


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};


document.getElementById('postBtn').onclick = function() {
    const text = document.getElementById('input').value;
    if (!text) return;
    
    posts.unshift({
        text: text,
        time: new Date().toLocaleString()
    });
    
    localStorage.setItem('posts', JSON.stringify(posts));
    document.getElementById('input').value = '';
    modal.style.display = 'none'; 
    showPosts();
};


document.getElementById('filter').oninput = function() {
    showPosts();
};


function showPosts() {
    const filterText = document.getElementById('filter').value.toLowerCase();
    const wall = document.getElementById('wall');
    
    const filtered = posts.filter(p => 
        p.text.toLowerCase().includes(filterText)
    );
    
    if (filtered.length === 0) {
        wall.innerHTML = '<p style="text-align:center; color:#999;">No posts yet!</p>';
        return;
    }
 wall.innerHTML = filtered.map((p, index) => `
        <div class="post">
            <button class="delete-btn" onclick="deletePost(${index})">×</button>
            <div class="post-text">${p.text}</div>
            <div class="post-time">${p.time}</div>
        </div>
    `).join('');
}


function deletePost(index) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    showPosts();
}
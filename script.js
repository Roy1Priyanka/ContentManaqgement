function submitForm() {
  const titleElem = document.getElementById('title');
  const contentElem = document.getElementById('content');
  const categoryElem = document.getElementById('category');
  const imageElem = document.getElementById('image');
  const videoElem = document.getElementById('video');
  const dataSection = document.getElementById('dataSection');

  if (!titleElem.value.trim() || !contentElem.value.trim()) {
    alert("Title and Content cannot be empty!");
    return;
  }

  const contentCard = document.createElement('div');
  contentCard.className = 'content-card';

  const h3 = document.createElement('h3');
  h3.textContent = titleElem.value;
  contentCard.appendChild(h3);

  const timestamp = document.createElement('p');
  timestamp.className = 'timestamp';
  timestamp.textContent = "Posted on: " + new Date().toLocaleString();
  contentCard.appendChild(timestamp);

  if (categoryElem.value) {
    const categoryTag = document.createElement('span');
    categoryTag.className = 'category-tag';
    categoryTag.textContent = categoryElem.value;
    contentCard.appendChild(categoryTag);
  }

  const p = document.createElement('p');
  p.textContent = contentElem.value;
  contentCard.appendChild(p);

  if (imageElem.files[0]) {
    const file = imageElem.files[0];
    const imageURL = URL.createObjectURL(file);

    const img = document.createElement('img');
    img.src = imageURL;
    img.alt = 'Uploaded Image';
    img.className = 'uploaded-content';
    contentCard.appendChild(img);
  }

  if (videoElem.files[0]) {
    const file = videoElem.files[0];
    const videoURL = URL.createObjectURL(file);

    const vid = document.createElement('video');
    vid.src = videoURL;
    vid.controls = true;
    vid.autoplay = true;
    vid.className = 'uploaded-content';
    contentCard.appendChild(vid);
  }

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.onclick = () => {
    titleElem.value = h3.textContent;
    contentElem.value = p.textContent;
    categoryElem.value = categoryTag ? categoryTag.textContent : '';
    contentCard.remove();
    saveToLocalStorage();
  };
  contentCard.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => {
    contentCard.remove();
    saveToLocalStorage();
  };
  contentCard.appendChild(deleteBtn);

  dataSection.appendChild(contentCard);
  saveToLocalStorage();

  // Clear form
  titleElem.value = '';
  contentElem.value = '';
  categoryElem.value = '';
  imageElem.value = '';
  videoElem.value = '';
}

function saveToLocalStorage() {
  localStorage.setItem("entries", document.getElementById('dataSection').innerHTML);
}

window.onload = function () {
  const saved = localStorage.getItem("entries");
  if (saved) {
    document.getElementById('dataSection').innerHTML = saved;

    const deleteBtns = document.querySelectorAll('.content-card button:nth-of-type(2)');
    const editBtns = document.querySelectorAll('.content-card button:nth-of-type(1)');

    deleteBtns.forEach(btn => {
      btn.onclick = () => {
        btn.parentElement.remove();
        saveToLocalStorage();
      };
    });

    editBtns.forEach(btn => {
      btn.onclick = () => {
        const card = btn.parentElement;
        document.getElementById('title').value = card.querySelector('h3').textContent;
        document.getElementById('content').value = card.querySelectorAll('p')[1].textContent;
        const categoryEl = card.querySelector('.category-tag');
        document.getElementById('category').value = categoryEl ? categoryEl.textContent : '';
        card.remove();
        saveToLocalStorage();
      };
    });
  }
};

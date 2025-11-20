const API_URL = "https://691e982cbb52a1db22be5c48.mockapi.io/Reviewkuliner";

async function loadReviews() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const list = document.getElementById("reviews-list");
    list.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "review-card";
        div.innerHTML = `
            <strong>${item.name}</strong> • ${item.food}
            <p>${item.review}</p>
        `;
        list.appendChild(div);
    });
}

async function addReview() {
    const name = document.getElementById("name").value;
    const food = document.getElementById("food").value;
    const review = document.getElementById("review").value;

    if (!name || !food || !review) {
        alert("Isi semua kolom!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, food, review })
    });

    document.getElementById("name").value = "";
    document.getElementById("food").value = "";
    document.getElementById("review").value = "";

    loadReviews();
}

loadReviews();

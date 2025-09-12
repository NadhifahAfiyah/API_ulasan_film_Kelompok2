const ekspress = require('express');
const app = ekspress();
const port = 3300;

app.use(ekspress.json());

// Data Ulasan Sementara
let reviews = [
    {
        id: 1,
        film_id: "2baf70d1-42bb-4437-b551-e5fed5a87abe", //spririted away
        user: "Andi",
        rating: 5,
        comment: "Film animasi terbaik sepanjang masa!."
    }
]

//endorpoint dasar
app.get('/', (req, res) => {
    res.send('Selamat datang di API Ulasan Film!');
});

app.get('/status', (req, res) => {
    res.json({status: "API berjalan dengan baik"});
});

app.get('/reviews', (req, res) => {
    res.json(reviews);
});

app.get('/reviews/:id', (req, res) => {
    const Review = reviews.find(r => r.id === parseInt(req.params.id));
    if (!Review) {
        return res.status(404).json({error: "Ulasan tidak ditemukan"});
    }
    res.json(Review);
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
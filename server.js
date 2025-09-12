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
    },  

    {
        id: 2,
        film_id: "67405111-37a5-438f-81cc-4666af60c800", // The wind rises
        user: "Dian",
        rating: 4,
        comment: "Cerita yang menginspirasi dan visual yang menakjubkan."
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

// post reviews
app.post('/reviews', (req, res) => {
    const {film_id, user, rating, comment} = req.body;
    if (!film_id || !user || !rating || !comment) {
        return res.status(400).json({error: "Data tidak lengkap"});
    }
    const newReview = {
        id: reviews.length + 1, film_id, user, rating, comment
    };
    reviews.push(newReview);
    res.status(201).json(newReview);
});

//put reviews
app.put('/reviews/:id', (req, res) => {
    const review = reviews.find(r => r.id === parseInt(req.params.id)); 
    if (!review) {
        return res.status(404).json({error: "Review tidak ditemukan"});
    }
    const {film_id, user, rating, comment} = req.body;
    if (!film_id || !user || !rating || !comment) {
        return res.status(400).json({error: "Data tidak lengkap"});
    }
    review.film_id = film_id;
    review.user = user;
    review.rating = rating;
    review.comment = comment;
    res.json(review);
});

//delete reviews
app.delete('/reviews/:id', (req, res) => {
    const reviewIndex = reviews.findIndex(r => r.id === parseInt(req.params.id));
    if (reviewIndex === -1) {
        return res.status(404).json({error: "Review tidak ditemukan"});
    }
    reviews.splice(reviewIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
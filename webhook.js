import express from 'express';

const app = express();
const PORT = 80;
app.use(express.json());
// dit is geen Github secret
// deze code runt normaal op een andere machine dan de workflow
const VALID_SECRET = 'Y0uR5ecr3t';

app.post('/webhook', (req, res) => {
    const auth_header = req.headers.authorization;
    if (auth_header && auth_header.startsWith("Bearer ")) {
        const token = auth_header.substring(7);
        if (token) {
            console.log('Received valid webhook:');
            res.status(200).send('Webhook processed successfully!');
        } else {
            console.log("Received invalid webhook: token too short.");
            res.status(400).send('Webhook not processed');
        }
    }
    else {
        console.log("Invalid bearer token.")
    }

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

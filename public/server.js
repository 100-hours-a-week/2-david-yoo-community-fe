import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// __dirname 대체 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// public 폴더를 정적 파일 제공 경로로 설정
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'login.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'login.html'));
});

app.get('/posts.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'posts.html'));
});

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'signup.html'));
});

app.get('/change-password.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'change-password.html'));
});

app.get('/create-post.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'create-post.html'));
});

app.get('/edit-post.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'edit-post.html'));
});

app.get('/edit-profile.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'edit-profile.html'));
});

app.get('/post-detail.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'post-detail.html'));
});


// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});

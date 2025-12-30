const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const woodDisplay = document.getElementById('wood-count');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Estado do Jogo
let player = { x: canvas.width/2, y: canvas.height/2, size: 30, wood: 0 };
let trees = [];
let buildings = [];
let night = false;

// Criar Árvores Iniciais
for(let i=0; i<10; i++) {
    trees.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height });
}

// Loop Principal
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar Grama (Fundo)
    ctx.fillStyle = night ? '#1a2e1a' : '#2d5a27';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar Árvores
    ctx.fillStyle = '#228B22';
    trees.forEach(tree => {
        ctx.fillRect(tree.x, tree.y, 25, 40); // Tronco e folhas simplificados
    });

    // Desenhar Construções (Base)
    ctx.fillStyle = '#8B4513';
    buildings.forEach(b => {
        ctx.fillRect(b.x, b.y, 40, 40);
    });

    // Desenhar Jogador
    ctx.fillStyle = '#4a90e2'; // Azul claro tipo Stardew
    ctx.fillRect(player.x, player.y, player.size, player.size);

    requestAnimationFrame(update);
}

// Lógica de Movimento por Toque (Simplificada)
window.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    // Se tocar na metade direita, o player vai para lá
    if(touch.clientX > canvas.width / 2) player.x += 10;
    else player.x -= 10;
    
    // Checar se encostou em árvore para coletar
    trees = trees.filter(tree => {
        let dist = Math.hypot(player.x - tree.x, player.y - tree.y);
        if(dist < 40) {
            player.wood += 1;
            woodDisplay.innerText = player.wood;
            return false; // Remove a árvore
        }
        return true;
    });
});

// Botão de Construir
document.getElementById('build-btn').addEventListener('click', () => {
    if(player.wood >= 5) {
        player.wood -= 5;
        woodDisplay.innerText = player.wood;
        buildings.push({ x: player.x, y: player.y });
        alert("Parede construída!");
    } else {
        alert("Madeira insuficiente!");
    }
});

update();

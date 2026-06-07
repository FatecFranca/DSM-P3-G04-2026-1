window.addEventListener('load', () => {
    carregarEventos();
});

function carregarEventos() {
    fetch("/events")
        .then(r => r.json())
        .then(data => {
            const lista = document.getElementById("lista-eventos");
            if (!data.ok || !data.eventos) return lista.innerHTML = "<p>Nenhum rolê encontrado.</p>";
            
            const meuId = data.meuId.toString();
            lista.innerHTML = "";

            data.eventos.forEach(ev => {
                const card = document.createElement("div");
                card.classList.add("card-role");

                // Verificação segura dos convidados
                const convidados = ev.convidados || [];
                const convitePendente = convidados.some(id => id.toString() === meuId);

                card.innerHTML = `
                    <div class="card-header ${convitePendente ? 'convite-destaque' : ''}">
                        <span>${ev.nomeEvento} ${convitePendente ? '<b style="color:var(--purple-200)"> (NOVO CONVITE)</b>' : ''}</span>
                        <span class="seta-icon">▼</span>
                    </div>
                    <div class="card-body" style="display:none;"></div>
                `;

                const header = card.querySelector(".card-header");
                const body = card.querySelector(".card-body");

                header.onclick = () => {
                    const estaAberto = card.classList.contains("aberto");
                    document.querySelectorAll(".card-role").forEach(c => {
                        c.classList.remove("aberto");
                        c.querySelector(".card-body").style.display = "none";
                    });

                    if (!estaAberto) {
                        card.classList.add("aberto");
                        body.style.display = "block";
                        renderizarDetalhes(ev, body, ev.fk_idUsuario.toString() === meuId, convitePendente);
                    }
                };
                lista.appendChild(card);
            });
        });
}

function renderizarDetalhes(ev, container, souDono, convitePendente) {
    container.innerHTML = "<p>Buscando detalhes...</p>";

    fetch(`/events/${ev._id}`)
        .then(r => r.json())
        .then(data => {
            if (!data.ok) return container.innerHTML = "<p>Erro ao carregar detalhes.</p>";

            const e = data.evento;
            const v = data.valorTotal || 0;
            
            // Tratamento de Data
            const dataObj = new Date(e.dataEvento);
            const dataFmt = e.dataEvento ? dataObj.toLocaleDateString('pt-BR') : "Data não informada";
            const horaFmt = e.dataEvento ? dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : "--:--";

            // Listas
            const confirmados = e.confirmados || [];
            const convidados = e.convidados || [];
            
            // HTML dos Participantes
            let htmlParticipantes = "";
            const todos = [e.fk_idUsuario, ...confirmados, ...convidados];
            
            // Remove duplicatas se houver
            const uniqueParticipantes = [...new Map(todos.filter(p => p).map(p => [p._id, p])).values()];

            uniqueParticipantes.forEach(p => {
                const isDono = p._id === e.fk_idUsuario._id;
                const isPendente = convidados.some(c => c._id === p._id);
                const valorSalvo = (e.divisaoManual && e.divisaoManual.find(d => d.usuarioId === p._id)?.valor) || (v / (confirmados.length + 1 || 1));

                htmlParticipantes += `
                    <div class="pagador-row" style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.05); padding:8px; border-radius:6px; margin-bottom:5px;">
                        <div>
                            <span style="font-weight:600;">${p.Nick || 'Usuário'}</span>
                            ${isDono ? '<span title="Organizador"> 👑</span>' : ''}
                            ${isPendente ? '<small style="color:#aaa;"> (Pendente)</small>' : ' ✅'}
                        </div>
                        ${souDono 
                            ? `<input type="number" class="input-divisao" data-id="${p._id}" value="${valorSalvo.toFixed(2)}" style="width:70px; background:#000; color:#fff; border:1px solid #444; border-radius:4px; text-align:center;">`
                            : `<strong>R$ ${valorSalvo.toFixed(2)}</strong>`
                        }
                    </div>
                `;
            });

            // HTML Final do Card Expandido
            container.innerHTML = `
                <div class="info-expandida" style="border-bottom:1px solid #333; padding-bottom:15px; margin-bottom:15px;">
                    <p><strong>📍 Local:</strong> ${e.localEvento || 'Local não definido'}</p>
                    <p><strong>📅 Data:</strong> ${dataFmt} às ${horaFmt}</p>
                    <p><strong>👥 Capacidade:</strong> ${e.QuantParticipantes} pessoas</p>
                    <p><strong>💰 Valor Total:</strong> R$ ${v.toFixed(2)}</p>
                </div>

                <div class="sessao-divisao">
                    <h4 style="margin-bottom:10px; color:#c084fc;">👥 Lista de Presença e Custos</h4>
                    ${htmlParticipantes}
                    
                    ${souDono ? `
                        <div id="status-soma-${ev._id}" style="margin-top:10px; font-size:0.8rem;"></div>
                        <button onclick="salvarDivisao('${ev._id}')" class="btn-salvar-divisao" style="width:100%; margin-top:10px; padding:8px;">Salvar Divisão</button>
                        <button onclick="abrirSeletorAmigos('${ev._id}')" class="btn-convidar-mais" style="width:100%; margin-top:10px; padding:8px;">+ Convidar Amigos</button>
                    ` : ''}
                </div>

                <div style="margin-top: 20px; border-top: 1px solid #333; padding-top:15px; display:flex; justify-content:space-between;">
                    ${souDono ? `<button onclick="excluirRole('${ev._id}')" class="btn-excluir" style="color:#ff6b6b; background:none; border:none; cursor:pointer;">Cancelar Rolê</button>` : ''}
                    <div>
                        ${convitePendente ? `
                            <button onclick="responderConvite('${ev._id}', 'aceitar')" class="btn-aceitar" style="padding:6px 12px; cursor:pointer;">Aceitar</button>
                            <button onclick="responderConvite('${ev._id}', 'recusar')" class="btn-recusar" style="padding:6px 12px; cursor:pointer;">Recusar</button>
                        ` : ''}
                    </div>
                </div>
            `;
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "<p>Erro ao carregar detalhes.</p>";
        });
}

// Renomeei para responderConvite para evitar conflito com o nome antigo
function responderConvite(id, acao) {
    fetch('/events/responder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idEvento: id, acao })
    })
    .then(r => r.json())
    .then(data => {
        if (data.ok) {
            alert("Ação realizada!");
            carregarEventos();
        }
    });
}

function salvarDivisao(idEvento) {
    const inputs = document.querySelectorAll('.input-divisao');
    const distribuicao = Array.from(inputs).map(i => ({ usuarioId: i.dataset.id, valor: parseFloat(i.value) || 0 }));
    fetch('/events/divisao-manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idEvento, distribuicao })
    }).then(r => r.json()).then(d => d.ok ? alert("Salvo!") : alert("Erro"));
}
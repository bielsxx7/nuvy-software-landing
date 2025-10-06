


document.addEventListener('DOMContentLoaded', function() {


    const botaoMenuMobile = document.querySelector('.botao-menu-mobile');
    const menuNavegacao = document.querySelector('.menu-navegacao');

    if (botaoMenuMobile && menuNavegacao) {
        botaoMenuMobile.addEventListener('click', () => {
            menuNavegacao.classList.toggle('ativo');
        });
    }



    const botoesAba = document.querySelectorAll('.aba-servico');
    const paineisAba = document.querySelectorAll('.painel-aba');

    if (botoesAba.length > 0 && paineisAba.length > 0) {
        botoesAba.forEach(botao => {
            botao.addEventListener('click', () => {
                const abaAlvoId = botao.dataset.aba;
                const abaAlvoPainel = document.getElementById(abaAlvoId);

                botoesAba.forEach(b => b.classList.remove('ativo'));
                paineisAba.forEach(p => p.classList.remove('ativo'));

                botao.classList.add('ativo');
                if (abaAlvoPainel) {
                    abaAlvoPainel.classList.add('ativo');
                }
            });
        });
    }

    const secaoNumeros = document.querySelector('.secao-numeros');

    const animarContadores = () => {
        const contadores = document.querySelectorAll('.contador');

        contadores.forEach(contador => {
            const numeroAlvo = parseInt(contador.textContent.replace(/[+R$. ]/g, ''));
            let contagemAtual = 0;
            const incremento = numeroAlvo / (duracao / 16); 

            const atualizarContagem = () => {
                contagemAtual += incremento;
                if (contagemAtual < numeroAlvo) {
                    let texto = Math.ceil(contagemAtual).toLocaleString('pt-BR');
                    
                    if (contador.textContent.includes('+')) texto = '+' + texto;
                    if (contador.textContent.includes('R$')) texto = '+R$ ' + texto;

                    contador.textContent = texto;
                    requestAnimationFrame(atualizarContagem);
                } else {
                    let textoFinal = numeroAlvo.toLocaleString('pt-BR');
                    if (contador.textContent.includes('+')) textoFinal = '+' + textoFinal;
                    if (contador.textContent.includes('R$')) textoFinal = '+R$ ' + textoFinal;
                    if (contador.textContent.includes('%')) textoFinal = numeroAlvo + '%';
                    
                    contador.textContent = textoFinal;
                }
            };
            requestAnimationFrame(atualizarContagem);
        });
    };

    const observerNumeros = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContadores(); 
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 
    });

    if (secaoNumeros) {
        observerNumeros.observe(secaoNumeros);
    }


    const cabecalho = document.querySelector('.cabecalho');
    
    if (cabecalho) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) { 
                cabecalho.classList.add('rolando');
            } else {
                cabecalho.classList.remove('rolando');
            }
        });
    }



    try {
        feather.replace();
    } catch (e) {
        console.error("Feather Icons não pôde ser inicializado.", e);
    }

});
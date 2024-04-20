const { createApp } = Vue;

createApp({
    data() {
        return {
            heroi: { vida: 100 }, // variavel de vida do heroi
            vilao: { vida: 100, imagem: 'img/gengar.png' }, //variavel de vida do vilao
            podeAtacar: true, // variavel para cooldown do ataque.
            podeCurar: true, // variável para cooldown da cura.
            mensagemAcao: [] // vetor para historico de açoes do jogo.
        };
    },

//---------------------------------------------------------------------------------------------------------------------------------------//
    
    methods: {

        atacar(isHeroi) { // metodo para atacar (funciona tanto para o jogador quanto para o inimigo.)
            if (isHeroi && this.podeAtacar) {
                this.acaoVilao(); // passa a vez para o vilao
                this.vilao.vida -= Math.floor(Math.random() * 10) + 2; // cria um dano aleatorio de 1 a 12
                this.mensagemAcao.push("Pikachu atacou"); // mensagem no historico
            } else {
                this.heroi.vida -= Math.floor(Math.random() * 10) + 2; //cria um dano aleatorio de 1 a 25
                this.mensagemAcao.push("Gengar atacou"); // mensagem no historico
            }   
            this.podeAtacar = false; // variavel para ativar o cooldown do ataque
            setTimeout(() => { //cooldown propriamente dito
                this.podeAtacar = true;
            },  550);
            this.verificarFimDeJogo(); // verifica se a vida do pikachu ou do gengar é = 0
        },

//---------------------------------------------------------------------------------------------------------------------------------------//

        defender(isHeroi){ // metodo para defender 
            if (isHeroi){
                this.acaoVilao(); // passa para o vilão
                this.heroi.vida -= 5; // tira somente 5 de vida.
                this.mensagemAcao.push("Pikachu Defendeu.") // mensagem para o historico
            }

            else{
                this.vilao.vida -= 5; // tira somente 5 de vida
                this.mensagemAcao.push("Gengar Defendeu.") // mensagem para o historico
            }
        },

//---------------------------------------------------------------------------------------------------------------------------------------//

        usarPocao(isHeroi) { // metodo para curar.
            if (isHeroi && this.podeCurar) {
                this.heroi.vida += 10;  // recupera 10 de vida.
                if (this.heroi.vida > 100){ // função para que a vida não passe de 100.
                    this.heroi.vida = 100;} 
                this.mensagemAcao.push("Pikachu se curou."); //mensagem para o historico
                this.podeCurar = false; // cooldown da cura (funciona da mesma maneira do ataque.)
                setTimeout(() => { // cooldown
                    this.podeCurar = true;
                }, 850);
                this.acaoVilao(); //passa a ação para o vilão
            }
            else{
                this.vilao.vida += 10; // cura 10 de vida do vilão
                if(this.vilao.vida >= 100){ // verifica se a vida do vilão é == 100
                    this.vilao.vida = 100 // não cura mais que 100 de vida
                }
                this.mensagemAcao.push("Gengar se curou"); // mensagem para o historico
            }

//---------------------------------------------------------------------------------------------------------------------------------------//

        },
        correr(isHeroi) { // metódo para correr
            if(isHeroi){ 
                alert("Pikachu fugiu, Gengar ganha a partida!"); // abre o alerta no proprio navegador, para o fim do jogo.
                location.reload(); // botão para recarregar a página
            }
            else{ //Tirei esta funcionalidade do vilão pela recorrente fuga dele
                alert("Gengar fugiu, Pikachu ganha a partida!");
                location.reload(); 
            }
            },

//---------------------------------------------------------------------------------------------------------------------------------------//

        verificarFimDeJogo() { // metódo para o verificar o final do jogo. 
            if (this.vilao.vida <= 0) { 
                this.vilao.vida = 0; // função para que a vida nao fique abaixo de 0
                alert("Gengar foi derrotado, Pikachu ganha a partida!"); // abre um alerta no proprio navegador, para sinalizar o fim do jogo.
                location.reload(); // botão para reiniciar a pagina, reiniciando o jogo.
            } else if (this.heroi.vida <= 0) {  // função para que a vida do heroi não fique menor que 0
                this.heroi.vida = 0; 
                alert("Pikachu foi derrotado, Gengar ganha a partida!"); // abre um alerta no proprio navegador, para sinalizar o fim do jogo.
                location.reload();
            }
            if(this.vilao.vida <= 40){
                    this.vilao.imagem = 'img/Gengarderrotado2.png'; // para trocar o sprite do Gengar.
            }
        },
        
//---------------------------------------------------------------------------------------------------------------------------------------//

        acaoVilao(){
            const acoes = ['atacar', 'atacar', 'atacar', 'atacar', 'atacar', // probabilidade de ocorrer a ação 50%
            'defender', 'defender', // 20%
            'usarPocao', 'usarPocao', 'usarPocao', // 30%
            ];

            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)]; //aleatorizar a variavel do vetor.
            this[acaoAleatoria](false);
            }
    }

//---------------------------------------------------------------------------------------------------------------------------------------//

}).mount('#app');
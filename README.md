# re-transmissão de canal IPTV
#### Script simples de exemplo que recebe o sinal de um canal iptv e retransmite ele via websocket para que outro servidor faça a replicação da stream para multiplos players via HTTP

### Qual a motivação para criar esse script?
 - estava eu assistindo iptv e me veio a mente que era chato não poder compartilhar um canal iptv pra outras pessoas usando o meu login
 - então criei esse script na tentativa de replicar o sinal de um canal que gosto para multiplos players

### Porque usar 2 scripts (client e server) ao invés de embutir tudo em um unico script?
 - Minha ideia inicial era usar um unico script que rodasse no servidor. esse script iria fazer o request do canal iptv, e retransmitir ele para os players que solicitassem. Porém em meus testes, percebi que os servidores de IPTV bloqueiam requisições vindas de IPs gringos, ou de IPs atrelados a VPS/Cloud. Então a minha solução foi desmebrar o script em 2, assim o client faz o request do sinal iptv direto da minha internet domestica e retransmite essa stream para o script servidor rodando em uma vps qualquer. Dessa forma o servidor se encarrega de replicar o sinal para os players.

### Quais outras aplicações desse projeto?
 - transmitir a imagem de uma camera IP local para um servidor em nuvem e posteriormente essa imagem ser acessada por multiplos players ou mesmo para que um computador remoto receba a stream e armazene em arquivos.
 - transmitir arquivos grandes via websocket para multiplos computadores em rede (necessita adaptações maiores)
 - transmitir um filme hospedado online para varios usuarios (necessita adaptações)

### O que esse projeto NÃO FAZ?
 - esse projeto não converte a stream em video diretamente
 - esse projeto não pirateia sinal de TV
 - esse projeto não é para transmissão de video, apesar de ser possivel fazer isso.
 - **A unica coisa que esse projeto faz é receber os dados de uma fonte HTTP e retransmitir ela para outro servidor e posteriormente para outros clientes**

### Esquema visual de funcionamento
//imagem//

### Em funcionamento compartilhando o canal IPTV
//imagem//

**Esse projeto não incentiva pirataria! é APENAS para fins didáticos e de aprendizado sobre streams, websocket e transmissões http**
 *Desenvolvido com Node.JS*

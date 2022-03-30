# Letmeask
> Fabricio / Rockeseat project

###### Proposta: ambiente de Q&A entre diferentes pessoas, em uma interface simples e agradavél, utilizando atualizações em tempo-real sem nenhuma interferencia. 

###### 29/03/22

<hr>

### Linguagens e tecnologias:

<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"  width="60" height="60"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"  width="60" height="60"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain-wordmark.svg"  width="60" height="60"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg"  width="60" height="60"/>
</div>


<hr>
  
### Imagens do website

<div>
  <img src="https://i.imgur.com/NQBdwPC.png" />
  <img src="https://i.imgur.com/mArfe6G.png" />
  <img src="https://i.imgur.com/xFj1pZ9.png" />
  <img src="https://i.imgur.com/KcSm21a.png" />
  <img src="https://i.imgur.com/Zc80YyF.png" />
  <img src="https://i.imgur.com/NbuDjEY.png" />
  <img src="https://i.imgur.com/oLh6B56.png" />
</div>

<hr>

### Como usar:

- Recolha os arquivos listados nesse repositório.
- Na devida pasta do projeto, adicione o "node_modules", utilizando: 
```console
  npm i
```
- Espere todo o conteudo do "node_modules" carregar.
- Após isso, crie uma conta no firebase e um projeto, dentro do projeto acione Autenticação(google) e Realtime database.
- Coloque as suas "chaves" do firebase no arquivo firebase.ts localizado em : "/src/services"
```typescript
  // Exemplo:

  const firebaseConfig = {
  apiKey: 72DFA7FAWD,
  authDomain: DWA8JDWA8IWDA90,
  databaseURL: PWA8DMWA8DWA,
  projectId: UWA8DWJAIDWA9,
  storageBucket: DAW8UWDA8DWAJ,
  messagingSenderId: 9IKW9DWADWAGHH,
  appId: 84N49SKA
};
```
- Coloque as rules(regras) para o realtime database, exatamente como mostrado abaixo:
```javascript
  {
  "rules": {
    "rooms": {
			".read": false,
			".write": "auth != null",
			"$roomId": {
				".read": true,
				".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
				"questions": {
					".read": true,
					".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)",
					"likes": {
						".read": true,
						".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
					}
				}
			}
		}
  }
}
```
- Finalizando tudo, agora é simples, basta iniciar o localhost para teste: podendo utilizar npm e yarn.
```console
  npm start
```
```console
  yarn start
```

> Dev-Fabricio

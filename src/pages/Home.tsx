import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button';



import '../styles/auth.scss'

import { useAuth } from './../hooks/useAuth';


export function Home(){
    const history = useHistory() // tudo que tiver user é um hook! precisa esta exatamento dentro do componente
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom(){
        if(!user) {
            await signInWithGoogle()
        }
        history.push('/rooms/news')
    }
    async function handleJoinRoom(event: FormEvent){
        event.preventDefault()
        if(roomCode.trim() === '') {
            return // --> return para que nada seja executado caso não tenha nada no input room code.
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get() // .get() busca todos os dados dessa room.
        // --> Para verificar se na rooms/ (do database) existe alguma sala com esse código.

        if(!roomRef.exists()) {
            alert('Esse código não está assocido a uma sala existente!')
            return;
        }

        history.push(`/rooms/${roomCode}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="letmeask logo" />
                    <button className='create-room' onClick={handleCreateRoom} >
                        <img src={googleIconImg} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text"
                        placeholder="digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />
                        <Button>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
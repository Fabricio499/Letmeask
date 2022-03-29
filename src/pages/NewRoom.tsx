import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { database } from '../services/firebase'
// import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useAuth } from './../hooks/useAuth';

export function NewRoom(){
    const { user } = useAuth()
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault() // --> vai prefinir a ação de reload após dar o submite no form.
        if(newRoom.trim() === ''){ // Pra saber se newRoom foi feito como uma string e .trim retira os espaços.
            return;
        }
        const roomRef = database.ref('rooms') // No banco de dados vai existe uma categoria chamada rooms

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,

        })

        history.push(`/rooms/${firebaseRoom.key}`) // key é o Id da sala segundo do firebase (observavel na web)
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                        type="text"
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)} // Para atribuir o nome da nova Sala.
                        // --> não precisa typar o event acima pois já fazemos eles no estilo de uma function
                        // --> no caso da function da propiedade FormEvent do react
                        value={newRoom}
                        />
                        <Button>
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}
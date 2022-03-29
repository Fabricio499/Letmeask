import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { database } from '../services/firebase'
import '../styles/room.scss'
import { useAuth } from './../hooks/useAuth';


type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth()
    const params = useParams<RoomParams>()  // Copiar o url da pagina, assim pegar o link ( no caso o codigo )
    const [newQuestion, setNewQuestion] = useState('')

    const roomId = params.id
 
    async function handleSendQuestion(event: FormEvent){
        event.preventDefault()

        if(newQuestion.trim() === '') {
            return;
        }

        if(!user) {
            throw new Error('Você precisa está logado para concluir esta ação!')
        }
        
        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false,
         }

         await database.ref(`rooms/${roomId}/questions`).push(question)
         setNewQuestion('')
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg}/>
                    <RoomCode code={roomId} />
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala Teste</h1>
                    <span>0 perguntas</span>
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea
                    placeholder='O que você quer perguntar?' 
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion} 
                    />
                    <div className='form-footer'>
                        { user ? (
                            <div className='user-info'>
                                <img src={user.avatar} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        )}
                        <Button type='submit' disabled={!user}>
                            Enviar pergunta
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    )
}
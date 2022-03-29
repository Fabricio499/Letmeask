import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import '../styles/room.scss'
import { useAuth } from './../hooks/useAuth';


type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const { user } = useAuth()
    const params = useParams<RoomParams>()  // Copiar o url da pagina, assim pegar o link ( no caso o codigo )
    const roomId = params.id
 
    const  { questions, title } = useRoom(roomId)

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg}/>
                        <div>
                            <RoomCode code={roomId} />
                            <Button isOutlined>Encerrar sala</Button>
                        </div>
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question 
                                key={question.id}  // Forma do react diferenciar uma pergunta da outra
                                content={question.content}
                                author={question.author}
                            />
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
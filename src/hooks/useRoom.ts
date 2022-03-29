import { useState, useEffect } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;

    }>;
}>

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean; 
    likeCount: number;
    hasLiked: boolean;
}

export function useRoom(roomId: string){
    const { user } = useAuth()
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        
        const roomRef = database.ref(`/rooms/${roomId}`)
    
        roomRef.on('value', room => {  // Tecnica de ouvir o evento segundo a documentação do firebase
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}
            
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id),
                }
            }) //Retorna valor de questions em vetores
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
            return() => {
                roomRef.off('value')
            }

        }, [roomId, user?.id])  // --> sempre que roomId mudar será executado o useEffect()

        return{ questions, title } 
}
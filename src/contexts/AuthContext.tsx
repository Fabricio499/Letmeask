
import { createContext, ReactNode, useState, useEffect } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
  
  }

  type AuthContextProviderProps = {
    children: ReactNode;
  }

export const AuthContext = createContext({} as AuthContextType)  // Objeto vazio


export function AuthContextProvider(props: AuthContextProviderProps){

    const [user, setUser] = useState<User>()  // o tipo do User << é User feito a tipagem acima.

  useEffect(() => { // Ação para saber se já existia um login para aquele usuario
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        const { displayName, photoURL, uid } = user

          if(!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.')
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
      }
    })

    return () => {
      unsubscribe(); // Para deixar de dar o useEffect quando acontecer a primeira vez
    }
  }, [])

    async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

        if(result.user) { // se a autenticação tiver um usuário, ou seja irá da true.
          const { displayName, photoURL, uid } = result.user

          if(!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.')
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        } 
  }

    return(
        <AuthContext.Provider value={{ user, signInWithGoogle }}> 
            {props.children}
        </AuthContext.Provider>
    )
}
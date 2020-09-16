import React, { useCallback, useState } from 'react';
import api from '../services/api';

interface GithubUser {
    id: number;
    avatar_url: string;
    name: string;
    public_repos: number;
}

const User:React.FC = () => {
    const [user, setUser] = useState("");
    const [error, setError] = useState(false);
    const [info, setInfo] = useState<GithubUser>();
    

    const handleSubmit = useCallback(async()=>{
       
       try {
        const response = await api.get<GithubUser>(`/users/${user}`);
        setInfo(response.data);
       }
       catch(err) {
           setError(state=> !state);
       }finally {
           setUser("");
       }
    },[user])

    return (
    <>
        <input type="text" placeholder="Digite seu usuário no github" value={user} onChange={e => setUser(e.target.value)}></input>
        <button type="button" onClick={handleSubmit}>Enviar</button>

        {info && (
            <div>
            <h1>{info.name}</h1>
            <img src={info.avatar_url} alt={info.name}></img>

            <p>Repositórios públicos: {info.public_repos}</p>
            </div>
        )}
    </>
        );

}

export default User;
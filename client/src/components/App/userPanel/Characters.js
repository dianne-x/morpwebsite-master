import {useState, useEffect} from "react";
import '../../../style/App/userPanel/characters.scss';
import ServerCharacterContainer from "./ServerCharacterContainer";

const Characters = () => {

    const [servers, setServers] = useState([]);
    var userId = localStorage.getItem('morp-login-user');
    
    useEffect(() => {
        // Fetch the joined servers from the backend
        const fetchJoinedServers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/getJoinedServers.php?userId=${userId}`); // Update with your actual API endpoint
                const data = await response.json();
                if (data.success) {
                setServers(data.servers);
                } else {
                console.error('Failed to fetch servers:', data.message);
                }
            } catch (error) {
                console.error('Error fetching servers:', error);
            }
        };

        fetchJoinedServers();
    }, []);

    return (
        <>
            <h2>Characters</h2>
            <div className="character-container">
                {servers.length > 0 ? (
                    <>
                        <p className="explanation"><span style={{color: 'yellow'}}>Yellow border</span> means you have not been approved by the server's admin yet.</p>
                    
                        {servers.map((server) => {
                            console.log(server);
                            return (
                                <ServerCharacterContainer 
                                    key={server.id}
                                    id={server.id}
                                    name={server.name}
                                />
                            );
                        })}
                    </>
                ) : (
                    <p className="no-server">You have not joined any servers yet.</p>
                )}
                
            </div>
        </>
    );
}

export default Characters;
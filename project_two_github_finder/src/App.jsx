import { useState } from "react";

export default function App() {

    const [hasSearched, setHasSearched] = useState(false);
    const [username, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

// API: // From: https://api.github.com/users/mustaqeem-2001 

    function handleSubmit(e) {
        setHasSearched(true);
        e.preventDefault();
        console.log(e);
        console.log(username.toLowerCase())
        setUserFound(true);
        fetch(`https://api.github.com/users/${username}`) // GitHub API is case-insensitive
            .then(response => {
                if (!response.ok) {
                    setUserFound(false);
                }
                return response.json()
            })

            .then(data => {
                setUser(data)
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <>
            <header>
                <i className="fa-brands fa-github"></i>
                <h1>GitHub Finder</h1>
                
                <form>
                    <div>
                        <input value={username} 
                            onChange={(e) => setUserName(prev => e.target.value)} 
                            type="text" 
                            className="user-input" 
                            placeholder="Enter a GitHub username..." />
                    </div>
                    <button onClick={handleSubmit}>Search</button>
                </form>
               
                
            </header>

        
            {!hasSearched ? (
                <main>
                    <i className="fa-brands fa-github"></i>
                    <p>Find any GitHub user</p>
                    <p>Type a username above and tap Search to see their profile, repos, and stats</p>
                </main>
            )
                    : loading ? (
                        <main>
                            <strong>Fetching profile...</strong>
                            <p>Talking to the GitHub API, hand tight</p>
                        </main>
                    )
                    : user 
                        ? ( 
                            <main>
                                <h1>{user.login}</h1>
                            </main>
                        )   
                            : ( 
                                <main>
                                    <i class="fa-solid fa-circle-exclamation"></i>
                                    <strong>User not found</strong>
                                    <p>No GitHub account exists for "{username}". Check the spelling and try again</p>
                                </main>
                            )
            } 

            <footer>
                <p>GitFinder . Built by Mustaqeem Ahmed Chowdhury</p>
                <i className="fa-brands fa-github"></i>
                <a href="https://github.com/mustaqeem-2001/project_two_github_finder" className="github-repo-link"> https://github.com/mustaqeem-2001/project_two_github_finder</a>
            </footer>
        </>
    )
}
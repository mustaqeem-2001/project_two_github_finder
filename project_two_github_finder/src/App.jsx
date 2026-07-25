import { useState } from "react";

export default function App() {

    const [hasSearched, setHasSearched] = useState(false);
    const [username, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

// API: // From: https://api.github.com/users/mustaqeem-2001 

    function handleSubmit(e) {
        setLoading(true)
        setHasSearched(true);
        e.preventDefault();
        fetch(`https://api.github.com/users/${username}`) // GitHub API is case-insensitive
            .then(response => {
                if (!response.ok) {
                    throw new Error("User not found");
                }
                return response.json()
            })

            .then(data => {
                setUser(data)
            })
            .catch((err) => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <>
            <header>
                <div className="header-brand">
                    <i className="fa-brands fa-github"></i>
                    <h1>GitHub Finder</h1>
                </div>
                
                
                <form>
                    <div className="form-input-container">
                        <i className="fa-solid fa-magnifying-glass"></i>
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
                    <i className="fa-brands fa-github initial-github-logo"></i>
                    <p className="initail-main-find-github">Find any GitHub user</p>
                    <p className="initial-main-text">Type a username above and tap Search to see their profile, repos, and stats</p>
                </main>
            )
                    : loading ? (
                        <main>
                            <div className="spinner"></div>
                            <strong>Fetching profile...</strong>
                            <p>Talking to the GitHub API, hand tight</p>
                        </main>
                    )
                    : user 
                        ? ( 
                            <main>
                                <div className="user-info">
                                    <img className="user-avatar" src={`${user.avatar_url}`} />
                                    <h1 className="profile-name">{user.name}</h1>
                                    <p className="user-name">@{`${user.login}`}</p>
                                    <p className="user-bio">{`${user.bio ? user.bio : "No bio shown"}`}</p>

                                    <div className="user-public-details-container">
                                        <div>
                                            <i className="fa-regular fa-file"></i>
                                            <p className="fsB">{user.public_repos}</p>
                                            <p className="fc">Repos</p>
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-user-group"></i>
                                            <p className="fsB">{user.followers}</p>
                                            <p className="fc">Followers</p>
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-user-group"></i>
                                            <p className="fsB">{user.following}</p>
                                            <p className="fc">Following</p>
                                        </div>
                                    </div>

                                    <div className="user-location">
                                        <i className="fa-solid fa-location-dot"></i>
                                        <p>{user.location ? user.location : "Unknown"}</p>
                                    </div>
                                    <div className="view-on-github-container">
                                        <i className="fa-brands fa-github"></i>
                                        <a href={`${user.html_url}`}>View on Github</a>
                                    </div>
                                    
                                </div>
                            </main>
                        )   
                            : ( 
                                <main>
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    <strong>User not found</strong>
                                    <p>No GitHub account exists for "{username}". Check the spelling and try again</p>
                                </main>
                            )
            } 
            <footer>
                <p>GitFinder . Built by Mustaqeem Ahmed Chowdhury</p>
                <div>
                    <i className="fa-brands fa-github"></i>
                    <a href="https://github.com/mustaqeem-2001/project_two_github_finder" className="github-repo-link"> https://github.com/mustaqeem-2001/project_two_github_finder</a>
                </div>
            </footer>
        </>
    )
}
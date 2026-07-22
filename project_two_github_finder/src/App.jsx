import { useState } from "react";

export default function App() {

    const [searchingUser, setSearchingUser] = useState(false);
    const [userFound, setUserFound ] = useState(false)
    return (
        <>
            <header>

            </header>

        
            {!searchingUser ? (
                <main>
                    <i className="fa-brands fa-github"></i>
                    <p>Find any GitHub user</p>
                    <p>Type a username above and tap Search to see their profile, repos, and stats</p>
                </main>
            )
                    : userFound 
                        ? ( <p>User found</p> ) 
                            : ( <p>User not found</p> )
            } 

            <footer>
                <p>GitFinder . Built by Mustaqeem Ahmed Chowdhury</p>
                <i className="fa-brands fa-github"></i>
                <a className="github-repo-link"> https://github.com/mustaqeem-2001/project_two_github_finder</a>
            </footer>
        </>
    )
}
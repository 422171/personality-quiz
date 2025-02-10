import {useState, useContext} from "react";
import { UserContext } from "./UserContext";

export default function UserForm() {
    const [inputName, setInputName] = useState();
    const {setName} = useContext(UserContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        setName(inputName);
        window.history.pushState({},'', '/quiz');
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label> 
            <input type="text" id="name" name="name" value={inputName} 
                onChange={(e) => setInputName(e.target.value)} autoComplete="off" required />
            <button type="submit">Start Quiz</button>
        </form>
    );
}
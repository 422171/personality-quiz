export default function Question({question, options, onAnswer}) {
    return (
        <div>
            <h2>{question}</h2>
            {options.map((option) => {
                return(
                <button key={option} onClick={() => {onAnswer(option)}}>{option}</button>
                );
            })}
        </div>
    );
}
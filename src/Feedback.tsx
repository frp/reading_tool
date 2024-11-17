import { editPath } from './edit-path'
import { getWords, normalize } from './data-extraction'

function renderOp(op: [string, string]) {
    return <span className={`transcript-${op[0]}`}>{op[1]} </span>
}

function renderDiff(from: string[], to: string[], trim: boolean) {
    let path = editPath(from, to, normalize)
    while(trim && path.length > 1 && path[path.length - 1][0] === 'insert') {
        path.pop()
    }
    return (<p>
        {path.map(op => renderOp(op))}
    </p>)
}

type FeedbackProps = {
    listening: boolean,
    sentence: string,
    transcript: string,
}

function Feedback(props: FeedbackProps) {
    if(props.transcript === "") {
        return <p></p>
    }
    return renderDiff(getWords(props.transcript), getWords(props.sentence), props.listening)
}

export default Feedback
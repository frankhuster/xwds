import './Message.css'

export default function Message({ messages, errors }) {

  var list

  if (errors.length > 0) {
    list = errors.map((e, i) => <li key={i} className="error">{e}</li>)
  } else {
    list = messages.map((e, i) => <li key={i}>{e}</li>)
  }

  return (
    <div className="message">
      <ul>{list}</ul>
    </div>
  )
}

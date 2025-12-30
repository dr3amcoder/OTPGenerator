import { useState } from "react";

const CharacterCounter = () => {
  const [text, setText] = useState("");

  return (
    <div className="container">
      <h2 className="title-md">Character Counter</h2>

      <input
        className="input"
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {text.length > 20 && <p className="warning">Too long!</p>}

      <p className="text-muted">Characters: {text.length}</p>
    </div>
  );
};


export default CharacterCounter;
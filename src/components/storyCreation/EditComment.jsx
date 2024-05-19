import { useState } from "react";

export default function EditComment({comment}) {
    const[value, setValue] = useState(comment);

  return (
    <form>
    <input size={value.length} value={value} onChange={(e) => setValue(e.target.value)}/>
    </form>
  )
}

//TODO: lots!! have to end up updating story!!
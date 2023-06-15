import { useState } from "react";


export function Book(book:any) {
       const [details, setDetails] = useState(false)

        const btnBgClassName = details ? 'bg-yellow-400' : 'bg-blue-400'

        const btnClasses = ['py-2 px-4 border',btnBgClassName]

       return (
        <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
            <p>{book.title}</p>
            <h1 className="fond-bold">Price: {book.price}</h1>
            <button className={btnClasses.join(' ')} onClick={() => setDetails(prev => !prev)}>
              {details ? 'Hide Details' : 'Show details'}
            </button>
           
            {details &&
            <div>
              <p>Genre: {book.genre}</p>
              <p>Author: <span className="font-bold">{book.author}</span></p>
              <p>Year: <span className="font-bold">{book.creationYear}</span></p>
            </div>}
            
        </div>
    )
}
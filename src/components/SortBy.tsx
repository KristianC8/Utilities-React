import { useEffect, useState } from 'react'
import './SortBy.css'

export const SortBy = () => {
  interface character {
    id: number
    name: string
    image: string
  }
  const [characters, setCharacters] = useState<character[]>([])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          'https://rickandmortyapi.com/api/character/[1,2,3,4,5,11,7,72,9,10,78,91]'
        )
        if (!response.ok)
          throw Error(
            `Error: ${response.status} Status: ${response.statusText}`
          )
        const data = await response.json()
        setCharacters(data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [])

  return (
    <>
      <h3>Ordenar:</h3>
      <div className='sort-container'>
        <section className='characters-grid'>
          {characters &&
            characters.map((character) => (
              <article key={character.id}>
                <span>{character.name}</span>
                <img src={character.image} alt={character.name} />
              </article>
            ))}
        </section>
      </div>
    </>
  )
}

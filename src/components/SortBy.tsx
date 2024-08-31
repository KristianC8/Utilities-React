import { useEffect, useState } from 'react'
import { Loader } from './Loader'
import './SortBy.css'

export const SortBy = () => {
  interface character {
    id: number
    name: string
    image: string
  }
  const [characters, setCharacters] = useState<character[]>([])
  const [isLoading, setIsLoading] = useState<boolean>()
  const [sort, setSort] = useState<string>('--')

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
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
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [])

  const changedSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value)
  }

  const sortedCharacters = (sort: string) => {
    if (sort === '--') return characters
    if (sort === 'a-z') {
      return [...characters].sort((a, b) => a.name.localeCompare(b.name))
    }
    if (sort === 'z-a') {
      return [...characters].sort((b, a) => a.name.localeCompare(b.name))
    }
    if (sort === 'id+') {
      return [...characters].sort((a, b) => a.id - b.id)
    }
    if (sort === 'id-') {
      return [...characters].sort((b, a) => a.id - b.id)
    }
  }

  return (
    <>
      <h3>Ordenar:</h3>
      <div className='sort-container'>
        <div className='sort-select'>
          <label htmlFor='ordenar'>Ordenar por:</label>
          <select id='ordenar' name='ordenar' onChange={changedSelect}>
            <option defaultValue='--'>--</option>
            <option value='a-z'>A - Z</option>
            <option value='z-a'>Z - A</option>
            <option value='id+'>Id ⬆️</option>
            <option value='id-'>Id ⬇️</option>
          </select>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <section className='characters-grid'>
            {sortedCharacters(sort)?.map((character) => (
              <article key={character.id}>
                <span>{character.name}</span>
                <img src={character.image} alt={character.name} />
                Id:{` ${character.id}`}
              </article>
            ))}
          </section>
        )}
      </div>
    </>
  )
}

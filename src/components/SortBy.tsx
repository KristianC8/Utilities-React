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
  const [form, setForm] = useState<string>('')

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

  const sortedCharacters = (sort: string, form: string) => {
    let searchCharacters = characters
    if (form === '') {
      searchCharacters = characters
    } else {
      searchCharacters =
        characters.filter((character) =>
          character.name.toLowerCase().includes(form.toLowerCase())
        ) ?? []
    }

    if (sort === '--') return searchCharacters
    if (sort === 'a-z') {
      return [...searchCharacters].sort((a, b) => a.name.localeCompare(b.name))
    }
    if (sort === 'z-a') {
      return [...searchCharacters].sort((b, a) => a.name.localeCompare(b.name))
    }
    if (sort === 'id+') {
      return [...searchCharacters].sort((a, b) => a.id - b.id)
    }
    if (sort === 'id-') {
      return [...searchCharacters].sort((b, a) => a.id - b.id)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setForm(newQuery)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <h3>Ordenar:</h3>
      <div className='sort-container'>
        <div className='sort-search'>
          <form className='form-search' onSubmit={handleSubmit}>
            <label htmlFor='filter'>Buscar:</label>
            <input
              id='filter'
              name='filter'
              type='text'
              placeholder='personaje ...'
              onChange={handleChange}
              value={form}
            />
          </form>
          <div className='sort-select'>
            <label htmlFor='ordenar'>Ordenar por:</label>
            <select id='ordenar' name='ordenar' onChange={changedSelect}>
              <option defaultValue='--' hidden>
                --
              </option>
              <option value='a-z'>A - Z</option>
              <option value='z-a'>Z - A</option>
              <option value='id+'>Id ⬆️</option>
              <option value='id-'>Id ⬇️</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : sortedCharacters(sort, form)?.length === 0 ? (
          <span>No se encontraron resultados para la busqueda</span>
        ) : (
          <section className='characters-grid'>
            {sortedCharacters(sort, form)?.map((character) => (
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

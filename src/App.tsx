import './App.css'
import { ReactIcon } from './components/icons/ReactIcon'
import { SortBy } from './components/SortBy'

function App() {
  return (
    <>
      <header className='header-main'>
        <div className='header-main-title'>
          <h1>Utilities React</h1>
          <ReactIcon />
        </div>
      </header>
      <main>
        <aside className='aside-utilities'>
          <nav>
            <ul className='list-utilities'>
              <li>1. Ordenar</li>
              <li>1. Ordenar</li>
              <li>1. Ordenar</li>
            </ul>
          </nav>
        </aside>
        <section className='section-utilities'>
          <SortBy />
          <SortBy />
        </section>
      </main>
      <footer></footer>
    </>
  )
}

export default App

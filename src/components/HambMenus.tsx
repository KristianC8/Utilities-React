import './HambMenus.css'

export const HambMenus = () => {
  return (
    <div className='section-menuHamb'>
      <div className='HambMenu-container'>
        <div className='HambMenu menu cross menu--1'>
          <label className='HambMenu-label'>
            <input type='checkbox' className='HambMenu-input' />
            <svg
              className='HambMenu-svg'
              viewBox='0 0 100 100'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='50' cy='50' r='50' />
              <path
                className='HambMenu-path line--1'
                d='M0 40h62c13 0 6 28-4 18L35 35'
              />
              <path className='HambMenu-path line--2' d='M0 50h70' />
              <path
                className='HambMenu-path line--3'
                d='M0 60h62c13 0 6-28-4-18L35 65'
              />
            </svg>
          </label>
        </div>
      </div>
    </div>
  )
}

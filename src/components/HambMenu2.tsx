import './HambMenu2.css'

export const HambMenu2 = () => {
  return (
    <div className='HambMenu2-container'>
      <div className='HambMenu2 menu cross menu--2'>
        <label className='HambMenu2-label'>
          <input type='checkbox' className='HambMenu2-input' />
          <svg
            viewBox='0 0 100 100'
            xmlns='http://www.w3.org/2000/svg'
            className='HambMenu2-svg'
          >
            <circle cx='50' cy='50' r='50' className='HambMenu2-circle' />
            <path
              className='HambMenu2-path line--1'
              d='M0 70l28-28c2-2 2-2 7-2h64'
            />
            <path className='HambMenu2-path line--2' d='M0 50h99' />
            <path
              className='HambMenu2-path line--3'
              d='M0 30l28 28c2 2 2 2 7 2h64'
            />
          </svg>
        </label>
      </div>
    </div>
  )
}

import React from 'react'
import Footer from '../Footer/Footer'
import HeaderPages from '../Header/HeaderPages'

function WrapperPages({children}) {
    return (
        <div>
            <HeaderPages option={true} scroll={-1} />
            {children}
            <Footer/>
        </div>
    )
}

export default WrapperPages

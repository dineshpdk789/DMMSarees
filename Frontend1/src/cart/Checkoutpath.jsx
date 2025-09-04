import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material'
import React from 'react'

const Checkoutpath = () => {
    const path = [
        {
            label: "Shipping details",
            icon: <LocalShipping />
        },
        {
            label: "Confirm Order",
            icon: <LibraryAddCheck />
        },
        {
            label: "Payment",
            icon: <AccountBalance />
        }
    ]
    return (
        <div className='checkoutpath'>
            {
                path.map((item,index) => {
                    return (<div className='checkoutPath-step' key={index}>
                        <p className='checkoutpath-icon'>{item.icon}</p>
                        <p className='checkoutpath-label'>{item.label}</p>
                    </div>)
                })
            }

        </div>
    )
}

export default Checkoutpath

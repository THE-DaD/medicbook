
import React from 'react'

import {HashRouter, Routes, Route} from 'react-router-dom'
import Navigator from './homeStack'
/* import history from '../routes/history' */


export default class MainRouter extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(<>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Navigator />} />
                    <Route path="/:branch" element={<Navigator />} />
                    <Route path="/:branch/:section" element={<Navigator />} />
                    <Route path="/:branch/:section/:topic" element={<Navigator />} />
                    <Route path="/:branch/:section/:topic/:action" element={<Navigator />} />
                    
                </Routes>
             </HashRouter>
        </>)


    }
}

import { useState } from 'react';
import './App.css';
import { Alert } from '@coreui/react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { COffcanvas } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import { COffcanvasHeader } from '@coreui/react'
import { COffcanvasBody } from '@coreui/react'
import { COffcanvasTitle } from '@coreui/react'
import { CButton } from '@coreui/react'
import { CCloseButton } from '@coreui/react';
import Content from './components/Content';
function App() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton onClick={() => setVisible(true)} className='buttoncustom'>Save Segment</CButton>
      <COffcanvas placement="right" visible={visible} onHide={() => setVisible(false)}>
        <COffcanvasHeader>
          <COffcanvasTitle>Saving segment</COffcanvasTitle>
          <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
        </COffcanvasHeader>
        <COffcanvasBody>
       <Content/>
        </COffcanvasBody>
      </COffcanvas>
    </>
  )
}

export default App;

import React from 'react'
import Accordion from 'react-bootstrap/Accordion'

import SectionItem from '../SectionItem'

const SectionInfo = (props) => {

    const { route } = props
    return (
        <Accordion>
            {route.sections.map((section, index) => {
                return <SectionItem section={section} index={index} />
            })}
        </Accordion>

    )
}

export default SectionInfo;
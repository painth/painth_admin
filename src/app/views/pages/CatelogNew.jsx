import React, { Component } from 'react'
import { Breadcrumb } from 'app/components'
import AddCatelogForm from './AddCatelogForm'
import { Card } from '@material-ui/core'

class CatelogNew extends Component {
    render() {
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Catalogues', path: '/pages' },
                            { name: 'New Catalogue' },
                        ]}
                    />
                </div>
                <Card className="px-6 pt-2 pb-4">
                    <AddCatelogForm />
                </Card>
            </div>
        )
    }
}

export default CatelogNew
import React, { useState, useEffect } from 'react'
import { MatxProgressBar } from 'app/components'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Button,
    Icon,
    Grid,
    Fab,
    Card,
    Divider
} from '@material-ui/core'
import axios from 'axios'
import {api_base_url} from '../../../config'

const AddCatelogForm = () => {
    const [state, setState] = useState({
        date: new Date(),
    })

    const [pictures, setFiles] = useState([])
    const [error, setError] = useState("")

    const handleSubmit = (event) => {
        if(pictures.length >= 1){
            pictures.forEach((key,i) => {
                if(!pictures[i]['uploading']){
                    setError("Upload All Pictures")
                }
            });
        }
        else if(pictures.length == 0){
            setError("Upload atleast one Picture")
        }
        axios.post(api_base_url+'category',
        "",
        {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer"+token
            }
        }).then((res)=>{

        }).catch((err)=> {

        })
        // console.log("submitted");
        // console.log(event);
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleFileSelect = (event) => {
        let files = event.target.files
        let list = [...pictures]

        for (const iterator of files) {
            list.push({
                file: iterator,
                uploading: false,
                error: false,
                progress: 0,
            })
        }
        setFiles([...list])
        setError("")
    }

    const handleSingleRemove = (index) => {
        let tempList = [...pictures]
        tempList.splice(index, 1)
        setFiles([...tempList])
    }

    const uploadSingleFile = (index) => {
        let allFiles = [...pictures]
        let file = pictures[index]

        allFiles[index] = { ...file, uploading: true, error: false, progress: 100 }

        setFiles([...allFiles])
        setError("")
    }

    const handleSingleCancel = (index) => {
        let allFiles = [...pictures]
        let file = pictures[index]

        allFiles[index] = { ...file, uploading: false, error: true, progress: 0 }

        setFiles([...allFiles])
    }

    let isEmpty = !!!pictures.length

    const {
        name,
        description
    } = state

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Catalogue Name"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            value={name || ''}
                            validators={[
                                'required'
                            ]}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            className="mb-4 w-full"
                            label="Description"
                            onChange={handleChange}
                            type="text"
                            name="description"
                            size="small"
                            variant="outlined"
                            multiline
                            rows={6}
                            value={description || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <label htmlFor="upload-multiple-file">
                            <Fab
                                className="capitalize"
                                color="primary"
                                component="span"
                                variant="extended"
                            >
                                <div className="flex items-center">
                                    <Icon className="pr-8">cloud_upload</Icon>
                                    <span>Upload Multiple Pictures</span>
                                </div>
                            </Fab>
                        </label>
                        <input
                            className="hidden"
                            onChange={handleFileSelect}
                            id="upload-multiple-file"
                            type="file"
                            multiple
                        />
                        <p className="text-error">{error}</p>

                        {!isEmpty &&
                        <Card className="mb-6" elevation={2}>
                            <div className="p-4">
                                <Grid
                                    container
                                    spacing={2}
                                    justify="center"
                                    alignItems="center"
                                    direction="row"
                                >
                                    <Grid item lg={4} md={4}>
                                        Name
                                    </Grid>
                                    <Grid item lg={1} md={1}>
                                        Size
                                    </Grid>
                                    <Grid item lg={2} md={2}>
                                        Progress
                                    </Grid>
                                    <Grid item lg={1} md={1}>
                                        Status
                                    </Grid>
                                    <Grid item lg={4} md={4}>
                                        Actions
                                    </Grid>
                                </Grid>
                            </div>
                            <Divider></Divider>

                            {pictures.map((item, index) => {
                                let { file, uploading, error, progress } = item
                                return (
                                    <div className="px-4 py-4" key={file.name}>
                                        <Grid
                                            container
                                            spacing={2}
                                            justify="center"
                                            alignItems="center"
                                            direction="row"
                                        >
                                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                                {file.name}
                                            </Grid>
                                            <Grid item lg={1} md={1} sm={12} xs={12}>
                                                {(file.size / 1024 / 1024).toFixed(1)}{' '}
                                                MB
                                            </Grid>
                                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                                <MatxProgressBar
                                                    value={progress}
                                                ></MatxProgressBar>
                                            </Grid>
                                            <Grid item lg={1} md={1} sm={12} xs={12}>
                                                {error && (
                                                    <Icon color="error">error</Icon>
                                                )}
                                                {/* {uploading && <Icon className="text-green">done</Icon>} */}
                                            </Grid>
                                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                                <div>
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        color="primary"
                                                        disabled={uploading}
                                                        onClick={() =>
                                                            uploadSingleFile(index)
                                                        }
                                                    >
                                                        Upload
                                                    </Button>
                                                    <Button
                                                        className="mx-2"
                                                        size="small"
                                                        variant="contained"
                                                        disabled={!uploading}
                                                        color="secondary"
                                                        onClick={() =>
                                                            handleSingleCancel(index)
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        className="bg-error"
                                                        onClick={() =>
                                                            handleSingleRemove(index)
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                )
                            })}
                        </Card>
                        }
                    </Grid>
                </Grid>
                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <span className="pl-2 capitalize">Submit</span>
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default AddCatelogForm

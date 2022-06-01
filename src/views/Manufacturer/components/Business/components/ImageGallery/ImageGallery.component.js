import React, {Component} from 'react';
import styles from "./Style.module.css";
import {Button, ButtonBase} from "@material-ui/core";
import File from "../../../../../../components/FileComponent/FileComponent.component";
import {Add as AddIcon, CloudUpload as UploadIcon, DeleteOutline as DeleteIcon,Videocam} from '@material-ui/icons';
// import {
//     serviceChangeThumbnailIndexProvider,
//     serviceDeleteImageProvider,
//     serviceUploadProviderImages
// } from "../../../services/Provider.service";
import {WaitingComponent} from "../../../../../../components/index.component";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
// import {serviceDeleteWorkImage} from "../../../../services/CustomersRequest.service";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ImageContainer = ({isLocal, type, handleThumbNail, handleDelete, url, isSelected, index, localIndex,image_type}) => {
    console.log(image_type)
    return (
        <div className={styles.imgContainer}>
            <div className={styles.imgBtn}>
                <ButtonBase
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(type, index, localIndex)
                    }}>
                    <DeleteIcon/>
                </ButtonBase>
            </div>
            <a href={url} target={'_blank'} className={styles.bottomInfo}>
            <div className={styles.imgCard}>
                <div
                    className={styles.img}
                    style={{backgroundImage: 'url(' + url + ')', backgroundSize: 'cover'}}
                    alt=""/>
                {url.mime_type == 'VIDEO' ? <div className={styles.video}><Videocam className={styles.icn}/></div> : ''}
                {/*{!isLocal && (<button type={'button'} onClick={() => {*/}
                {/*    handleThumbNail(type, localIndex)*/}
                {/*}} className={styles.featuredTile}>{isSelected ? 'Featured' : 'Set Featured'}</button>)}*/}
            </div>
                {image_type == 'GALLERY' ? <div className={styles.imgInfo}>
                    <div className={styles.updated}>Image Title / Image Label</div>
                    <div className={styles.updated}>Updated On 22/10/2022 11:00 PM</div>
                </div> : <div className={styles.imgInfo}>
                    <div className={styles.updated}>Certificate Name</div>
                    <div className={styles.updated}>Issued By:</div>
                    <div className={styles.updated}>Validity:</div>
                    <div className={styles.updated}>Updated On 22/10/2022 11:00 PM</div>
                </div>}
            </a>
        </div>
    );
}


class ImageGalleryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            local_images: [],
            remote_images: [],
            thumbnail_index: 0,
            isUploading: false,
            isDeleteCalling: false,
            show_confirm: false,
        }
        this._handleDeleteImage = this._handleDeleteImage.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleThumbnail = this._handleThumbnail.bind(this);
        this._handleUpload = this._handleUpload.bind(this);
        this._handleDialogClose = this._handleDialogClose.bind(this);
        this._suspendItem = this._suspendItem.bind(this);
    }

    componentDidMount() {
        const {images, thumbnail} = this.props;
        this.setState({
            remote_images: images,
            thumbnail_index: thumbnail,
        });
    }

    _renderDialog() {
        const {classes} = this.props;
        if (this.state.show_confirm) {
            return (<Dialog
                keepMounted
                TransitionComponent={Transition}
                open={this.state.show_confirm}
                onClose={this._handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                // classes={{paper: classes.dialog}}
            >
                <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete the item?
                        <br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this._handleDialogClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this._suspendItem} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>)
        } return null;
    }

    _suspendItem() {
        const {data,userId} = this.props;
        const {thumbnail_index,remote_images} = this.state
        if (!this.state.is_delete_calling) {
            this.setState({
                isDeleteCalling: true,
            });
            // serviceDeleteWorkImage({index:thumbnail_index, user_id: userId}).then(() => {
            //     this.setState({
            //         isDeleteCalling: false,
            //     });
            // });
            const images = remote_images;
            images.splice(thumbnail_index, 1);
            this.setState({
                remote_images: images,
                show_confirm: false,
            });
        }
        // this.setState({
        //     show_confirm: false,
        // });
    }

    _handleDialogClose() {
        this.setState({
            show_confirm: false,
        })
    }

    _handleThumbnail(type, index) {
        console.log(type, index);
        const {type: imageType} = this.props;
        this.setState({
            thumbnail_index: index
        });
        // serviceChangeThumbnailIndexProvider({type: imageType, index: index});
    }


    _handleDeleteImage(type, index, uniIndex) {
         // console.log(type, index, uniIndex);
        this.setState({
            show_confirm: true,
            thumbnail_index: index
        });
        // const {type: imageType,userId} = this.props;
        // const {thumbnail_index, remote_images, local_images} = this.state;
        // const {data} = this.props;
        // if (uniIndex <= thumbnail_index) {
        //     this.setState({
        //         thumbnail_index: thumbnail_index == 0 ? 0 : thumbnail_index - 1,
        //     });
        // }
        // if (type == 'LOCAL') {
        //     const images = (local_images);
        //     images.splice(index, 1);
        //     this.setState({
        //         local_images: images
        //     });
        // } else {
        //     if (!this.state.is_delete_calling) {
        //         this.setState({
        //             isDeleteCalling: true,
        //         });
        //         serviceDeleteWorkImage({index,user_id:userId}).then(() => {
        //             this.setState({
        //                 isDeleteCalling: false,
        //             });
        //         });
        //         const images = remote_images;
        //         images.splice(index, 1);
        //         this.setState({
        //             remote_images: images,
        //         });
        //         // this.props.handleImageDelete(data.id, index);
        //     }
        // }
    }

    _handleImageChange(data) {
        this.setState({
            local_images: data,
        });
    }

    async _handleUpload(e) {
        e.stopPropagation();
        e.preventDefault();
        const {type} = this.props;
        const {isUploading, local_images} = this.state;
        if (!isUploading) {
            const fd = new FormData();
            local_images.forEach((val) => {
                fd.append('images', val);
            });
            fd.append('type', type);
            this.setState({
                isUploading: true
            });
            // const req = await serviceUploadProviderImages(fd);
            // this.setState({
            //     isUploading: false
            // });
            // if (!req.error) {
            //     this.setState({
            //         local_images: [],
            //         remote_images: req.data[type.toLowerCase()],
            //     })
            // }
        }
    }

    _renderImages() {
        const {thumbnail_index, remote_images, local_images} = this.state;
        const {data, form_values,image_type} = this.props;
        const imagesArr = [];
        let tempIndex = 0;
        if (remote_images.length > 0) {
            remote_images.forEach((val, index) => {
                imagesArr.push(
                    <ImageContainer
                        url={val}
                        handleDelete={this._handleDeleteImage}
                        handleThumbNail={this._handleThumbnail}
                        isSelected={thumbnail_index == tempIndex}
                        type={'REMOTE'}
                        image_type = {image_type}
                        index={index}
                        localIndex={tempIndex}
                        isLocal={false}
                    />
                );
                tempIndex++;
            });
        }
        if (local_images.length > 0) {
            local_images.forEach((val, index) => {
                imagesArr.push(
                    <ImageContainer
                        isLocal
                        url={URL.createObjectURL(val)}
                        handleDelete={this._handleDeleteImage}
                        handleThumbNail={this._handleThumbnail}
                        isSelected={thumbnail_index == tempIndex}
                        type={'LOCAL'}
                        index={index}
                        localIndex={tempIndex}
                    />
                );
                tempIndex++;
            });
        }
        if (imagesArr.length > 0) {
            return (
                <div>
                    <div className={styles.flexWrap}>
                        {imagesArr}
                    </div>
                    <br/>
                </div>
            )
        } else {
            return (<div className={styles.noImg}>No Images Added</div>)
        }
    }

    _renderAddButton() {

        return (
            <div>
                <div className={styles.addButton}>
                    <AddIcon fontSize={'small'}/> Add
                </div>
            </div>
        )

    }

    _renderSaveButton() {
        const {isUploading} = this.state;
        if (isUploading) {
            return (<div onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}><WaitingComponent/></div>);
        }
        return (<div>
            <div onClick={this._handleUpload} className={styles.addButton}>
                <UploadIcon fontSize={'small'}/><span style={{marginLeft: '3px'}}>Save</span>
            </div>
        </div>);
    }

    _renderImageComponent() {
        const {thumbnail_index, remote_images, local_images} = this.state;
        const {type, title} = this.props;
        console.log('ds', 10 - remote_images.length <= 0 ? -1 : 10 - remote_images.length)
        if (remote_images.length < 10) {
            return (
                <File
                    multiple={true}
                    onChange={this._handleImageChange}
                    // file={this.state.files['company_logo']}
                    max_size={1024 * 1024 * 5}
                    name={type}
                    value={[]}
                    selection_label={'ds'}
                    error_text={'Maximum size 5MB & jpg, png, jpeg, files are allowed'}
                    type={['jpg', 'png', 'jpeg']}
                    // handleChange={this._handleFileChange}
                    placeholder={'Images'}
                    max_count={10 - remote_images.length <= 0 ? -1 : 10 - remote_images.length}
                    component={local_images.length > 0 ? (this._renderSaveButton()) : (this._renderAddButton())}
                />
            )
        }
        return null;
    }

    render() {
        const {local_images} = this.state;
        const {type, title} = this.props;
        return (
            <div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {/*<h5>{title}</h5>*/}
                    <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end', cursor: 'pointer'}}>
                        {this._renderImageComponent()}
                    </div>
                </div>
                <div className={styles.imageCont}>
                    {this._renderImages()}
                </div>
                {this._renderDialog()}
            </div>
        )
    }
}

export default ImageGalleryComponent;

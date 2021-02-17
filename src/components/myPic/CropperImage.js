import React, {useRef, useState, useEffect} from 'react';
import Cropper from 'cropperjs';

import 'cropperjs/dist/cropper.min.css';

const CropperImage = ({originalPic, cropper}) => {
    const imgElement = useRef();
    const [cropedImg, setCropedImg] = useState('');

    useEffect(() =>{
       cropper = new Cropper(imgElement.current, {
            aspectRatio: 16 / 9,
            autoCrop: false,
            ready() {
                console.log("ready")
            },
            crop(e){
                console.log("cropped");
                const canvas = cropper.getCroppedCanvas();
                setCropedImg(canvas.toDataURL("image/png"));
            }
        });

        return () =>{
            cropper.destroy();
        }
    }, []);

    return (
        <React.Fragment>
            <img ref={imgElement} className="img-to-crop" src={originalPic} alt="Image_to_crop"/>

            <img src={cropedImg} style={{display: cropedImg ? 'block': 'none'}} className="img-preview" alt="img_preview"/>
        </React.Fragment>
    )
}

export default CropperImage

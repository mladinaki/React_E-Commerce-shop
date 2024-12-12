import React from 'react';
import { InputText } from 'primereact/inputtext';
import './Profil.css'

const Profil = () => {

    return (
        <div className="avatar-upload">
            <InputText type='file' accept='./image/' defaultValue={''} onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.type.substring(0, 5) === 'image') {
                    setImage(file)
                } else {
                    setImage(null)
                }
            }}
            />
            <button>Upload</button>
        </div>
    )
}

export default Profil

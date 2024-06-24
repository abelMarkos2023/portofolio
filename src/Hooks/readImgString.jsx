import React, { useState } from 'react'

const readImgString = () => {

    const [imgString,setImgString] = useState(null);

    const readData = (e) => {
        const file = e.target.files[0]

        if(file){
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                setImgString(reader.result)
            }
        }
    }
  return {readData,imgString}
}

export default readImgString
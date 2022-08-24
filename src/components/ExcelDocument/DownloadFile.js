import { DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useState } from 'react'
import styles from "../../common/styles/upfile.css";
const DownloadFile = ({keys, name}) => {
  const [link, setLink] = useState("http://hbgreen.com.vn")
  const downloadFile = async (e) => {
    e.preventDefault();
   try {
    if (keys === 'status') {
      window.open(`${link}/files/example_data_sv.xlsx`)
    } else {
      window.open(`${link}/files/example_bussines.xlsx`)
    }
   } catch (error) {
      console.log(error);
   }

  }
  return (
    <>
      <div className={styles.header}>
        <Button onClick={downloadFile} style={{ width: "95%" }}>
          <label htmlFor="down-file">
              <div className={styles.buttonUpfile}>
                <DownloadOutlined   className={styles.icon} /> Tải file excel {name}
              </div>
          </label>
        </Button>
      </div>
    </>
  )
}

export default DownloadFile
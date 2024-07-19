import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';


function Barang({barang, setDescription, setDiscount, setHarga, setTotal}) {

    function changeBarang(e) {
        let id_barang = e.target.value;
        console.log(id_barang);

        axios.get(`http://202.157.176.100:3000/barangs?filter={"where" : {"id_barang":${id_barang}}}`)
        .then(res => {
            const firstBarang = res.data[0];
            if (firstBarang) {
                setDescription(firstBarang.description);
                setDiscount(firstBarang.diskon);
                setHarga(firstBarang.harga);
                const calculatedTotal = firstBarang.harga * (1 - firstBarang.diskon / 100);
                setTotal(calculatedTotal);
            }
        })
        .catch(err => {
            console.log(err);
        });

    }

  return (
    <div className='box-list'>
        <label>Choose a items:</label>

        <select name="negara" id="negara" onChange={changeBarang}>
            {barang.map((data) => (
                    <option key={data.id_barang} value={data.id_barang}>{data.id_barang} - {data.nama_barang}</option>
            ))}
        </select>
    </div>
  )
}

export default Barang
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css';

function Negara({negara, setPelabuhan, setBarang, setDescription, setDiscount, setHarga, setTotal }) {

    function changeCountry(e) {
        let id_negara = e.target.value; 

        axios.get(`http://202.157.176.100:3000/pelabuhans?filter={"where" : {"id_negara":${id_negara}}}`)
        .then(res => {
            setPelabuhan(res.data);
            let id_pelabuhan = res.data[0].id_pelabuhan;

            axios.get(`http://202.157.176.100:3000/barangs?filter={"where" : {"id_pelabuhan":${id_pelabuhan}}}`)
            .then(res => {
                setBarang(res.data);
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
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className='box-list'>
            <label>Choose a country : </label>
            <select name="negara" id="negara" onChange={changeCountry}>
                {negara.map((data) => {
                   return <option key={data.id_negara} value={data.id_negara}>{data.kode_negara} - {data.nama_negara}</option>
                })}
            </select>
        </div>
    );
}

export default Negara;

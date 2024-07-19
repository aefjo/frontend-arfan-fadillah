import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import Negara from '../Atoms/Negara';
import Pelabuhan from '../Atoms/Pelabuhan';
import Barang from '../Atoms/Barang';
import Description from '../Atoms/Description';
import Discount from '../Atoms/Discount';
import Harga from '../Atoms/Harga';
import Total from '../Atoms/Total';

function Container() {
    const [negara, setNegara] = useState([]);
    const [pelabuhan, setPelabuhan] = useState([]);
    const [barang, setBarang] = useState([]);
    const [description, setDescription] = useState();
    const [discount, setDiscount] = useState();
    const [harga, setHarga] = useState();
    const [total, setTotal] = useState();
    
    useEffect(() => {
        axios.get(`http://202.157.176.100:3000/negaras`)
        .then(res => {
            setNegara(res.data);

            axios.get(`http://202.157.176.100:3000/pelabuhans?filter={"where" : {"id_negara":${res.data[0].id_negara}}}`)
            .then(res => {
                setPelabuhan(res.data);

                axios.get(`http://202.157.176.100:3000/barangs?filter={"where" : {"id_pelabuhan":${res.data[0].id_pelabuhan}}}`)
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
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

  return (
    <div className='container'>
        <div>
            <ul>
                <li><Negara negara={negara} setPelabuhan={setPelabuhan} setBarang={setBarang} setDescription={setDescription} setDiscount={setDiscount} setHarga={setHarga} setTotal={setTotal}/></li>
                <li><Pelabuhan pelabuhan={pelabuhan} setBarang={setBarang} setDescription={setDescription} setDiscount={setDiscount} setHarga={setHarga} setTotal={setTotal} /></li>
                <li><Barang barang={barang} setDescription={setDescription} setDiscount={setDiscount} setHarga={setHarga} setTotal={setTotal} /></li>
            </ul>
            <Description description={description} />
            <ul>
                <li><Discount discount={discount} /></li>
                <li><Harga harga={harga} /></li>
                <li><Total total={total} /></li>
            </ul>        
        </div>
    </div>
  )
}

export default Container
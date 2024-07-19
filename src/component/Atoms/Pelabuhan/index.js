import React from 'react';
import axios from 'axios';

function Pelabuhan({ pelabuhan, setBarang, setDescription, setDiscount, setHarga, setTotal }) {

    function changePelabuhan(e) {
        let id_pelabuhan = e.target.value;
        console.log(id_pelabuhan);

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
    }

    return (
        <div className='box-list'>
            <label htmlFor="pelabuhan">Choose a port:</label>
            <select name="pelabuhan" id="pelabuhan" onChange={changePelabuhan}>
                {pelabuhan.map((data) => (
                        <option key={data.id_pelabuhan} value={data.id_pelabuhan}>
                            {data.nama_pelabuhan}
                        </option>
                ))}
            </select>
        </div>
    );
}

export default Pelabuhan;

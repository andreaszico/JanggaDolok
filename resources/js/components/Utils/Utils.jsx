import React, { useState } from 'react'

export const myPotensial = {
    'post': [
        {
            'id': 1,
            'image': 'https://i.postimg.cc/cJBrXdYX/penginapan.jpg',
            'title': 'Penginapan',
            'content': 'Tersedia 3 rumah bolon yang dapat digunakan,  wisatawan dapat menginap dengan cara memesan penginapan melalui  website ini. Untuk satu minggu menginap  wisatawan membayar seharga RP.100.000 .'
        },
        {
            'id': 2,
            'image': 'https://i.postimg.cc/8znysVsX/kolam.jpg',
            'title': 'Kolam Renang',
            'content': 'Terdapat  kolam berenang yang berjarak kurang lebih 200m dari desa jangga, terdapat 1 kolam berenang  dengan air yang bersumber dari pegunungan, kolam ini dikelilingi pepohonan rimbun di sekitar kolam. Untuk masuk wisatawan hanya membayar Rp 5.000/orang.'
        },
        {
            'id': 3,
            'image': 'https://i.postimg.cc/7PXXd5j7/sawah.png',
            'title': 'Sawah Dan Pegunungan',
            'content': 'Desa Wisata Jangga Dolok memiliki pemandangan yang sangat indah dan menarik untuk dikunjungi dimana terdapat hamparan sawah luas  yang berada dibawah kaki pegunungan yang sangat indah untuk di pandang.'
        }
    ]
}

export const myPost = {
    articles: [
        {
            "source": {
                "id": null,
                "name": "AllAfrica - Top Africa News"
            },
            "author": "Vanguard",
            "title": "The Secret Behind Bitcoin's Jump From ₦100,000 to ₦8 Million in 2 Years",
            "description": "[Vanguard] Bitcoin marked its 12th anniversary on October 31st. In response, its price has jumped from $13,000 to $15,000 in less than 2 weeks. The crypto community, including Bitcoin exchanges, celebrated the 12th anniversary in a big way.",
            "url": "https://allafrica.com/stories/202011120244.html",
            "urlToImage": "https://cdn08.allafrica.com/static/images/structure/aa-logo-rgba-no-text-square.png",
            "publishedAt": "2020-11-12T08:19:13Z",
            "content": "Bitcoin marked its 12th anniversary on October 31st. In response, its price has jumped from $13,000 to $15,000 in less than 2 weeks. The crypto community, including Bitcoin exchanges, celebrated the … [+4027 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Vanguard"
            },
            "author": "sunday",
            "title": "The Secret Behind Bitcoin’s Jump from ₦100,000 to ₦8 million in 2 years",
            "description": "Bitcoin marked its 12th anniversary on October 31st. In response, its price has jumped from $13,000 to $15,000 in less than 2 weeks. The crypto community, including Bitcoin exchanges, celebrated the 12th anniversary in a big way. But for someone who hasn’t de…",
            "url": "https://www.vanguardngr.com/2020/11/the-secret-behind-bitcoins-jump-from-%e2%82%a6100000-to-%e2%82%a68-million-in-2-years/",
            "urlToImage": null,
            "publishedAt": "2020-11-09T07:50:48Z",
            "content": "Bitcoin marked its 12th anniversary on October 31st. In response, its price has jumped from $13,000 to $15,000 in less than 2 weeks. The crypto community, including Bitcoin exchanges\r\n, celebrated th… [+3652 chars]"
        }, {
            "source": {
                "id": null,
                "name": "Vanguard"
            },
            "author": "sunday",
            "title": "The Secret Behind Bitcoin’s Jump from ₦100,000 to ₦8 million in 2 years",
            "description": "Bitcoin marked its 12th anniversary on October 31st. In response, its price has jumped from $13,000 to $15,000 in less than 2 weeks. The crypto community, including Bitcoin exchanges, celebrated the 12th anniversary in a big way. But for someone who hasn’t de…",
            "url": "https://www.vanguardngr.com/2020/11/the-secret-behind-bitcoins-jump-from-%e2%82%a6100000-to-%e2%82%a68-million-in-2-years/",
            "urlToImage": null,
            "publishedAt": "2020-11-01T07:50:48Z",
            "content": "Bitcoin marked its 12th anniversary on October 31st. In response, its price has jumped from $13,000 to $15,000 in less than 2 weeks. The crypto community, including Bitcoin exchanges\r\n, celebrated th… [+3652 chars]"
        },
    ]
}

export const myTestimonial = [
    {
        description:
            'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
        user: 'Naldo Samosir',
        userProfile: 'https://i.imgur.com/JSW6mEk.png'
    },
    {
        description:
            'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
        user: 'Erich Behrens',
        userProfile: 'https://i.imgur.com/0Clfnu7.png'
    },
    {
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
        user: 'Bruno Vizovskyy',
        userProfile: 'https://i.imgur.com/4KeKvtH.png'
    }
];

export const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)

    const onChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }
}
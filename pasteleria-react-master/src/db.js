let productos = [
    {
        id: 1,
        nombre: "Torta Cuadrada de Chocolate",
        precio: 45000,
        categoria: "tortas-cuadradas",
        descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.",
        imagen: "/images/Chocolate_Hazelnut_Cube_Cake_to_order_London_Surrey_2_1200x.webp",
        estrellas: 4,
        reseñas: [
            { id: 101, autor: "Ana P.", comentario: "¡Muy rica!", estrellas: 4 },
            { id: 102, autor: "Carlos M.", comentario: "El chocolate es de buena calidad, aunque un poco dulce para mí.", estrellas: 4 },
            { id: 103, autor: "Elena R.", comentario: "Perfecta para los amantes del chocolate.", estrellas: 5 }
        ]
    },
    {
        id: 2,
        nombre: "Torta Cuadrada de Frutas",
        precio: 50000,
        categoria: "tortas-cuadradas",
        descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho.",
        imagen: "/images/54040c9a1a1c4b979d88d22977ef6aa126.jpg",
        estrellas: 5,
        reseñas: [
            { id: 201, autor: "Juan V.", comentario: "Fresca y deliciosa, la combinación de frutas es ideal.", estrellas: 5 },
            { id: 202, autor: "Sofia L.", comentario: "Perfecta para el verano, muy refrescante.", estrellas: 5 },
            { id: 203, autor: "Miguel A.", comentario: "La crema estaba exquisita.", estrellas: 5 }
        ]
    },
    {
        id: 3,
        nombre: "Torta Circular de Vainilla",
        precio: 40000,
        categoria: "tortas-circulares",
        descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera.",
        imagen: "/images/Gluten-Free-Vanilla-Cake-image--500x500.webp",
        estrellas: 3,
        reseñas: [
            { id: 301, autor: "Laura G.", comentario: "Un clásico bien hecho, simple pero sabroso.", estrellas: 4 },
            { id: 302, autor: "Pedro S.", comentario: "Un poco seca para mi gusto, le faltó humedad.", estrellas: 2 },
            { id: 303, autor: "Isabel C.", comentario: "Buena opción para quienes prefieren sabores sencillos.", estrellas: 3 }
        ]
    },
    {
        id: 4,
        nombre: "Torta Circular de Manjar",
        precio: 42000,
        categoria: "tortas-circulares",
        descripcion: "Torta tradicional chilena con manjar y nueces.",
        imagen: "/images/imagesmannjar.jpg",
        estrellas: 5,
        reseñas: [
            { id: 401, autor: "Ricardo T.", comentario: "¡El manjar es espectacular! De las mejores que he probado.", estrellas: 5 },
            { id: 402, autor: "Camila N.", comentario: "Mi favorita, la combinación de manjar y nueces es perfecta.", estrellas: 5 },
            { id: 403, autor: "Andrés B.", comentario: "Muy chilena, me encantó.", estrellas: 5 },
            { id: 404, autor: "Vale Q.", comentario: "¡Riquísima!", estrellas: 5 }
        ]
    },
    {
        id: 5,
        nombre: "Mousse de Chocolate",
        precio: 5000,
        categoria: "postres-individuales",
        descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad.",
        imagen: "/images/c170cfd080dcaa23853a390b8343b021.jpg",
        estrellas: 4,
        reseñas: [
            { id: 501, autor: "Daniela F.", comentario: "Suave y delicioso, el tamaño justo.", estrellas: 4 },
            { id: 502, autor: "Esteban Z.", comentario: "Buen postre, buena calidad de chocolate.", estrellas: 4 },
            { id: 503, autor: "Paula M.", comentario: "Me gustó mucho.", estrellas: 5 }
        ]
    },
    {
        id: 6,
        nombre: "Tiramisú Clásico",
        precio: 5500,
        categoria: "postres-individuales",
        descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao.",
        imagen: "/images/11d636dc683222b2d4e9b3dcb248ccb5.jpg",
        estrellas: 5,
        reseñas: [
            { id: 601, autor: "Diego R.", comentario: "¡Como en Italia! Increíble sabor.", estrellas: 5 },
            { id: 602, autor: "Javiera L.", comentario: "El mejor tiramisú que he comido en Chile.", estrellas: 5 },
            { id: 603, autor: "Roberto C.", comentario: "Equilibrio perfecto de sabores.", estrellas: 5 }
        ]
    },
    {
        id: 7,
        nombre: "Torta Sin Azúcar de Naranja",
        precio: 48000,
        categoria: "sin-azucar",
        descripcion: "Torta ligera y deliciosa, endulzada naturalmente.",
        imagen: "/images/88_MIF_2420_Torta_de_Naranja_Sin_Azucar_Anadida_1080x1080.webp",
        estrellas: 4,
        reseñas: [
            { id: 701, autor: "Fernanda A.", comentario: "Sabrosa y sin culpa, me sorprendió gratamente.", estrellas: 5 },
            { id: 702, autor: "Matías P.", comentario: "Buena opción saludable, el sabor a naranja es sutil.", estrellas: 4 },
            { id: 703, autor: "Carolina V.", comentario: "Ideal para diabéticos o quienes se cuidan.", estrellas: 4 }
        ]
    },
    {
        id: 8,
        nombre: "Torta Especial de Boda",
        precio: 60000,
        categoria: "tradicional",
        descripcion: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
        imagen: "/images/boda.jpg",
        estrellas: 5,
        reseñas: [
            { id: 801, autor: "Novios Felices", comentario: "¡Hizo que nuestro día fuera aún más especial! Deliciosa.", estrellas: 5 },
            { id: 802, autor: "Invitado Boda", comentario: "Muy elegante y de sabor increíble.", estrellas: 5 },
            { id: 803, autor: "Wedding Planner", comentario: "Siempre la recomiendo, es garantía de calidad.", estrellas: 5 }
        ]
    }
];

export const getProductos = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(productos);
        }, 500);
    });
};

export const getProductoById = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const producto = productos.find(p => p.id === parseInt(id));
            if (producto) {
                resolve(producto);
            } else {
                reject("Producto no encontrado");
            }
        }, 500);
    });
};
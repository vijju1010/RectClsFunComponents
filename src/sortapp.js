import './App.css';
import { Container, Box, VStack } from '@chakra-ui/react';
import React from 'react';
const useSortableData = (items, config = null) => {
    const [typeofsort, settypeofsort] = React.useState(config);
    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (typeofsort !== null) {
            sortableItems.sort((a, b) => {
                if (a[typeofsort.key] < b[typeofsort.key]) {
                    return typeofsort.direction === 'asc' ? -1 : 1;
                }
                if (a[typeofsort.key] > b[typeofsort.key]) {
                    return typeofsort.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, typeofsort]);

    const sorttype = (key) => {
        let direction = 'asc';
        if (
            typeofsort &&
            typeofsort.key === key &&
            typeofsort.direction === 'asc'
        ) {
            direction = 'desc';
        }
        settypeofsort({ key, direction });
    };

    return { items: sortedItems, sorttype, typeofsort };
};

const ProductTable = (props) => {
    const { items, sorttype, typeofsort } = useSortableData(props.products);
    const getClassNamesFor = (name) => {
        if (!typeofsort) {
            return;
        }
        return typeofsort.key === name ? typeofsort.direction : undefined;
    };
    return (
        <table>
            <caption>Products</caption>
            <thead>
                <tr>
                    <th>
                        <button
                            type='button'
                            onClick={() => sorttype('name')}
                            className={getClassNamesFor('name')}>
                            Name
                        </button>
                    </th>
                    <th>
                        <button
                            type='button'
                            onClick={() => sorttype('price')}
                            className={getClassNamesFor('price')}>
                            Price
                        </button>
                    </th>
                    <th>
                        <button
                            type='button'
                            onClick={() => sorttype('stock')}
                            className={getClassNamesFor('stock')}>
                            In Stock
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                        <td>{item.stock}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default function App() {
    return (
        <div className='App'>
            <ProductTable
                products={[
                    { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
                    { id: 2, name: 'Milk', price: 1.9, stock: 32 },
                    { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
                    { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
                    { id: 5, name: 'Butter', price: 0.9, stock: 99 },
                    { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86 },
                    {
                        id: 7,
                        name: 'Fancy French Cheese 🇫🇷',
                        price: 99,
                        stock: 12,
                    },
                ]}
            />
        </div>
    );
}

import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import DataTable from '@/components/DataTable';

import '../bootstrap'

export default function Products(props) {
    const columns = ['id', 'productName', 'productDescription', 'productBasePrice', 'productSellingPrice', 'productImages'];
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
            >
            <Head title="Products" />
            <DataTable url="/api/products" columns={columns} />
        </Authenticated>
    );
}

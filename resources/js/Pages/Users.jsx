import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import DataTable from '@/components/DataTable';

import '../bootstrap'

export default function Users(props) {
    const columns = ['id', 'name', 'email', 'gender', 'birthplace', 'birthdate', 'password', 'actions'];
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <Head title="Users" />

            <DataTable url="/api/users" columns={columns} />
        </Authenticated>
    );
}

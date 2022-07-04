import React, { useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import axios from 'axios';

const fetchPermissions = async(userID) => {
  axios.get('/api/users/permissions/' + userID)
    .then(response => {
      localStorage.setItem('userPermissions', JSON.stringify(response.data.data.permissions))
    })
    .catch(err => {
      console.log(err)
    })
}

export default function Dashboard(props) {
    useEffect(() => {
      fetchPermissions(props.auth.user.id)
    })

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">You're logged in!</div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

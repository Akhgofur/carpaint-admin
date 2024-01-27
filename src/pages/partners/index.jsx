import AuthProvider from '@/context/auth'
import Layout from '@/layout'
import PartnersTable from '@/widgets/partners-table'
import React from 'react'

const Partners = () => {
  return (
    <AuthProvider>
        <Layout>
            <PartnersTable />
        </Layout>
    </AuthProvider>
  )
}

export default Partners
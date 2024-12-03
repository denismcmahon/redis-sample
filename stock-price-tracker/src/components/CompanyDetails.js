import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyDetails = ({ companyId })  => {
    const [company, setCompany] = useState(null);

    useEffect(() => {
        if(!companyId) return;

        const fetchCompanyDetails = async () => {
            console.log('DM ==> fetchCompanyDetails');
            try {
                const response = await axios.get(`http://localhost:3000/api/companies/${companyId}`);
                console.log('DM ==> fetchCompanyDetails ==> response: ', response);
                setCompany(response.data);
            } catch (error) {
                console.error('Error fetching company details:', error);
            }
        };
        fetchCompanyDetails();
    }, [companyId]);

    if (!companyId) return <p>Select a company to view details.</p>;

    if (!company) return <p>Loading company details...</p>;

    return (
        <div>
            <h2>Company Details</h2>
            <p><strong>Name:</strong> {company.name}</p>
            <p><strong>Industry:</strong> {company.industry}</p>
            <p><strong>Description:</strong> {company.description}</p>
        </div>
    );
};

export default CompanyDetails;
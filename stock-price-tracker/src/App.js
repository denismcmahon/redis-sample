import React, { useState } from 'react';
import StockPrices from './components/StockPrices';
import CompanyDetails from './components/CompanyDetails';

const App = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  return (
    <div>
      <h1>Stock Price Tracker</h1>
      <StockPrices onSelectCompany={setSelectedCompanyId} />
      <CompanyDetails companyId={selectedCompanyId} />
    </div>
  );
};

export default App;

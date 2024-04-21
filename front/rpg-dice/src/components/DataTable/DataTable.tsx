  import React from 'react';
  import DataTable, { TableColumn } from 'react-data-table-component';


  interface Car {
    id: number;
    brand: string;
    year: number;
    color: string;
  }

  const MyDataTable = () => {

    const columns: TableColumn<Car>[] = [
      {
        name: 'ID',
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: 'Brand',
        selector: (row) => row.brand,
        sortable: true,
      },
      {
        name: 'Year',
        selector: (row) => row.year,
        sortable: true,
      },
      {
        name: 'Color',
        selector: (row) => row.color,
        sortable: true,
      },
    ];

    const data: Car[] = [
      { id: 1, brand: 'Toyota', year: 2022, color: 'Red' },
      { id: 2, brand: 'Honda', year: 2021, color: 'Blue' },
      { id: 3, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 4, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 5, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 6, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 7, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 8, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 9, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 10, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 11, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 12, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 13, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 14, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 15, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 16, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 17, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 18, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 19, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 20, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 21, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 22, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 23, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 24, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 25, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 26, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 27, brand: 'Ford', year: 2020, color: 'Green' },
      { id: 28, brand: 'Ford', year: 2020, color: 'Green' },

      // More data...
    ];

    const customStyles = {
      rows: {
        style: {
          backgroundColor: '#24303F',
          color: "#C9CCCF",
          '&:hover': {
              backgroundColor: '#161d26',
              color: '#FFFFFF',
          },
        },
      },
      headRow: {
        style: {
          backgroundColor: '#24303F',
          color:"#C9CCCF"
        },
      },
      pagination: {
        style: {
          backgroundColor: '#24303F', 
          color:"#C9CCCF"
        },
      },
    };

    return (
      <div className="mb-4 flex items-center gap-3">
        <div className="w-full">
          <DataTable
            columns={columns}
            data={data}
            pagination={true}
            customStyles={customStyles} 
          />
        </div>
      </div>
    );
  };

  export default MyDataTable;

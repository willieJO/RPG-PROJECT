"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState,useEffect } from "react";
import './styles.css';
import useColorMode from "@/hooks/useColorMode";
import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  getSortedRowModel,
} from '@tanstack/react-table'
import React from "react";
import TableDate from "@/components/DataTable/Index";
interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}
interface CarClass {
  id: number;
  brand: string;
  year: number;
  color: string;
}




const Settings = () => {
  const [selectedOption, setSelectedOption] = useState<string>("USA");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [colorMode, setColorMode] = useColorMode();
  const [forceUpdate, setForceUpdate] = useState(false);
  const [key, setKey] = useState(0); // Chave inicial

  const [data, setData] = useState([
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
  ]);
  const columns = React.useMemo<ColumnDef<CarClass>[]>(
    () => [
      
      
      {
        accessorFn: row => row.brand,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Tipo de dado</span>,
        footer: props => props.column.id,
      },
      {
        accessorKey: 'year',
        header: () => 'Resultado',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'color',
        header: () => <span>Resultado com modificações</span>,
        footer: props => props.column.id,
      },
    ],
    []
  )
  const [products, setProducts] = useState<Product[]>([{id: '1000',
  code: 'f230fh0g3',
  name: 'Bamboo Watch',
  description: 'Product Description',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'Accessories',
  quantity: 24,
  inventoryStatus: 'INSTOCK',
  rating: 5},{id: '1000',
  code: 'f230fh0g3',
  name: 'Bamboo Watch',
  description: 'Product Description',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'Accessories',
  quantity: 24,
  inventoryStatus: 'INSTOCK',
  rating: 5}]);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  const updateKey = () => {
    setKey(key + 1); // Incrementa a chave para forçar a atualização do componente
  };


 
  
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-7 gap-8">
          <div className="col-span-7 xl:col-span-7">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Rolagem de dados
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/6">
                      <label
                        className="mb-3 block text-xs font-medium text-black dark:text-white"
                        htmlFor="dice_number"
                      >
                        Quantia de dados
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 text-center pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          min={1}
                          max={100}
                          name="dice_number"
                          id="dice_number"
                          defaultValue="1"
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/6">
                      <label
                        className="mb-3 block text-xs font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Tipo de dado
                      </label>
                      <select
                        value={selectedOption}
                        onChange={(e) => {
                          setSelectedOption(e.target.value);
                          changeTextColor();
                        }}
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black dark:text-white" : ""
                          }`}
                      >
                        <option value="d4" className="text-body text-center  dark:text-bodydark">
                          D4
                        </option>
                        <option value="d6" className="text-body text-center dark:text-bodydark">
                          D6
                        </option>
                        <option value="d8" className="text-body text-center dark:text-bodydark">
                          D8
                        </option>
                        <option value="d10" className="text-body text-center dark:text-bodydark">
                          D10
                        </option>
                        <option value="d12" className="text-body text-center dark:text-bodydark">
                          D12
                        </option>
                        <option value="d20" className="text-body text-center dark:text-bodydark">
                          D20
                        </option>
                        <option value="d100" className="text-body text-center dark:text-bodydark">
                          D100
                        </option>
                      </select>
                    </div>
                    <div className="w-full sm:w-1/6">
                      <label
                        className="mb-3 block text-xs font-medium text-black dark:text-white"
                        htmlFor="multiplicador"
                      >
                        Multiplicador
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 text-center pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          min={1}
                          name="multiplicador"
                          id="multiplicador"
                          defaultValue="1"
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/6">
                      <label
                        className="mb-3 block text-xs font-medium text-black dark:text-white"
                        htmlFor="somar"
                      >
                        Somar
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 text-center pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          min={0}
                          name="somar"
                          id="somar"
                          defaultValue="0"
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/6">
                      <div className="relative">
                        <button
                          className="w-full mt-7.5 rrounded rounded-3xl bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-50"
                          onSubmit={()=> null}
                          value="Rodar">
                             Rodar
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Historico
                </h3>
              </div>
              <button onClick={()=>  {debugger; data[0].color = "TROQUEI A COR"; setData(data); updateKey();}}>TROCA O ID 1</button>
              <div className="p-7">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="w-full">
                    <TableDate key={key} 
                      {...{
                        data,
                        columns,
                      }}
                    />

                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;

"use client";

import moment from 'moment';

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState,useEffect } from "react";

import {
  ColumnDef,
} from '@tanstack/react-table'
import React from "react";
import TableDate from "@/components/DataTable/Index";
import api from "@/hooks/api";
import ConditionalRedirect from '@/components/ConditionalRedirect/ConditionalRedirect ';


interface Rolagem {
  id: number;
  tipo_dado: string;
  multiplicador: string;
  soma: string;
  resultado: string;
  resultado_modificacao: string;
  jogada_numero:string;
  addDate: Date;
  usuarioId: number;
}




const Settings = () => {
  const [key, setKey] = useState(0); 
  const [data, setData] = useState<any>(); 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        api.defaults.withCredentials = true;    
        api.defaults.withCredentials = true 
        api.get('/Rolagem/ObterRolagensDoUsuario', {
            headers: {
              'Content-Type': 'application/json',
              'Token': localStorage.getItem("accessToken"),
            },
            withCredentials: true 
          })
          .then(response => {
            setData(response.data);
          }).catch(e => {
            console.log(e);
          })
        setData(data); 
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    fetchData();
  }, []); 


  const columns = React.useMemo<ColumnDef<Rolagem>[]>(
    () => [
      {
        accessorFn: row => row.jogada_numero,
        id: 'jogada_numero',
        cell: info => info.getValue(),
        header: () => <span>Numero da jogada</span>,
        footer: props => props.column.id,
      },    
      {
        accessorFn: row => row.tipo_dado,
        id: 'tipo_dado',
        cell: info => info.getValue(),
        header: () => <span>Tipo de dado</span>,
        footer: props => props.column.id,
      },
      {
        accessorKey: 'resultado',
        header: () => 'Resultado',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'resultado_modificacao',
        header: () => <span>Resultado com modificações</span>,
        footer: props => props.column.id,
      },
    ],
    []
  )


  

  return (
    <DefaultLayout>
        <ConditionalRedirect condition={localStorage.getItem("accessToken") == null} redirectPath="/auth/signin" />
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-7 gap-9">
          <div className="col-span-7 xl:col-span-7">
            <div className="rounded-sm border  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Historico
                </h3>
              </div>
              <div className="p-7">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="w-full">
                      {data != null && (
                        <TableDate key={key} 
                        {...{
                          data,
                          columns,
                        }}
                      />
                      )}
                    

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

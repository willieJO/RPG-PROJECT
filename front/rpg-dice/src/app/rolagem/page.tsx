"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import moment from 'moment';

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState,useEffect } from "react";
import './styles.css';
import axios from 'axios';

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
import api from "@/hooks/api";
import ConditionalRedirect from "@/components/ConditionalRedirect/ConditionalRedirect ";
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

interface Rolagem {
  id: number;
  tipo_dado: string;
  multiplicador: string;
  soma: string;
  resultado: string;
  resultado_modificacao: string;
  addDate: Date;
  usuarioId: number;
}




const Settings = () => {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [colorMode, setColorMode] = useColorMode();
  const [forceUpdate, setForceUpdate] = useState(false);
  const [key, setKey] = useState(0); // Chave inicial
  const [quantiaDados, setQuantiaDados] = useState<number>(1);
  const [tipoDado, setTipoDado] = useState<string>("d4");
  const [multiplicador, setMultiplicador] = useState<number>(1);
  const [soma, setSoma] = useState<number>(0);
  const [ultimoResultado, setUltimoResultado] = useState<string>("");
  const [data, setData] = useState<any>(); 
  const sortearNumero = (tipo: string) => {
    let min = 1;
    let max = 0;

    switch (tipo) {
        case 'd4':
            max = 4;
            break;
        case 'd6':
            max = 6;
            break;
        case 'd8':
            max = 8;
            break;
        case 'd10':
              max = 10;
              break;
        case 'd12':
                max = 12;
                break;
        case 'd20':
              max = 20;
              break;
        case 'd100':
                max = 100;
                break;
        default:
            break;
    }

    const numeroSorteado = Math.floor(Math.random() * (max - min + 1)) + min;
    return numeroSorteado;
}

  const RodarDados = () => {
    var listaDeDados = [];
    var somatoriaDosResultados = 0;
    for (var i = 0; i < quantiaDados; i++) {    
      var resultadoDaRolagem = sortearNumero(tipoDado)
      var resultadoComMultiplicadores = resultadoDaRolagem;
      if (multiplicador > 1) {
        resultadoComMultiplicadores = resultadoDaRolagem * multiplicador
      }
      if (soma > 0) {
        resultadoComMultiplicadores = resultadoComMultiplicadores + soma
      }
      somatoriaDosResultados += resultadoComMultiplicadores;
      var obj = {
        'tipo_dado': tipoDado,
        'multiplicador': multiplicador.toString(),
        'soma': soma.toString(),
        'resultado': resultadoDaRolagem.toString(),
        'resultado_modificacao': resultadoComMultiplicadores.toString(),
        'add_date':  moment().format('YYYY-MM-DDTHH:mm:ss[Z]')
      }
      listaDeDados.push(obj);
    }
    api.defaults.withCredentials = true;
    api.post('/Rolagem/SalvarRolagem', listaDeDados, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      setData(response.data);
      console.log("Salvei")
    }).catch(e => {
      console.log(e);
    })
    setUltimoResultado(somatoriaDosResultados.toString());
  }


  const columns = React.useMemo<ColumnDef<Rolagem>[]>(
    () => [
      
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


  const updateKey = () => {
    setKey(key + 1); // Incrementa a chave para forçar a atualização do componente
  };



  return (
    <DefaultLayout>
      <ConditionalRedirect condition={localStorage.getItem("accessToken") == null} redirectPath="/auth/signin" />
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-7 gap-9">
          <div className="col-span-7 xl:col-span-7">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Rolagem de dados
                </h3>
              </div>
              <div className="p-7">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/6">
                      <label
                        className="mb-3 block text-xs font-medium text-black dark:text-white"
                        htmlFor="dice_quantia"
                      >
                        Quantia de dados
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 text-center pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          min={1}
                          max={100}
                          name="dice_quantia"
                          id="dice_quantia"
                          onChange={(e) => {
                            setQuantiaDados(parseInt(e.target.value));
                          }}
                          defaultValue="1"
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/6">
                      <label
                        className="mb-3 block text-xs font-medium text-black dark:text-white"
                        htmlFor="dice_type"
                      >
                        Tipo de dado
                      </label>
                      <select
                        value={tipoDado}
                        onChange={(e) => {
                          setTipoDado(e.target.value);
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
                          onChange={(e) => {
                            setMultiplicador(parseInt(e.target.value));
                          }}
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
                          onChange={(e) => {
                            setSoma(parseInt(e.target.value));
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/6">
                      <div className="relative">
                        <button
                          className="w-full mt-7.5 rrounded rounded-3xl bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-50"
                          onClick={RodarDados}
                          value="Rodar">
                             Rodar
                        </button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            {ultimoResultado != "" && (
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  <b>Resultado final: {ultimoResultado}</b>
                </h3>
              </div>
            </div>
            
            )}
            <br/>
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

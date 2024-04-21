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

export default function TableDate({
    data,
    columns,
  }: {
    data: any[]
    columns: ColumnDef<any>[]
  }) {
    const [pagination, setPagination] = React.useState<any>({
      pageIndex: 0,
      pageSize: 10,
    })
  
    const table = useReactTable({
      columns,
      data,
      debugTable: true,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange: setPagination,
      state: {
        pagination,
      },
    })
  
    return (
      <div className="p-2">
        <div className="h-2" />
        <table className="w-full rounded-sm border justify-center text-center border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <thead className="rounded-sm bg-gray-2 dark:bg-meta-4 text-black dark:text-white">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'gap-3 text-sm font-medium uppercase xsm:text-base p-2.5 xl:p-5 cursor-pointer select-none'
                            : '',
                          //onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="text-black dark:text-white">
            {table.getRowModel().rows.map(row => {
              return (
                <tr className="text-black dark:text-white sm:grid-cols-5 border-b border-stroke dark:border-strokedark" key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td className="gap-3 p-2.5 xl:p-5 text-black dark:text-white" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="h-2" />
        <div className="flex items-center gap-4 overflow-auto">
          <button
            className="border rounded p-3 text-black dark:text-white"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-3 text-black dark:text-white" 
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-3 text-black dark:text-white"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border p-3 rounded text-black dark:text-white"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
          <div className="flex items-center gap-1 text-black dark:text-white text-right">
            <span className="flex p-3 items-center gap-1 text-black dark:text-white">
              <div>Página</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} de{' '}
                {table.getPageCount().toLocaleString()}
              </strong>
            </span>
            <span className="flex gap-1 p-3 items-center text-black dark:text-white">
              Ir para a página:
              <input
                type="number"
                min="0"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="border p-3 rounded w-16 border-stroke bg-transparent text-black dark:text-white dark:text-black transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`"
              />
            </span>
            <select
              className={`relative appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Mostrar {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div>
            Mostrando {table.getRowModel().rows.length.toLocaleString()} de{' '}
            {table.getRowCount().toLocaleString()} Linhas
          </div>
        </div>
      </div>
    )
  }
  
  function Filter({
    column,
    table,
  }: {
    column: Column<any, any>
    table: ReactTable<any>
  }) {
    const firstValue = table
      .getPreFilteredRowModel()
      .flatRows[0]?.getValue(column.id)
  
    const columnFilterValue = column.getFilterValue()
  
    return typeof firstValue === 'number' ? (
      <div className="flex space-x-2">
        <input
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={e =>
            column.setFilterValue((old: [number, number]) => [
              old?.[0],
              e.target.value,
            ])
          }
          placeholder={`Buscar...`}
          className="w-36 rounded border border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input bg-gray py-2 text-center pr-4.5 text-blackfocus-visible:outline-none  dark:text-white dark:focus:border-primary"
        />
      </div>
    ) : (
      <input
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={e => column.setFilterValue(e.target.value)}
        placeholder={`Buscar...`}
        
        className="w-36 rounded border border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input bg-gray py-2 text-center pr-4.5 text-blackfocus-visible:outline-none  dark:text-white dark:focus:border-primary"
      />
    )
  }

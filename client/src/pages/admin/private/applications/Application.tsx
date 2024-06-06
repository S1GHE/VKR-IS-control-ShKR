import {ContainerModule, TextModule} from "@src/shared/scss";
import cls from "@src/pages/admin/private/applications/Applications.module.scss";
import {useEffect, useState, useMemo} from "react";
import { useTable, Column, CellProps} from 'react-table';
import {ApplicationService, TApplications} from "@src/entities/application";

export const Application = () => {
  const [appl, setAppl] = useState<Array<TApplications>>([]);

  useEffect(() => {
    ApplicationService.get().then(
      (res ) => {
        setAppl(res.data.applications)
      }
    ).catch(err => console.error(err))

  }, []);

  const columns: Column<TApplications>[] = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ID',
      },
      {
        Header: 'ID Пользователя',
        accessor: 'UserID',
      },
      {
        Header: 'ID Курса',
        accessor: 'CourseID',
      },
      {
        Header: 'Статус',
        accessor: 'Status',
      },
      {
        Header: 'Дополнительно',
        accessor: 'Notes',
      },
      {
        Header: 'Дата создания',
        accessor: 'CreatedAt',
        Cell: ({ value }: CellProps<TApplications>) => new Date(value).toLocaleString(),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: appl });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <section className={ContainerModule.wrapper}>
      <div className={cls.text_header}>
        <h2 className={TextModule.h_32}>Заявки на курсы</h2>
      </div>

      <div className={cls.table_body}>
        <table {...getTableProps()} className={cls.table}>
          <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <p className={TextModule.p_16}>
                    {column.render('Header')}
                  </p>
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    <p className={TextModule.p_16}>
                      {cell.render('Cell')}
                    </p>
                  </td>
                ))}
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { Container } from 'reactstrap';
import { useTable, usePagination } from 'react-table';

export default function ListMoviesPage() {
  // FIXME: use correct type
  const [data, setData] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  function Table({ columns, data, fetchData, loading, pageCount: controlledPageCount }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      // Get the state from the instance
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 }, // Pass our hoisted table state
        manualPagination: true, // Tell the usePagination
        // hook that we'll handle our own data fetching
        // This means we'll also have to provide our own
        // pageCount.
        pageCount: controlledPageCount,
      },
      usePagination
    );

    // Listen for changes in pagination and use the state to fetch our new data
    useEffect(() => {
      fetchData({ pageIndex, pageSize });
    }, [fetchData, pageIndex, pageSize]);

    // Render the UI for your table
    return (
      <>
        <pre>
          <code>
            {JSON.stringify(
              {
                pageIndex,
                pageSize,
                pageCount,
                canNextPage,
                canPreviousPage,
              },
              null,
              2
            )}
          </code>
        </pre>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
            <tr>
              {loading ? (
                // Use our custom loading state to show a loading indicator
                <td colSpan="10000">Loading...</td>
              ) : (
                <td colSpan="10000">
                  Showing {page.length} of ~{controlledPageCount * pageSize} results
                </td>
              )}
            </tr>
          </tbody>
        </table>
        {/*
          Pagination can be built however you'd like.
          This is just a very basic UI implementation:
        */}
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }

  const columns = useMemo(
    () => [
      {
        columns: [
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Overview',
            accessor: 'overview',
          },
          {
            Header: 'Genres',
            accessor: 'genres',
          },
          {
            Header: 'Stock Qty.',
            accessor: 'stockQty',
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await fetch(`/api/movies?page=${page}&limit=${limit}`);

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse);
        }

        const pageResponse = await response.json();
        setData(pageResponse);
      } catch (err) {
        console.error('[ERROR] ListMoviesPage.loadMovies:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, []);

  return (
    <>
      <Head>
        <title>Movies :: Mathbuster</title>
      </Head>

      <Container>
        <h1>Movies</h1>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {/* <Table bordered striped hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Overview</th>
                  <th>Genres</th>
                  <th>Stock Qty.</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {data.totalCount > 0 ? (
                  data.data.map((movie, i: number) => (
                    <tr key={i}>
                      <td>{movie.title}</td>
                      <td>{movie.overview}</td>
                      <td>{movie.genres}</td>
                      <td>{movie.availableCopies}</td>
                      <td>
                        <ButtonGroup>
                          <Button color="primary">Edit</Button>
                          <Button color="danger">Delete</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No movies found!</td>
                  </tr>
                )}
              </tbody>
            </Table>

            <div className="d-flex justify-content-end">
              <ButtonGroup>
                <Button>{'<'}</Button>
                <Button>1</Button>
                <Button>{'>'}</Button>
              </ButtonGroup>
            </div> */}

            <Table
              columns={columns}
              data={data.data}
              fetchData={fetchData}
              loading={isLoading}
              pageCount={pageCount}
            />
          </>
        )}
      </Container>
    </>
  );
}

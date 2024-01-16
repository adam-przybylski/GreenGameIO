import React, {useEffect, useMemo, useState} from 'react';
import {api} from "../api/api.config.ts";

interface TableProps {
    data: Array<{ [key: string]: any }>,
    className: string
}

interface SortConfig {
    key: string;
    direction: string;
}

interface DataItem {
    id: number;
    nazwa: string;
    opis: string;
    source: string;
}

const Table: React.FC<TableProps> = ({data, className}) => {
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
    const [awards, setAwards] = useState<DataItem[] | null>(null);

    useEffect(() => {
        api.get("/odznaki").then(response => {
            //console.log(response.data);
            setAwards(response.data);
        }).catch(function (error) {
                console.log(error);
            }
        );
    }, [])

    const computedObject = useMemo(() => {
        return data.map((item) => {
            return {
                Username: item.username,
                EXP: item.xp,
                Award: awards?.find(award => award.id === item.pinnedAwardId)?.source,
                Score: item.score,
            };
        });
    }, [data, awards]);

    const requestSort = (key: string) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    };

    const sortedData = (): Array<{ [key: string]: any }> => {
        if (sortConfig !== null) {
            const sortedArray = [...computedObject].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
            return sortedArray;
        }
        return computedObject;
    };

    const renderTableHeader = () => {
        return (
            <thead className="bg-gray-600">
            <tr>
                {Object.keys(computedObject[0]).map((key) => (
                    <th
                        key={key}
                        className="py-2 px-4 text-left cursor-pointer hover:bg-gray-500"
                        onClick={() => requestSort(key)}
                    >
                        {key}
                    </th>
                ))}
            </tr>
            </thead>
        );
    };

    const renderTableRows = () => {
        const sortedDataArray = sortedData();
        return (
            <tbody>
            {sortedDataArray.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}>
                    {Object.keys(item).map((key) => (
                        <td key={key} className="py-2 px-4">
                            {key === 'Award' && item[key] !== undefined ? (
                                <img src={item[key]} alt={`Odznaka`} className="h-10 w-10 object-cover" />
                            ) : (
                                item[key]
                            )}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        );
    };

    return (
        <table className={`${className} table-auto border-collapse w-full`}>
            {renderTableHeader()}
            {renderTableRows()}
        </table>
    );
};

export default Table;
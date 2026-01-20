const getRows = (arr: {name: string,seatsLength: number}[]) => {
    return arr.map(row => {
           if (row.name === 'blank') {
               return { row: 'blank' }
           }
          return {
            row: row.name,
            seats: Array.from({ length: row.seatsLength }, (_, i) => ({
                id: `${row.name}-${i + 1}`,
                seatNumber: i + 1,
                available: Math.random() > 0.3
            }))
        }
    })
}

export interface TicketRow { 
    type: string;
    price: string;
    rows: rowDetails[];
 }

 export interface rowDetails {
    row: string;
    seats?: {
        id: string;
        seatNumber: number;
        available: boolean;
    }[];
 }

export const mock_data = {
    movieName: 'movie-1',
    tickets: [
        {
            type: 'GOLD',
            price: '$180',
            rows: getRows([
                { name: 'A', seatsLength: 14 },
                { name: 'B', seatsLength: 14 },
                { name: 'C', seatsLength: 14 },
                { name: 'blank', seatsLength: 14 },
                { name: 'D', seatsLength: 14 },
                { name: 'E', seatsLength: 14 },
                { name: 'F', seatsLength: 14 },
                { name: 'G', seatsLength: 14 },
                { name: 'H', seatsLength: 13 },
            ])
        },
        {
            type: 'Silver',
            price: '$130',
            rows: getRows([
                { name: 'A', seatsLength: 14 },
                { name: 'B', seatsLength: 14 },
                { name: 'C', seatsLength: 14 },
                { name: 'D', seatsLength: 14 },
                { name: 'E', seatsLength: 14 },
                { name: 'F', seatsLength: 14 },
                { name: 'G', seatsLength: 14 },
                { name: 'H', seatsLength: 14 },
                { name: 'I', seatsLength: 14 },
                { name: 'J', seatsLength: 14 },
                { name: 'K', seatsLength: 14 },
                { name: 'L', seatsLength: 14 },
                { name: 'M', seatsLength: 14 },
                { name: 'N', seatsLength: 14 },
                { name: 'O', seatsLength: 14 },
                { name: 'P', seatsLength: 14 },
            ])
        }
    ]
}
